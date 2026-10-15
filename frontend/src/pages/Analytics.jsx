import {
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiDownload,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";

import StatCard from "../components/StatCard";

function Analytics() {
  return (
    <div className="min-h-full bg-[#f5f6fc] p-6 md:p-8 lg:p-10">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#10253d]">
            Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Track your job search progress and discover insights.
          </p>
        </div>
      </div>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applications"
          value="48"
          change="+12%"
          description="Compared to last month"
          icon={FiBriefcase}
        />

        <StatCard
          title="Applications Sent"
          value="32"
          change="+8%"
          description="Compared to last month"
          icon={FiSend}
        />

        <StatCard
          title="Interviews"
          value="8"
          change="+2"
          description="Compared to last month"
          icon={FiMessageSquare}
        />

        <StatCard
          title="Offers Received"
          value="3"
          change="+1"
          description="Compared to last month"
          icon={FiAward}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#10253d] transition hover:bg-gray-50">
            <FiCalendar className="text-base" />
            Last 30 days
          </button>

          <button className="flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
            <FiDownload className="text-base" />
            Export Report
          </button>
        </div>
      </div>

      {/* More analytics sections will go here */}
    </div>
  );
}

export default Analytics;
