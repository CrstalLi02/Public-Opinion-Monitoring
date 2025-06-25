import TimelineFeed from "@/components/kokonutui/timeline-feed"
import TimelineControls from "@/components/kokonutui/timeline-controls"
import TimelineAnalytics from "@/components/kokonutui/timeline-analytics"

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">实时舆情时间轴</h1>
        <div className="text-sm text-gray-500">实时监控 • 自动更新</div>
      </div>

      <TimelineControls />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TimelineFeed />
        </div>
        <div>
          <TimelineAnalytics />
        </div>
      </div>
    </div>
  )
}
