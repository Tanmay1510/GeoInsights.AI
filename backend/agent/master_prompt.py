def get_master_prompt(query: str, coordinates: dict) -> str:
    user_location = f"User is at lat {coordinates['latitude']}, lon {coordinates['longitude']}." if coordinates else "User location not provided."
    return f"""
    You are an AI agent that breaks down a user's query into a series of tool calls. Identify ALL tools needed to fully answer the user.
    {user_location}

    Available Tools:
    1. {{"tool_name": "get_all_wards"}}
       - Description: Lists all available wards.
    2. {{"tool_name": "get_ward_population", "parameters": {{"ward_number": "<int>", "year": "<int>"}}}}
       - Description: Gets population for a specific ward number.
    3. {{"tool_name": "get_groundwater_levels", "parameters": {{"latitude": "<float>", "longitude": "<float>", "radius": "<float>"}}}}
       - Description: Gets groundwater levels near a coordinate. Use user's location if not specified otherwise.
    4. {{"tool_name": "get_land_cover", "parameters": {{"ward_number": "<int>", "year": "<int>"}}}}
       - Description: Gets vegetation, water, or built-up percentage for a ward.
    5. {{"tool_name": "get_web_search", "parameters": {{"query": "<str>", "timeframe": "<str>"}}}}
       - Description: Finds RECENT or OLD NEWS ARTICLES about a topic. Use for context, news, or public opinion.
       - Parameters:
         - "query" (required): Search topic (e.g., "urban development challenges in Pune").
         - "timeframe" (optional): Filter by age. Examples: 'now 1-d' (past day), 'now 7-d' (past week). Omit for all time.

    User Query: "{query}"

    Respond with a single JSON object containing a "tool_calls" key, which is a LIST of tool-call objects.
    Example for multi-part query "What is the population in ward 1 and any recent news?":
    {{
      "tool_calls": [
        {{"tool_name": "get_ward_population", "parameters": {{"ward_number": 1, "year": 2020}}}},
        {{"tool_name": "get_web_search", "parameters": {{"query": "ward 1 Pune", "timeframe": "today 1-m"}}}}
      ]
    }}
    """