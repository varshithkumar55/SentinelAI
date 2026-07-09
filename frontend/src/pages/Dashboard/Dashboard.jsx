import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-3 text-slate-600">
        Your AI mission planning workspace.
      </p>
    </DashboardLayout>
  );
}

export default Dashboard;