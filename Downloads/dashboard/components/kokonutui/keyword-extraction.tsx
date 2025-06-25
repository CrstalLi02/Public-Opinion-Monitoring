"use client"

import { useState } from "react"

interface Keyword {
  word: string
  count: number
  sentiment: "positive" | "negative" | "neutral"
  category: string
}

export default function KeywordExtraction() {
  const [keywords] = useState<Keyword[]>([
    { word: "续航", count: 234, sentiment: "negative", category: "性能" },
    { word: "充电", count: 189, sentiment: "negative", category: "使用" },
    { word: "异响", count: 156, sentiment: "negative", category: "质量" },
    { word: "外观", count: 134, sentiment: "positive", category: "设计" },
    { word: "内饰", count: 123, sentiment: "positive", category: "设计" },
    { word: "服务", count: 112, sentiment: "negative", category: "售后" },
    { word: "价格", count: 98, sentiment: "negative", category: "成本" },
    { word: "智能", count: 87, sentiment: "positive", category: "科技" },
    { word: "舒适", count: 76, sentiment: "positive", category: "体验" },
    { word: "故障", count: 65, sentiment: "negative", category: "质量" },
  ])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "negative":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    }
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">关键词提取</h3>

        <div className="space-y-3">
          {keywords.map((keyword, index) => (
            <div
              key={keyword.word}
              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-400">#{index + 1}</span>
                <span className={`px-2 py-1 text-xs rounded ${getSentimentColor(keyword.sentiment)}`}>
                  {keyword.word}
                </span>
                <span className="text-xs text-gray-500">{keyword.category}</span>
              </div>
              <span className="font-medium text-sm">{keyword.count}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">词云分析</div>
          <div className="flex flex-wrap gap-2">
            {keywords.slice(0, 6).map((keyword) => (
              <span
                key={keyword.word}
                className={`px-2 py-1 text-xs rounded ${getSentimentColor(keyword.sentiment)}`}
                style={{ fontSize: `${Math.max(10, keyword.count / 20)}px` }}
              >
                {keyword.word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
