import type { Metadata } from "next"
import ProblemHeatMap from "@/components/kokonutui/problem-heat-map"
import ProblemStats from "@/components/kokonutui/problem-stats"
import ProblemTrends from "@/components/kokonutui/problem-trends"
import HotIssues from "@/components/kokonutui/hot-issues"

export const metadata: Metadata = {
  title: "问题归类聚合 - 车辆舆情监控系统",
  description: "安全、续航、车机故障等标签聚合热度图分析",
}

export default function ProblemClassificationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">🧠 问题归类聚合</h2>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm">
            <option value="all">全部车型</option>
            <option value="suv">SUV车型</option>
            <option value="sedan">轿车车型</option>
            <option value="ev">新能源车型</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm">
            <option value="7d">近7天</option>
            <option value="30d">近30天</option>
            <option value="90d">近90天</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">安全问题</div>
            <div className="h-4 w-4 text-red-600">🚨</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-red-600">1,247</div>
            <p className="text-xs text-muted-foreground">+15.2% 较昨日</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">续航问题</div>
            <div className="h-4 w-4 text-orange-600">🔋</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-orange-600">892</div>
            <p className="text-xs text-muted-foreground">+8.7% 较昨日</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">车机故障</div>
            <div className="h-4 w-4 text-blue-600">📱</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-blue-600">634</div>
            <p className="text-xs text-muted-foreground">-3.1% 较昨日</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">质量问题</div>
            <div className="h-4 w-4 text-purple-600">🔧</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-purple-600">456</div>
            <p className="text-xs text-muted-foreground">+12.3% 较昨日</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ProblemHeatMap />
        <ProblemStats />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProblemTrends />
        </div>
        <HotIssues />
      </div>
    </div>
  )
}
