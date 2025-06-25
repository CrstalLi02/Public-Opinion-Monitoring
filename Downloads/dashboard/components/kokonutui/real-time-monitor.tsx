"use client"

import { useState, useEffect } from "react"
import { Activity, ArrowRight, Clock, CheckCircle, AlertCircle, Loader } from "lucide-react"

interface ProcessingItem {
  id: string
  content: string
  platform: string
  stage: "collecting" | "extracting" | "analyzing" | "completed"
  timestamp: string
  progress: number
}

export default function RealTimeMonitor() {
  const [processingItems, setProcessingItems] = useState<ProcessingItem[]>([
    {
      id: "1",
      content: "用户发布了关于新车质量的评价...",
      platform: "微博",
      stage: "analyzing",
      timestamp: "刚刚",
      progress: 75,
    },
    {
      id: "2",
      content: "包含车牌信息的图片正在处理...",
      platform: "小红书",
      stage: "extracting",
      timestamp: "1分钟前",
      progress: 45,
    },
    {
      id: "3",
      content: "抖音视频中的车辆信息提取完成",
      platform: "抖音",
      stage: "completed",
      timestamp: "2分钟前",
      progress: 100,
    },
    {
      id: "4",
      content: "正在采集快手平台数据...",
      platform: "快手",
      stage: "collecting",
      timestamp: "3分钟前",
      progress: 20,
    },
  ])

  const getStageInfo = (stage: string) => {
    switch (stage) {
      case "collecting":
        return {
          name: "数据采集",
          icon: <Activity className="w-3 h-3 text-blue-600 dark:text-blue-400" />,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
        }
      case "extracting":
        return {
          name: "信息提取",
          icon: <Loader className="w-3 h-3 text-yellow-600 dark:text-yellow-400 animate-spin" />,
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        }
      case "analyzing":
        return {
          name: "情感分析",
          icon: <Loader className="w-3 h-3 text-purple-600 dark:text-purple-400 animate-spin" />,
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-100 dark:bg-purple-900/30",
        }
      case "completed":
        return {
          name: "处理完成",
          icon: <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
        }
      default:
        return {
          name: "未知状态",
          icon: <AlertCircle className="w-3 h-3 text-gray-600 dark:text-gray-400" />,
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-100 dark:bg-gray-900/30",
        }
    }
  }

  // 模拟实时更新
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingItems((prev) =>
        prev.map((item) => {
          if (item.stage !== "completed" && Math.random() > 0.7) {
            const newProgress = Math.min(item.progress + Math.random() * 20, 100)
            let newStage = item.stage

            if (newProgress >= 100) {
              newStage = "completed"
            } else if (newProgress >= 60 && item.stage === "collecting") {
              newStage = "extracting"
            } else if (newProgress >= 80 && item.stage === "extracting") {
              newStage = "analyzing"
            }

            return { ...item, progress: newProgress, stage: newStage }
          }
          return item
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      {/* 处理流程图 */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">数据采集</span>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">信息提取</span>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">情感分析</span>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">结果整合</span>
          </div>
        </div>
      </div>

      {/* 实时处理列表 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-900 dark:text-white">实时处理队列</div>
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-green-600 dark:text-green-400" />
            <span className="text-xs text-green-600 dark:text-green-400">实时更新</span>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {processingItems.map((item) => {
            const stageInfo = getStageInfo(item.stage)
            return (
              <div key={item.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.platform}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${stageInfo.bgColor} ${stageInfo.color}`}
                    >
                      {stageInfo.icon}
                      {stageInfo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">{item.content}</div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        item.stage === "completed"
                          ? "bg-green-500"
                          : item.stage === "analyzing"
                            ? "bg-purple-500"
                            : item.stage === "extracting"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right">
                    {item.progress.toFixed(0)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 处理统计 */}
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-sm font-bold text-blue-900 dark:text-blue-100">24</div>
          <div className="text-xs text-blue-700 dark:text-blue-300">采集中</div>
        </div>
        <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-sm font-bold text-yellow-900 dark:text-yellow-100">18</div>
          <div className="text-xs text-yellow-700 dark:text-yellow-300">提取中</div>
        </div>
        <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-sm font-bold text-purple-900 dark:text-purple-100">12</div>
          <div className="text-xs text-purple-700 dark:text-purple-300">分析中</div>
        </div>
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-sm font-bold text-green-900 dark:text-green-100">156</div>
          <div className="text-xs text-green-700 dark:text-green-300">已完成</div>
        </div>
      </div>
    </div>
  )
}
