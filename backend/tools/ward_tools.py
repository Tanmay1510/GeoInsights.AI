import json
import sys
from typing import List, Dict, Any

def load_json_data(filepath: str) -> List:
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"FATAL ERROR: The data file '{filepath}' was not found.")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"FATAL ERROR: Could not decode JSON from '{filepath}'.")
        sys.exit(1)

WARDS_DATA = load_json_data("data/wards.json").get("wards", [])

def get_all_wards_tool() -> List[Dict[str, Any]]:
    """
    Tool to get a list of all available wards with their names and numbers.
    This tool takes no parameters.
    """
    print("--- TOOL: get_all_wards_tool() CALLED ---")
    if not WARDS_DATA:
        return {"error": "Ward data could not be loaded from the server."}
    return WARDS_DATA