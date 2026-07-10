import {
    ShieldAlert,
    Brain,
    Target,
    CheckCircle2
} from "lucide-react";

function MetricsGrid({ data }) {

    const missionScore = Math.round(
        (data.confidence * 0.75) +
        (
            data.risk_level === "Low"
            ? 25
            : data.risk_level === "Medium"
            ? 18
            : data.risk_level === "High"
            ? 8
            : 4
        )
    );

    const metrics = [

        {
            title: "Risk Level",
            value: data.risk_level,
            icon: ShieldAlert,
            bg: "bg-red-50",
            color: "text-red-600"
        },

        {
            title: "AI Confidence",
            value: `${data.confidence}%`,
            icon: Brain,
            bg: "bg-blue-50",
            color: "text-blue-700"
        },

        {
            title: "Mission Score",
            value: `${missionScore}%`,
            icon: Target,
            bg: "bg-green-50",
            color: "text-green-700"
        },

        {
            title: "Status",
            value: "READY",
            icon: CheckCircle2,
            bg: "bg-emerald-50",
            color: "text-emerald-700"
        }

    ];

    return (

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {metrics.map((item) => {

                const Icon = item.icon;

                return (

                    <div
                        key={item.title}
                        className={`${item.bg} rounded-3xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    >

                        <div className="flex items-center justify-between">

                            <p className="text-sm font-medium text-slate-500">
                                {item.title}
                            </p>

                            <Icon className={item.color} size={24} />

                        </div>

                        <h2 className={`mt-6 text-4xl font-bold ${item.color}`}>

                            {item.value}

                        </h2>

                    </div>

                );

            })}

        </div>

    );

}

export default MetricsGrid;