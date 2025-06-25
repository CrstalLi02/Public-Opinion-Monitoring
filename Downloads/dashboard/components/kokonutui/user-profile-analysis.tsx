"use client"

import { useState } from "react"
import { Users, TrendingUp, MessageSquare, Star } from "lucide-react"

interface UserSegment {
  name: string
  count: number
  percentage: number
  characteristics: string[]
  avgSentiment: number
  engagementLevel: "high" | "medium" | "low"
  topConcerns: string[]
}

export default function UserProfileAnalysis() {
  const [segments, setSegments] = useState<UserSegment[]>([
    {
      name: "资深车主",
      count: 2847,
      percentage: 35.2,
      characteristics: ["拥车3年以上", "技术敏感", "影响力较高"],
      avgSentiment: -0.3,
      engagementLevel: "high",
      topConcerns: ["可靠性", "维修成本", "保值率"],
    },
    {
      name: "新手车主",
      count: 2156,
      percentage: 26.7,
      characteristics: ["首次购车", "价格敏感", "关注安全"],
      avgSentiment: 0.1,
      engagementLevel: "medium",
      topConcerns: ["驾驶体验", "安全配置", "售后服务"],
    },
    {
      name: "潜在买家",
      count: 1923,
      percentage: 23.8,
      characteristics: ["正在选车", "对比研究", "决策谨慎"],
      avgSentiment: 0.2,
      engagementLevel: "medium",
      topConcerns: ["性价比", "品牌口碑", "配置对比"],
    },
    {
      name: "汽车达人",
      count: 1147,
      percentage: 14.3,
      characteristics: ["专业知识", "意见领袖", "传播力强"],
      avgSentiment: -0.1,
      engagementLevel: "high",
      topConcerns: ["技术创新", "性能表现", "行业趋势"],
    },
  ])

  const getEngagementColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.1) return "text-green-600"
    if (sentiment < -0.1) return "text-red-600"
    return "text-yellow-600"
  }

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.1) return "积极"
    if (sentiment < -0.1) return "消极"
    return "中性"
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          用户群体画像
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">导出报告</button>
          <button className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">细分分析</button>
        </div>
      </div>

      {/* 总体概览 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
          <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
            {segments.reduce((sum, s) => sum + s.count, 0)}
          </div>
          <div className="text-xs text-blue-600">总用户数</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <div className="text-lg font-bold text-green-900 dark:text-green-100">
            {segments.filter((s) => s.engagementLevel === "high").length}
          </div>
          <div className="text-xs text-green-600">高活跃群体</div>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <MessageSquare className="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
            {(
              segments.reduce((sum, s) => sum + s.avgSentiment * s.count, 0) /
              segments.reduce((sum, s) => sum + s.count, 0)
            ).toFixed(2)}
          </div>
          <div className="text-xs text-purple-600">平均情感值</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
          <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">4</div>
          <div className="text-xs text-yellow-600">主要群体</div>
        </div>
      </div>

      {/* 用户群体详情 */}
      <div className="space-y-4">
        {segments.map((segment, index) => (
          <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-lg">{segment.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {segment.count} 人 ({segment.percentage}%)
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${getEngagementColor(segment.engagementLevel)}`}>
                    {segment.engagementLevel === "high"
                      ? "高活跃"
                      : segment.engagementLevel === "medium"
                        ? "中活跃"
                        : "低活跃"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getSentimentColor(segment.avgSentiment)}`}>
                  {getSentimentLabel(segment.avgSentiment)}
                </div>
                <div className="text-xs text-gray-500">平均情感</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">用户特征</h5>
                <div className="flex flex-wrap gap-1">
                  {segment.characteristics.map((char, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">主要关注点</h5>
                <div className="flex flex-wrap gap-1">
                  {segment.topConcerns.map((concern, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">占比分布</h5>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{segment.percentage}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
