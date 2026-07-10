import json

import google.generativeai as genai

from app.core.config import GEMINI_API_KEY
from app.services.prompt_builder import build_prompt

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_scenario(data):

    prompt = build_prompt(data)

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)