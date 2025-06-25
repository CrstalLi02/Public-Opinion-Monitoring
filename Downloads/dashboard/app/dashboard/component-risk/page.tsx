import ComponentRiskPanel from "@/components/kokonutui/component-risk-panel"
import RiskMatrix from "@/components/kokonutui/risk-matrix"
import ComponentTrends from "@/components/kokonutui/component-trends"

export default function ComponentRiskPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">零部件风险面板</h1>
        <div className="text-sm text-gray-500">风险评估 • 部件分析 • 预警监控</div>
      </div>

      <ComponentRiskPanel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskMatrix />
        <ComponentTrends />
      </div>
    </div>
  )
}
