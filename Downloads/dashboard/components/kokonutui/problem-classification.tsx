"use client"

import { useState } from "react"
import { AlertTriangle, Wrench, Shield, Palette, Zap, Volume2 } from "lucide-react"

interface ProblemCategory {
  name: string
  count: number
  percentage: number
  trend: "up" | "down" | "stable"
  icon: any
  color: string
}

export default function ProblemClassification() {
  const [categories, setCategories] = useState<ProblemCategory[]>([
    {
      name: "可靠性问题",
      count: 1247,
      percentage: 32.5,
      trend: "up",
      icon: Wrench,
      color: "text-red-600 dark:text-red-400",
    },
    {
      name: "安全性能",
      count: 892,
      percentage: 23.2,
      trend: "down",
      icon: Shield,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      name: "内饰质量",
      count: 654,
      percentage: 17.1,
      trend: "stable",
      icon: Palette,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "动力系统",
      count: 523,
      percentage: 13.6,
      trend: "up",
      icon: Zap,
      color: "text-green-600 dark:text-green-400",
    },
    {
      name: "噪音控制",
      count: 321,
      percentage: 8.4,
      trend: "down",
      icon: Volume2,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "其他问题",
      count: 198,
      percentage: 5.2,
      trend: "stable",
      icon: AlertTriangle,
      color: "text-gray-600 dark:text-gray-400",
    },
  ])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      default:
        return "→"
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-500"
      case "down":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      {/* 问题分类列表 */}
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <category.icon className={`w-4 h-4 ${category.color}`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{category.count}</span>
                <span className={`text-sm ${getTrendColor(category.trend)}`}>{getTrendIcon(category.trend)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    category.color.includes("red")
                      ? "bg-red-500"
                      : category.color.includes("orange")
                        ? "bg-orange-500"
                        : category.color.includes("blue")
                          ? "bg-blue-500"
                          : category.color.includes("green")
                            ? "bg-green-500"
                            : category.color.includes("purple")
                              ? "bg-purple-500"
                              : "bg-gray-500"
                  }`}
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right">{category.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* 总体统计 */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">问题分布概览</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-500 dark:text-gray-400">总问题数</div>
            <div className="font-bold text-gray-900 dark:text-white">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">主要问题</div>
            <div className="font-bold text-gray-900 dark:text-white">{categories[0].name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
