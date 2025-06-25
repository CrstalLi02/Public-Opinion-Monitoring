import TopicClusters from "@/components/kokonutui/topic-clusters"
import ClusterAnalysis from "@/components/kokonutui/cluster-analysis"
import TopicTrends from "@/components/kokonutui/topic-trends"

export default function TopicClusteringPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">主题聚类视图</h1>
        <div className="text-sm text-gray-500">话题发现 • 聚类分析 • 趋势预测</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopicClusters />
        </div>
        <div className="space-y-6">
          <ClusterAnalysis />
          <TopicTrends />
        </div>
      </div>
    </div>
  )
}
