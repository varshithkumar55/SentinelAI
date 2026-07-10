from app.models.response import AIResponse


def analyze_scenario(data):

    return AIResponse(
        summary="AI analysis completed successfully.",

        risk_level="Medium",

        confidence=91,

        recommended_strategy="Adaptive Resource Deployment",

        reasoning=[
            "Uses available resources efficiently.",
            "Balances mission speed and safety.",
            "Minimizes operational risk."
        ],

        alternative_strategies=[
            "Rapid Deployment",
            "Distributed Resource Allocation",
            "Conservative Risk Mitigation"
        ],

        resource_plan="Allocate personnel in phases.",

        timeline="2 Days",

        key_risks=[
            "Weather uncertainty",
            "Limited equipment availability",
            "Communication delays"
        ]
    )