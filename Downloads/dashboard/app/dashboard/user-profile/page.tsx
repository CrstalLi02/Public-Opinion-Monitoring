import UserProfileAnalysis from "@/components/kokonutui/user-profile-analysis"
import DemographicsChart from "@/components/kokonutui/demographics-chart"
import BehaviorPatterns from "@/components/kokonutui/behavior-patterns"

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">用户画像分析</h1>
        <div className="text-sm text-gray-500">用户分析 • 行为模式 • 画像洞察</div>
      </div>

      <UserProfileAnalysis />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemographicsChart />
        <BehaviorPatterns />
      </div>
    </div>
  )
}
