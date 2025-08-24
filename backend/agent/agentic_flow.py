import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from agent.master_prompt import get_master_prompt
from agent.final_response_prompt import get_final_response_prompt
from tools import ward_tools, population_tools, groundwater_tools, land_cover_tools, search_tools

# --- Configuration & Setup ---
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

AVAILABLE_TOOLS = {
    "get_all_wards": ward_tools.get_all_wards_tool,
    "get_ward_population": population_tools.get_ward_population_tool,
    "get_groundwater_levels": groundwater_tools.get_groundwater_levels_tool,
    "get_land_cover": land_cover_tools.get_land_cover_tool,
    "get_web_search": search_tools.get_web_search_tool,
}

# --- Main Agentic Flow ---
def run_agentic_flow(user_query: str, user_coordinates: dict = None):
    print(f"\n--- 🚀 STARTING AGENTIC FLOW for Query: '{user_query}' ---")

    # Step 1 & 2: Decide on tools to call
    print("🧠 Contacting Gemini to decide on tools...")
    model = genai.GenerativeModel('gemini-2.0-flash')
    prompt = get_master_prompt(user_query, user_coordinates)
    response = model.generate_content(prompt)

    try:
        cleaned_text = response.text.strip().replace("```json", "").replace("```", "").strip()
        decision = json.loads(cleaned_text)
        tool_calls = decision.get("tool_calls", [])
        if not tool_calls:
            print("❌ Gemini did not identify any tools to call.")
            return "I'm sorry, I could not determine an action for your request."
        print(f"✅ Gemini decided to call {len(tool_calls)} tool(s).")
    except (json.JSONDecodeError, AttributeError):
        print(f"❌ Error decoding Gemini's response: {response.text}")
        return "I had trouble understanding how to respond. Please try rephrasing."

    # Step 3: Execute all chosen tools
    aggregated_results = []
    for call in tool_calls:
        tool_name = call.get("tool_name")
        parameters = call.get("parameters", {})
        if tool_name in AVAILABLE_TOOLS:
            print(f"🛠️ Executing: '{tool_name}' with params: {parameters}")
            tool_function = AVAILABLE_TOOLS[tool_name]
            if tool_name == "get_groundwater_levels" and user_coordinates:
                parameters.setdefault("latitude", user_coordinates.get("latitude"))
                parameters.setdefault("longitude", user_coordinates.get("longitude"))
            result = tool_function(**parameters)
            aggregated_results.append(result)
        else:
            aggregated_results.append({"error": f"Tool '{tool_name}' not found."})

    print(f"📊 Aggregated results: {json.dumps(aggregated_results, indent=2)}")

    # Step 4: Synthesize the final response
    print("🧠 Contacting Gemini to synthesize the final response...")
    final_prompt = get_final_response_prompt(user_query, json.dumps(aggregated_results))
    final_response = model.generate_content(final_prompt)
    
    print("--- ✅ AGENTIC FLOW COMPLETE ---")
    return final_response.text