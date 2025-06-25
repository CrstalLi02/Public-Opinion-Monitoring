"use client"

import { useState } from "react"
import { Link2, TrendingUp } from "lucide-react"

export default function RelatedContent() {
  const [relatedItems] = useState([
    {
      id: "1",
      content: "同样是发动机异响问题...",
      platform: "小红书",
      similarity: 0.89,
      sentiment: "negative",
    },
    {
      id: "2",
      content: "某品牌A质量投诉汇总...",
      platform: "微博",
      similarity: 0.76,
      sentiment: "negative",
    },
    {
      id: "3",
      content: "发动机保养注意事项...",
      platform: "抖音",
      similarity: 0.65,
      sentiment: "neutral",
    },
  ])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Link2 className="w-5 h-5 text-green-600" />
        相关内容
      </h3>

      <div className="space-y-3">
        {relatedItems.map((item) => (
          <div
            key={item.id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{item.platform}</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-blue-600" />
                <span className="text-xs text-blue-600">{(item.similarity * 100).toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{item.content}</p>
            <div className={`text-xs ${getSentimentColor(item.sentiment)}`}>
              {item.sentiment === "positive" ? "积极" : item.sentiment === "negative" ? "消极" : "中性"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
