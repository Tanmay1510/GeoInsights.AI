import uvicorn
from api.server import app
from agent.agentic_flow import run_agentic_flow     

if __name__ == "__main__":
    # --- To run the API Server ---
    # To start, run this command in your terminal: uvicorn main:app --reload
    # print("Starting FastAPI server. Go to http://127.0.0.1:8000/docs")
    # uvicorn.run(app, host="127.0.0.1", port=8000)


    # Example 1: Population Query
    query1 ="Show me the trend in built-up percentage for Ward 3 between 2018 and 2024. Also, search for information about the environmental impact of development in the Lohegaon and Viman Nagar areas"
    response1 = run_agentic_flow(query1)
    print("\n--- FINAL RESPONSE 1 ---\n", response1)

    # # # Example 2: Groundwater Query using coordinates
    # # query2 = "What are the groundwater levels near me?"
    # # coords = {"latitude": 18.52, "longitude": 73.85}
    # # response2 = run_agentic_flow(query2, user_coordinates=coords)
    # # print("\n--- FINAL RESPONSE 2 ---\n", response2)
    
    # # Example 3: List all wards
    # query3 = "Can you list all the wards?"
    # response3 = run_agentic_flow(query3)
    # print("\n--- FINAL RESPONSE 3 ---\n", response3)