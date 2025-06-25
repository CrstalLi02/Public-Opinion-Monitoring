"use client"

import { useState } from "react"
import { Database, ImageIcon, FileText, Wifi, WifiOff, Activity, AlertTriangle } from "lucide-react"

interface DataSource {
  platform: string
  apiName: string
  status: "active" | "inactive" | "error" | "rate_limited"
  todayCollected: number
  imagesDownloaded: number
  ocrProcessed: number
  collectionRate: string
  lastUpdate: string
  errorMessage?: string
}

interface CollectionTask {
  id: string
  platform: string
  contentType: "text" | "image" | "video"
  url: string
  status: "downloading" | "processing" | "storing" | "completed" | "failed"
  progress: number
  timestamp: string
}

export default function DataCollection() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      platform: "新浪微博",
      apiName: "新浪舆情通API",
      status: "active",
      todayCollected: 4521,
      imagesDownloaded: 1234,
      ocrProcessed: 987,
      collectionRate: "45/min",
      lastUpdate: "刚刚",
    },
    {
      platform: "小红书",
      apiName: "小红书开放API",
      status: "active",
      todayCollected: 3208,
      imagesDownloaded: 2156,
      ocrProcessed: 1876,
      collectionRate: "32/min",
      lastUpdate: "1分钟前",
    },
    {
      platform: "抖音",
      apiName: "抖音开放平台",
      status: "rate_limited",
      todayCollected: 1847,
      imagesDownloaded: 892,
      ocrProcessed: 654,
      collectionRate: "18/min",
      lastUpdate: "5分钟前",
      errorMessage: "API调用频率限制",
    },
    {
      platform: "快手",
      apiName: "快手开放API",
      status: "error",
      todayCollected: 0,
      imagesDownloaded: 0,
      ocrProcessed: 0,
      collectionRate: "0/min",
      lastUpdate: "15分钟前",
      errorMessage: "连接超时",
    },
  ])

  const [recentTasks, setRecentTasks] = useState<CollectionTask[]>([
    {
      id: "1",
      platform: "微博",
      contentType: "image",
      url: "https://weibo.com/post/123456",
      status: "storing",
      progress: 85,
      timestamp: "刚刚",
    },
    {
      id: "2",
      platform: "小红书",
      contentType: "text",
      url: "https://xiaohongshu.com/note/789012",
      status: "processing",
      progress: 60,
      timestamp: "1分钟前",
    },
    {
      id: "3",
      platform: "抖音",
      contentType: "video",
      url: "https://douyin.com/video/345678",
      status: "completed",
      progress: 100,
      timestamp: "3分钟前",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Wifi className="w-4 h-4 text-green-600" />
      case "rate_limited":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "error":
        return <WifiOff className="w-4 h-4 text-red-600" />
      default:
        return <WifiOff className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "rate_limited":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "failed":
        return "text-red-600"
      case "downloading":
        return "text-blue-600"
      case "processing":
        return "text-purple-600"
      case "storing":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const totalCollected = dataSources.reduce((sum, source) => sum + source.todayCollected, 0)
  const totalImages = dataSources.reduce((sum, source) => sum + source.imagesDownloaded, 0)
  const totalOCR = dataSources.reduce((sum, source) => sum + source.ocrProcessed, 0)

  return (
    <div className="space-y-4">
      {/* 采集统计概览 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <FileText className="w-4 h-4 mx-auto mb-1 text-blue-600" />
          <div className="text-sm font-bold text-blue-700">{totalCollected}</div>
          <div className="text-xs text-blue-600">文本采集</div>
        </div>
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <ImageIcon className="w-4 h-4 mx-auto mb-1 text-green-600" />
          <div className="text-sm font-bold text-green-700">{totalImages}</div>
          <div className="text-xs text-green-600">图片下载</div>
        </div>
        <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Database className="w-4 h-4 mx-auto mb-1 text-purple-600" />
          <div className="text-sm font-bold text-purple-700">{totalOCR}</div>
          <div className="text-xs text-purple-600">OCR处理</div>
        </div>
      </div>

      {/* 数据源状态 */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-900 dark:text-white">数据源状态</div>
        {dataSources.map((source, index) => (
          <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(source.status)}
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{source.platform}</div>
                  <div className="text-xs text-gray-500">{source.apiName}</div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(source.status)}`}>
                  {source.status === "active"
                    ? "正常"
                    : source.status === "rate_limited"
                      ? "限流"
                      : source.status === "error"
                        ? "异常"
                        : "暂停"}
                </span>
                <div className="text-xs text-gray-500 mt-1">{source.lastUpdate}</div>
              </div>
            </div>

            {source.errorMessage && (
              <div className="mb-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-700 dark:text-red-300">
                错误: {source.errorMessage}
              </div>
            )}

            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <div className="text-gray-500">文本</div>
                <div className="font-medium">{source.todayCollected}</div>
              </div>
              <div>
                <div className="text-gray-500">图片</div>
                <div className="font-medium">{source.imagesDownloaded}</div>
              </div>
              <div>
                <div className="text-gray-500">OCR</div>
                <div className="font-medium">{source.ocrProcessed}</div>
              </div>
              <div>
                <div className="text-gray-500">速率</div>
                <div className="font-medium">{source.collectionRate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 实时采集任务 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">实时采集任务</span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentTasks.map((task) => (
            <div key={task.id} className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-white dark:bg-gray-700 rounded">{task.platform}</span>
                  <span className="text-xs text-gray-600">
                    {task.contentType === "text" ? "文本" : task.contentType === "image" ? "图片" : "视频"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                    {task.status === "downloading"
                      ? "下载中"
                      : task.status === "processing"
                        ? "处理中"
                        : task.status === "storing"
                          ? "存储中"
                          : task.status === "completed"
                            ? "完成"
                            : "失败"}
                  </span>
                  <span className="text-xs text-gray-500">{task.timestamp}</span>
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-1 truncate">{task.url}</div>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${
                      task.status === "completed"
                        ? "bg-green-500"
                        : task.status === "failed"
                          ? "bg-red-500"
                          : "bg-blue-500"
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-10 text-right">{task.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 存储统计 */}
      <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">本地存储状态</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-indigo-600">图片存储</div>
            <div className="font-bold text-indigo-800">PNG格式统一存储</div>
          </div>
          <div>
            <div className="text-purple-600">数据库</div>
            <div className="font-bold text-purple-800">SelectDB 实时写入</div>
          </div>
        </div>
      </div>
    </div>
  )
}
