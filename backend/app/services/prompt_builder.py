import json


def build_prompt(data):

    scenario = json.dumps(data.model_dump(), indent=2)

    return f"""
You are an AI Decision Intelligence Assistant.

Analyze the following operational scenario.

Return ONLY valid JSON.

Required JSON format:

{{
    "summary":"",
    "risk_level":"",
    "confidence":0,
    "recommended_strategy":"",
    "reasoning":[],
    "alternative_strategies":[],
    "resource_plan":"",
    "timeline":"",
    "key_risks":[]
}}

Scenario:

{scenario}
"""