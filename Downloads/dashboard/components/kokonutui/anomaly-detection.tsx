"use client"

import { useState } from "react"
import { AlertTriangle, TrendingDown, Clock, MapPin, Car } from "lucide-react"

interface AnomalyEvent {
  id: string
  timestamp: string
  type: "spike" | "drop" | "unusual"
  severity: "high" | "medium" | "low"
  description: string
  metrics: {
    before: number
    after: number
    change: string
  }
  location?: string
  carModel?: string
  platform: string
  relatedContent: string
}

export default function AnomalyDetection() {
  const [anomalies] = useState<AnomalyEvent[]>([
    {
      id: "1",
      timestamp: "2024-12-24 14:30",
      type: "spike",
      severity: "high",
      description: "某品牌A车型负面情感异常激增",
      metrics: {
        before: 120,
        after: 580,
        change: "+383%",
      },
      location: "北京",
      carModel: "某品牌A-SUV",
      platform: "微博",
      relatedContent: "发动机异响问题集中爆发",
    },
    {
      id: "2",
      timestamp: "2024-12-24 11:15",
      type: "drop",
      severity: "medium",
      description: "小红书平台积极情感突然下降",
      metrics: {
        before: 450,
        after: 280,
        change: "-37.8%",
      },
      platform: "小红书",
      relatedContent: "用户对新车型外观设计不满",
    },
    {
      id: "3",
      timestamp: "2024-12-24 09:45",
      type: "unusual",
      severity: "low",
      description: "深夜时段异常活跃讨论",
      metrics: {
        before: 50,
        after: 180,
        change: "+260%",
      },
      location: "上海",
      platform: "抖音",
      relatedContent: "车机系统升级后用户反馈",
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
      case "low":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "spike":
        return <TrendingDown className="w-4 h-4 rotate-180" />
      case "drop":
        return <TrendingDown className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">负面异常点检测</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">实时监控</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(anomaly.type)}
                  <span className="font-medium">{anomaly.description}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(anomaly.severity)}`}>
                    {anomaly.severity === "high" ? "高" : anomaly.severity === "medium" ? "中" : "低"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  {anomaly.timestamp}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="text-sm text-gray-500">变化前</div>
                  <div className="font-bold">{anomaly.metrics.before}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="text-sm text-gray-500">变化后</div>
                  <div className="font-bold">{anomaly.metrics.after}</div>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <div className="text-sm text-gray-500">变化幅度</div>
                  <div className="font-bold text-red-600">{anomaly.metrics.change}</div>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <div className="text-sm text-gray-500">平台</div>
                  <div className="font-bold text-blue-600">{anomaly.platform}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  {anomaly.location && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {anomaly.location}
                    </div>
                  )}
                  {anomaly.carModel && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Car className="w-3 h-3" />
                      {anomaly.carModel}
                    </div>
                  )}
                </div>
                <div className="text-gray-500">相关内容: {anomaly.relatedContent}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800 dark:text-blue-200">异常检测说明</span>
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            系统基于历史数据和机器学习算法，实时监控情感指标异常变化。当检测到显著偏离正常范围的数据时，会自动标记为异常事件并发送预警。
          </div>
        </div>
      </div>
    </div>
  )
}
