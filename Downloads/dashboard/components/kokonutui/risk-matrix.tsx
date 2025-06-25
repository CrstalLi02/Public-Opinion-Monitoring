"use client"

import { useState } from "react"

export default function RiskMatrix() {
  const [matrixData] = useState([
    { component: "发动机", probability: 8, impact: 9, x: 8, y: 9 },
    { component: "刹车", probability: 6, impact: 9, x: 6, y: 9 },
    { component: "变速箱", probability: 7, impact: 7, x: 7, y: 7 },
    { component: "仪表盘", probability: 5, impact: 4, x: 5, y: 4 },
    { component: "空调", probability: 3, impact: 2, x: 3, y: 2 },
  ])

  const getRiskZone = (x: number, y: number) => {
    const risk = x * y
    if (risk >= 64) return "critical"
    if (risk >= 36) return "high"
    if (risk >= 16) return "medium"
    return "low"
  }

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">风险矩阵</h3>

      <div className="relative">
        {/* 矩阵背景 */}
        <div className="w-full h-80 bg-gradient-to-tr from-green-100 via-yellow-100 to-red-100 dark:from-green-900/20 dark:via-yellow-900/20 dark:to-red-900/20 rounded-lg relative">
          {/* 网格线 */}
          <svg className="absolute inset-0 w-full h-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <g key={i}>
                <line
                  x1={`${(i * 100) / 10}%`}
                  y1="0%"
                  x2={`${(i * 100) / 10}%`}
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-300 dark:text-gray-600"
                />
                <line
                  x1="0%"
                  y1={`${100 - (i * 100) / 10}%`}
                  x2="100%"
                  y2={`${100 - (i * 100) / 10}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-300 dark:text-gray-600"
                />
              </g>
            ))}
          </svg>

          {/* 数据点 */}
          {matrixData.map((item, index) => (
            <div
              key={index}
              className={`absolute w-4 h-4 rounded-full ${getZoneColor(getRiskZone(item.x, item.y))} border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                left: `${(item.x * 100) / 10}%`,
                bottom: `${(item.y * 100) / 10}%`,
              }}
              title={`${item.component}: 概率${item.probability}, 影响${item.impact}`}
            />
          ))}
        </div>

        {/* 坐标轴标签 */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>低概率</span>
          <span>发生概率</span>
          <span>高概率</span>
        </div>
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
          <span>高影响</span>
          <span className="transform -rotate-90 whitespace-nowrap">影响程度</span>
          <span>低影响</span>
        </div>
      </div>

      {/* 图例 */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {matrixData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${getZoneColor(getRiskZone(item.x, item.y))}`} />
            <span className="text-gray-700 dark:text-gray-300">{item.component}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
