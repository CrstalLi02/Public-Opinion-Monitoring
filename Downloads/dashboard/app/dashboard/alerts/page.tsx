import AlertCenter from "@/components/kokonutui/alert-center"
import AlertWorkflow from "@/components/kokonutui/alert-workflow"
import AlertStatistics from "@/components/kokonutui/alert-statistics"

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">告警列表 & 工单管理</h1>
        <div className="text-sm text-gray-500">实时告警 • 工单流转 • 处理跟踪</div>
      </div>

      <AlertStatistics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AlertCenter />
        </div>
        <div>
          <AlertWorkflow />
        </div>
      </div>
    </div>
  )
}
