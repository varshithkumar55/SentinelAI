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

    # Remove Markdown code fences
    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    result = json.loads(text)

    # ---------- Normalize confidence ----------
    confidence = result.get("confidence", 0)

    try:
        confidence = float(confidence)

        # Gemini sometimes returns 0.9 instead of 90
        if confidence <= 1:
            confidence *= 100

        result["confidence"] = round(confidence)

    except (ValueError, TypeError):
        result["confidence"] = 0

    return result