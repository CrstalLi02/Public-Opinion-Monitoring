import SentimentHeatMap from "@/components/kokonutui/sentiment-heat-map"
import RegionalAnalysis from "@/components/kokonutui/regional-analysis"
import HeatMapControls from "@/components/kokonutui/heatmap-controls"

export default function HeatMapPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">舆情热力图分布</h1>
        <div className="text-sm text-gray-500">实时更新 • 数据来源：全网监控</div>
      </div>

      <HeatMapControls />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentHeatMap />
        <RegionalAnalysis />
      </div>
    </div>
  )
}
