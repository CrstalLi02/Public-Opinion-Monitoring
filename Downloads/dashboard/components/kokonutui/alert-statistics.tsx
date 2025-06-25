"use client"

import { useState } from "react"
import { TrendingUp, Clock, Users, Target, AlertTriangle, CheckCircle } from "lucide-react"

export default function AlertStatistics() {
  const [timeRange, setTimeRange] = useState("24h")

  const stats = {
    totalAlerts: 47,
    newAlerts: 12,
    inProgress: 18,
    resolved: 17,
    avgResponseTime: "8.5分钟",
    avgResolutionTime: "2.3小时",
    slaCompliance: 94.2,
    escalationRate: 12.8,
  }

  const alertsByPriority = [
    { priority: "严重", count: 3, color: "bg-red-500" },
    { priority: "高", count: 8, color: "bg-orange-500" },
    { priority: "中", count: 15, color: "bg-yellow-500" },
    { priority: "低", count: 21, color: "bg-blue-500" },
  ]

  const timeRanges = [
    { value: "1h", label: "近1小时" },
    { value: "24h", label: "近24小时" },
    { value: "7d", label: "近7天" },
    { value: "30d", label: "近30天" },
  ]

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">告警统计概览</h3>
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-xs rounded ${
                timeRange === range.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalAlerts}</div>
          <div className="text-xs text-blue-600">总告警数</div>
        </div>
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="w-6 h-6 mx-auto mb-2 bg-red-500 rounded-full animate-pulse" />
          <div className="text-2xl font-bold text-red-900 dark:text-red-100">{stats.newAlerts}</div>
          <div className="text-xs text-red-600">新告警</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
          <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{stats.inProgress}</div>
          <div className="text-xs text-yellow-600">处理中</div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.resolved}</div>
          <div className="text-xs text-green-600">已解决</div>
        </div>
      </div>

      {/* 性能指标 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">平均响应时间</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.avgResponseTime}</div>
        </div>
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">平均解决时间</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.avgResolutionTime}</div>
        </div>
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">SLA达成率</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.slaCompliance}%</div>
        </div>
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">升级率</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.escalationRate}%</div>
        </div>
      </div>

      {/* 优先级分布 */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">告警优先级分布</h4>
        <div className="space-y-2">
          {alertsByPriority.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.priority}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${(item.count / stats.totalAlerts) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
