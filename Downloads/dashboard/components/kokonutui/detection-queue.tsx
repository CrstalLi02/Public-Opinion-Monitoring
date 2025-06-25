"use client"

import { useState } from "react"
import { Clock, ImageIcon, AlertCircle } from "lucide-react"

interface QueueItem {
  id: string
  imageUrl: string
  platform: string
  status: "waiting" | "processing" | "completed" | "failed"
  priority: "high" | "medium" | "low"
  estimatedTime: string
  detectionType: string[]
}

export default function DetectionQueue() {
  const [queueItems] = useState<QueueItem[]>([
    {
      id: "1",
      imageUrl: "/placeholder.svg?height=60&width=80",
      platform: "微博",
      status: "processing",
      priority: "high",
      estimatedTime: "2分钟",
      detectionType: ["YOLO", "OCR"],
    },
    {
      id: "2",
      imageUrl: "/placeholder.svg?height=60&width=80",
      platform: "小红书",
      status: "waiting",
      priority: "medium",
      estimatedTime: "5分钟",
      detectionType: ["仪表盘"],
    },
    {
      id: "3",
      imageUrl: "/placeholder.svg?height=60&width=80",
      platform: "抖音",
      status: "completed",
      priority: "low",
      estimatedTime: "已完成",
      detectionType: ["YOLO"],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "text-blue-600 bg-blue-100"
      case "waiting":
        return "text-yellow-600 bg-yellow-100"
      case "completed":
        return "text-green-600 bg-green-100"
      case "failed":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      default:
        return "text-green-600"
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">检测队列</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {queueItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <ImageIcon
              src={item.imageUrl || "/placeholder.svg"}
              alt="待检测图片"
              width={60}
              height={60}
              className="rounded object-cover"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.platform}</span>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                  {item.status === "processing"
                    ? "处理中"
                    : item.status === "waiting"
                      ? "等待中"
                      : item.status === "completed"
                        ? "已完成"
                        : "失败"}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1">
                {item.detectionType.map((type, idx) => (
                  <span key={idx} className="text-xs px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                    {type}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className={`w-3 h-3 ${getPriorityColor(item.priority)}`} />
                  <span className={getPriorityColor(item.priority)}>
                    {item.priority === "high" ? "高" : item.priority === "medium" ? "中" : "低"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
