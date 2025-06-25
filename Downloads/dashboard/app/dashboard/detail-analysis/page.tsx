import DetailViewer from "@/components/kokonutui/detail-viewer"
import AnalysisResults from "@/components/kokonutui/analysis-results"
import RelatedContent from "@/components/kokonutui/related-content"

export default function DetailAnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">单条详情分析</h1>
        <div className="text-sm text-gray-500">深度解析 • 多模态融合 • 关联分析</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DetailViewer />
        </div>
        <div className="space-y-6">
          <AnalysisResults />
          <RelatedContent />
        </div>
      </div>
    </div>
  )
}
