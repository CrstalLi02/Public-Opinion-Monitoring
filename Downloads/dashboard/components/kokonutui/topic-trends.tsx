"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export default function TopicTrends() {
  const [trends] = useState([
    {
      topic: "发动机异响",
      change: 15.2,
      trend: "up",
      mentions: 423,
    },
    {
      topic: "仪表盘故障",
      change: -8.7,
      trend: "down",
      mentions: 312,
    },
    {
      topic: "驾驶体验",
      change: 2.1,
      trend: "stable",
      mentions: 298,
    },
    {
      topic: "售后服务",
      change: 12.3,
      trend: "up",
      mentions: 267,
    },
  ])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-600"
      case "down":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">话题趋势</h3>

      <div className="space-y-3">
        {trends.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white text-sm">{item.topic}</div>
              <div className="text-xs text-gray-500">{item.mentions} 提及</div>
            </div>
            <div className="flex items-center gap-2">
              {getTrendIcon(item.trend)}
              <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                {item.change > 0 ? "+" : ""}
                {item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
