// Landing Page Dashboard Preview
export const dashboardData = {
  scenario: "Operation Falcon",
  status: "AI Engine Active",
  progress: 82,
  risk: "Medium",
  confidence: 91,
  resources: 84,
  eta: "2 min",
  recommendation: "Adaptive Resource Deployment",

  activity: [
    "Scenario Created",
    "Constraints Analysed",
    "Risks Evaluated",
    "Generating Decision Report",
  ],
};

// Dashboard KPI Cards
export const stats = [
  {
    title: "Active Missions",
    value: 12,
    color: "bg-blue-100",
    text: "text-blue-700",
    icon: "🛰️",
  },
  {
    title: "Completed Reports",
    value: 48,
    color: "bg-green-100",
    text: "text-green-700",
    icon: "📄",
  },
  {
    title: "AI Confidence",
    value: "91%",
    color: "bg-purple-100",
    text: "text-purple-700",
    icon: "🤖",
  },
  {
    title: "Critical Alerts",
    value: 3,
    color: "bg-red-100",
    text: "text-red-700",
    icon: "⚠️",
  },
];

// Dashboard Recent Missions
export const recentMissions = [
  {
    name: "Operation Falcon",
    risk: "High",
    confidence: 92,
  },
  {
    name: "Sentinel Shield",
    risk: "Critical",
    confidence: 90,
  },
  {
    name: "Border Watch",
    risk: "Medium",
    confidence: 87,
  },
  {
    name: "Operation Thunder",
    risk: "Low",
    confidence: 95,
  },
];
export const trendData = [
  { day: "Mon", missions: 3 },
  { day: "Tue", missions: 5 },
  { day: "Wed", missions: 8 },
  { day: "Thu", missions: 6 },
  { day: "Fri", missions: 10 },
  { day: "Sat", missions: 9 },
  { day: "Sun", missions: 12 },
];

export const riskData = [
  { name: "Low", value: 5 },
  { name: "Medium", value: 9 },
  { name: "High", value: 6 },
  { name: "Critical", value: 3 },
];

export const activityFeed = [
  "Gemini AI generated a new strategy.",
  "Risk assessment completed.",
  "Mission report exported.",
  "Scenario updated successfully.",
  "Resources optimized by AI.",
];