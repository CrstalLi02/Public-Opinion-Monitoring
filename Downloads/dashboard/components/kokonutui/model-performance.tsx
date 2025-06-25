"use client"

import { useState } from "react"
import { TrendingUp, Zap, Target } from "lucide-react"

export default function ModelPerformance() {
  const [models] = useState([
    {
      name: "YOLO v8",
      accuracy: 94.2,
      speed: "12.5ms",
      throughput: "80/s",
      trend: "up",
    },
    {
      name: "PaddleOCR",
      accuracy: 91.7,
      speed: "8.3ms",
      throughput: "120/s",
      trend: "stable",
    },
    {
      name: "仪表盘解析",
      accuracy: 87.4,
      speed: "15.2ms",
      throughput: "65/s",
      trend: "down",
    },
  ])

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">模型性能监控</h3>

      <div className="space-y-4">
        {models.map((model, index) => (
          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">{model.name}</h4>
              <TrendingUp
                className={`w-4 h-4 ${
                  model.trend === "up" ? "text-green-600" : model.trend === "down" ? "text-red-600" : "text-gray-600"
                }`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <Target className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <div className="font-bold text-blue-900 dark:text-blue-100">{model.accuracy}%</div>
                <div className="text-xs text-blue-600">准确率</div>
              </div>
              <div className="text-center">
                <Zap className="w-4 h-4 mx-auto mb-1 text-green-600" />
                <div className="font-bold text-green-900 dark:text-green-100">{model.speed}</div>
                <div className="text-xs text-green-600">延迟</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-900 dark:text-purple-100">{model.throughput}</div>
                <div className="text-xs text-purple-600">吞吐量</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
