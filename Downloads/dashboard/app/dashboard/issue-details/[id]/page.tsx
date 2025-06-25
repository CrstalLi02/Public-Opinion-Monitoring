import { VehicleInformationCard } from "@/components/kokonutui/vehicle-information-card"
import { IssueSummaryCard } from "@/components/kokonutui/issue-summary-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, PlayCircle, MessageCircle, FileText, Users, BarChart3 } from "lucide-react"

// Placeholder data - in a real app, you'd fetch this based on params.id
const sampleIssueData = {
  id: "ISSUE-001",
  sourceName: "微博",
  title: "我的新车开了3个月就出现发动机异响，质量问题严重，厂家不给解决。",
  tags: ["#发动机", "#异响", "#质量问题"],
  ownerName: "小王",
  timestamp: "2024-01-20 14:30",
  status: "已完成",
  sentiment: { label: "消极", score: 94.0 },
  isAnnotated: true,
}

const sampleVehicleData = {
  licensePlate: "粤B88888",
  vin: "LSVDU2A57P02XXXXX",
  model: "Model Y 高性能版",
  series: "Model Y",
  brand: "特斯拉",
  color: "珍珠白",
  productionDate: "2023-03-15",
  saleDate: "2023-04-01",
  engineModel: "N/A (电动)",
  transmissionModel: "N/A (电动)",
  mileage: 12500,
  warrantyStatus: "保修期内",
  lastMaintenanceDate: "2024-01-10",
  ownerName: "李明",
  ownerPhone: "138****8888",
  insuranceExpiry: "2025-03-31",
}

const RelatedMediaCard = () => (
  <Card className="shadow-lg">
    <CardHeader className="bg-gray-50 rounded-t-lg">
      <CardTitle className="text-xl font-semibold text-gray-700 flex items-center">
        <ImageIcon className="mr-2 h-6 w-6 text-primary" />
        相关媒体 (Related Media)
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="aspect-square bg-muted rounded-md flex items-center justify-center">
            <img
              src={`/placeholder.svg?height=150&width=150&query=vehicle+issue+media+${idx + 1}`}
              alt={`Related media ${idx + 1}`}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">共 4 张图片/视频</p>
    </CardContent>
  </Card>
)

const AnalysisTimelineCard = () => (
  <Card className="shadow-lg">
    <CardHeader className="bg-gray-50 rounded-t-lg">
      <CardTitle className="text-xl font-semibold text-gray-700 flex items-center">
        <BarChart3 className="mr-2 h-6 w-6 text-primary" />
        分析与处置时间轴 (Analysis & Action Timeline)
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <ul className="space-y-4">
        {[
          { time: "2024-01-20 14:35", event: "系统自动识别舆情", actor: "系统", icon: <FileText size={18} /> },
          { time: "2024-01-20 15:00", event: "情感分析完成：消极", actor: "AI模型", icon: <MessageCircle size={18} /> },
          { time: "2024-01-20 16:10", event: "人工审核并标注", actor: "张三", icon: <Users size={18} /> },
          { time: "2024-01-21 09:30", event: "创建售后工单 #TS12345", actor: "张三", icon: <PlayCircle size={18} /> },
          { time: "2024-01-22 11:00", event: "联系车主小王，安排检测", actor: "售后客服", icon: <Users size={18} /> },
        ].map((item, idx) => (
          <li key={idx} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1 text-primary">{item.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-700">{item.event}</p>
              <p className="text-xs text-gray-500">
                {item.time} - {item.actor}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch issue details and vehicle data using params.id
  // For now, we use sample data.
  const issueId = params.id

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">舆情事件详情 (Issue Details) - ID: {issueId}</h1>
        <p className="text-gray-600">查看事件的完整信息、相关车辆数据和分析过程。</p>
      </header>

      <IssueSummaryCard issue={sampleIssueData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <VehicleInformationCard vehicleData={sampleVehicleData} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <RelatedMediaCard />
        </div>
      </div>

      <AnalysisTimelineCard />
    </div>
  )
}
