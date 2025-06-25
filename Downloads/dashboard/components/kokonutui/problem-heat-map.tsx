"use client"

import { useState } from "react"

interface ProblemCategory {
  name: string
  count: number
  severity: "high" | "medium" | "low"
  change: string
  subcategories: Array<{
    name: string
    count: number
  }>
}

export default function ProblemHeatMap() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const problemCategories: ProblemCategory[] = [
    {
      name: "安全问题",
      count: 1247,
      severity: "high",
      change: "+15.2%",
      subcategories: [
        { name: "刹车失灵", count: 456 },
        { name: "气囊故障", count: 234 },
        { name: "转向异常", count: 189 },
        { name: "安全带问题", count: 156 },
        { name: "其他安全", count: 212 },
      ],
    },
    {
      name: "续航问题",
      count: 892,
      severity: "high",
      change: "+8.7%",
      subcategories: [
        { name: "续航缩水", count: 345 },
        { name: "充电慢", count: 234 },
        { name: "电池衰减", count: 178 },
        { name: "充电故障", count: 135 },
      ],
    },
    {
      name: "车机故障",
      count: 634,
      severity: "medium",
      change: "-3.1%",
      subcategories: [
        { name: "系统卡顿", count: 234 },
        { name: "黑屏重启", count: 156 },
        { name: "导航异常", count: 123 },
        { name: "语音识别", count: 121 },
      ],
    },
    {
      name: "质量问题",
      count: 456,
      severity: "medium",
      change: "+12.3%",
      subcategories: [
        { name: "异响问题", count: 145 },
        { name: "漆面问题", count: 123 },
        { name: "内饰脱落", count: 98 },
        { name: "密封不良", count: 90 },
      ],
    },
    {
      name: "服务问题",
      count: 345,
      severity: "low",
      change: "+5.4%",
      subcategories: [
        { name: "维修慢", count: 134 },
        { name: "态度差", count: 89 },
        { name: "费用高", count: 67 },
        { name: "配件缺", count: 55 },
      ],
    },
    {
      name: "外观问题",
      count: 234,
      severity: "low",
      change: "-1.2%",
      subcategories: [
        { name: "设计不满", count: 89 },
        { name: "颜色问题", count: 67 },
        { name: "尺寸问题", count: 45 },
        { name: "其他外观", count: 33 },
      ],
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHeatIntensity = (count: number, maxCount: number) => {
    const intensity = count / maxCount
    if (intensity > 0.8) return "bg-red-600"
    if (intensity > 0.6) return "bg-red-500"
    if (intensity > 0.4) return "bg-orange-500"
    if (intensity > 0.2) return "bg-yellow-500"
    return "bg-green-500"
  }

  const maxCount = Math.max(...problemCategories.map((p) => p.count))

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">问题分类热度图</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {problemCategories.map((category) => (
            <div
              key={category.name}
              className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${getHeatIntensity(
                category.count,
                maxCount,
              )} text-white ${selectedCategory === category.name ? "ring-2 ring-blue-400" : ""}`}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            >
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-2xl font-bold">{category.count}</div>
              <div className="text-xs opacity-90">{category.change}</div>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-3">{selectedCategory} - 详细分类</h4>
            <div className="grid grid-cols-2 gap-2">
              {problemCategories
                .find((c) => c.name === selectedCategory)
                ?.subcategories.map((sub) => (
                  <div
                    key={sub.name}
                    className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded"
                  >
                    <span className="text-sm">{sub.name}</span>
                    <span className="font-medium">{sub.count}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>热度等级:</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>低</span>
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>中</span>
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>高</span>
            </div>
          </div>
          <div>点击查看详细分类</div>
        </div>
      </div>
    </div>
  )
}
