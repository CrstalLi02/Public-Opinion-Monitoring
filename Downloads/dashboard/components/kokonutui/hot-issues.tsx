"use client"

import { TrendingUp, AlertTriangle, MessageSquare } from "lucide-react"

interface HotIssue {
  id: string
  title: string
  category: string
  count: number
  trend: "up" | "down" | "stable"
  severity: "high" | "medium" | "low"
  lastUpdate: string
}

export default function HotIssues() {
  const hotIssues: HotIssue[] = [
    {
      id: "1",
      title: "某品牌A车型刹车失灵",
      category: "安全问题",
      count: 456,
      trend: "up",
      severity: "high",
      lastUpdate: "2小时前",
    },
    {
      id: "2",
      title: "新能源车续航严重缩水",
      category: "续航问题",
      count: 345,
      trend: "up",
      severity: "high",
      lastUpdate: "3小时前",
    },
    {
      id: "3",
      title: "车机系统频繁死机重启",
      category: "车机故障",
      count: 234,
      trend: "stable",
      severity: "medium",
      lastUpdate: "5小时前",
    },
    {
      id: "4",
      title: "发动机异响问题集中爆发",
      category: "质量问题",
      count: 189,
      trend: "up",
      severity: "medium",
      lastUpdate: "1小时前",
    },
    {
      id: "5",
      title: "4S店维修服务态度差",
      category: "服务问题",
      count: 156,
      trend: "down",
      severity: "low",
      lastUpdate: "6小时前",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
      case "low":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-red-500" />
      case "down":
        return <TrendingUp className="w-3 h-3 text-green-500 rotate-180" />
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    }
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">热点问题排行</h3>

        <div className="space-y-3">
          {hotIssues.map((issue, index) => (
            <div
              key={issue.id}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <div className="font-medium text-sm">{issue.title}</div>
                    <div className="text-xs text-gray-500">{issue.category}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(issue.severity)}`}>
                  {issue.severity === "high" ? "高" : issue.severity === "medium" ? "中" : "低"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-gray-500" />
                    <span className="text-sm font-medium">{issue.count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(issue.trend)}
                    <span className="text-xs text-gray-500">
                      {issue.trend === "up" ? "上升" : issue.trend === "down" ? "下降" : "稳定"}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{issue.lastUpdate}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">实时监控</span>
          </div>
          <div className="text-xs text-blue-700 dark:text-blue-300">
            系统每5分钟更新一次热点问题排行，基于提及频次、情感强度和传播范围综合计算。
          </div>
        </div>
      </div>
    </div>
  )
}
