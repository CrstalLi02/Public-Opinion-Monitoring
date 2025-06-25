import AlertRulesManager from "@/components/kokonutui/alert-rules-manager"
import RuleDSLEditor from "@/components/kokonutui/rule-dsl-editor"
import RuleTestingPanel from "@/components/kokonutui/rule-testing-panel"

export default function AlertRulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">预警规则中心</h1>
        <div className="text-sm text-gray-500">规则引擎 • DSL配置 • 实时监控</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertRulesManager />
        <RuleDSLEditor />
      </div>

      <RuleTestingPanel />
    </div>
  )
}
