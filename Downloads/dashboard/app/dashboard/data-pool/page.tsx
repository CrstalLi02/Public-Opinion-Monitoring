import DataPoolManager from "@/components/kokonutui/data-pool-manager"
import BatchProcessing from "@/components/kokonutui/batch-processing"
import DataAnnotation from "@/components/kokonutui/data-annotation"

export default function DataPoolPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">原始数据池</h1>
        <div className="text-sm text-gray-500">数据管理 • 批量处理 • 标注工具</div>
      </div>

      <DataPoolManager />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BatchProcessing />
        <DataAnnotation />
      </div>
    </div>
  )
}
