"use client"

import { useState } from "react"
import { BarChart3 } from "lucide-react"

export default function ClusterAnalysis() {
  const [selectedCluster] = useState({
    name: "发动机问题",
    totalMentions: 1247,
    sentiment: {
      positive: 12,
      negative: 78,
      neutral: 10,
    },
    keywords: ["异响", "抖动", "无力", "故障灯"],
    platforms: {
      微博: 45,
      小红书: 30,
      抖音: 25,
    },
    timeDistribution: [
      { time: "00-06", count: 23 },
      { time: "06-12", count: 156 },
      { time: "12-18", count: 234 },
      { time: "18-24", count: 189 },
    ],
  })

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        聚类分析
      </h3>

      <div className="space-y-4">
        {/* 选中聚类概览 */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">{selectedCluster.name}</h4>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{selectedCluster.totalMentions}</div>
          <div className="text-xs text-blue-600">总提及数</div>
        </div>

        {/* 情感分布 */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">情感分布</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-600">负面</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${selectedCluster.sentiment.negative}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{selectedCluster.sentiment.negative}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">积极</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${selectedCluster.sentiment.positive}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{selectedCluster.sentiment.positive}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 关键词 */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">关键词</h4>
          <div className="flex flex-wrap gap-1">
            {selectedCluster.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 平台分布 */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">平台分布</h4>
          <div className="space-y-1">
            {Object.entries(selectedCluster.platforms).map(([platform, percentage]) => (
              <div key={platform} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{platform}</span>
                <span className="font-medium">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
