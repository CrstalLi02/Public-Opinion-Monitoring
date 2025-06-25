import type { Metadata } from "next"
import ContentSummaryList from "@/components/kokonutui/content-summary-list"
import SummaryAnalytics from "@/components/kokonutui/summary-analytics"
import KeywordExtraction from "@/components/kokonutui/keyword-extraction"

export const metadata: Metadata = {
  title: "用户摘要提取 - 车辆舆情监控系统",
  description: "贴子自动摘要、主诉点显示，LLM驱动的智能内容分析",
}

export default function ContentSummaryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">🧾 用户摘要提取</h2>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm">
            <option value="all">全部平台</option>
            <option value="weibo">微博</option>
            <option value="xiaohongshu">小红书</option>
            <option value="douyin">抖音</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm">
            <option value="negative">负面内容</option>
            <option value="positive">正面内容</option>
            <option value="neutral">中性内容</option>
            <option value="all">全部内容</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">重新分析</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ContentSummaryList />
        </div>
        <div className="space-y-4">
          <SummaryAnalytics />
          <KeywordExtraction />
        </div>
      </div>
    </div>
  )
}
