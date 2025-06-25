import type { Metadata } from "next"
import SentimentStatsPanel from "@/components/kokonutui/sentiment-stats-panel"
import SentimentTrends from "@/components/kokonutui/sentiment-trends"
import AnomalyDetection from "@/components/kokonutui/anomaly-detection"

export const metadata: Metadata = {
  title: "情感分类统计 - 车辆舆情监控系统",
  description: "情感分布图、日周趋势、负面异常点分析",
}

export default function SentimentStatsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">😊 情感分类统计</h2>
        <div className="flex items-center space-x-2">
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
            <div className="text-sm font-medium">总分析量</div>
            <div className="h-4 w-4 text-muted-foreground">📊</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% 较昨日</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">积极情感</div>
            <div className="h-4 w-4 text-green-600">😊</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-green-600">18,492</div>
            <p className="text-xs text-muted-foreground">40.9% 占比</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">负面情感</div>
            <div className="h-4 w-4 text-red-600">😞</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-red-600">12,847</div>
            <p className="text-xs text-muted-foreground">28.4% 占比</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">中性情感</div>
            <div className="h-4 w-4 text-yellow-600">😐</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-yellow-600">13,892</div>
            <p className="text-xs text-muted-foreground">30.7% 占比</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SentimentStatsPanel />
        <SentimentTrends />
      </div>

      <div className="grid gap-4">
        <AnomalyDetection />
      </div>
    </div>
  )
}
