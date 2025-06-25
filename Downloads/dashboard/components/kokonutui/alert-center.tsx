"use client"

import { useState } from "react"
import { AlertTriangle, Bell, Clock, CheckCircle, Filter, Settings } from "lucide-react"

interface AlertRule {
  id: string
  name: string
  condition: string
  threshold: number
  status: "active" | "inactive"
  triggerCount: number
}

interface Alert {
  id: string
  ruleId: string
  ruleName: string
  level: "critical" | "warning" | "info"
  message: string
  details: string
  timestamp: string
  status: "new" | "acknowledged" | "resolved"
  assignee?: string
  carBrand?: string
  region?: string
}

export default function AlertCenter() {
  const [activeTab, setActiveTab] = useState<"rules" | "alerts">("alerts")

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "1",
      name: "负面情感阈值告警",
      condition: "负面情感占比 > 25% 且持续时间 > 30分钟",
      threshold: 25,
      status: "active",
      triggerCount: 12,
    },
    {
      id: "2",
      name: "特定车型风险告警",
      condition: "单一车型负面提及 > 50条/小时",
      threshold: 50,
      status: "active",
      triggerCount: 3,
    },
    {
      id: "3",
      name: "地域集中性告警",
      condition: "单一地区负面占比 > 40%",
      threshold: 40,
      status: "inactive",
      triggerCount: 0,
    },
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      ruleId: "1",
      ruleName: "负面情感阈值告警",
      level: "critical",
      message: "某品牌A车型负面情感激增",
      details: "过去30分钟内，某品牌A相关负面评论占比达到32.5%，主要集中在发动机异响问题",
      timestamp: "2分钟前",
      status: "new",
      carBrand: "某品牌A",
      region: "北京",
    },
    {
      id: "2",
      ruleId: "2",
      ruleName: "特定车型风险告警",
      level: "warning",
      message: "某品牌B仪表盘问题集中爆发",
      details: "检测到某品牌B车型仪表盘相关投诉在过去1小时内增长65条，建议立即关注",
      timestamp: "15分钟前",
      status: "acknowledged",
      assignee: "张工程师",
      carBrand: "某品牌B",
      region: "上海",
    },
    {
      id: "3",
      ruleId: "1",
      ruleName: "负面情感阈值告警",
      level: "info",
      message: "某品牌C负面情感回落",
      details: "某品牌C相关负面情感占比已从28%降至18%，情况好转",
      timestamp: "1小时前",
      status: "resolved",
      assignee: "李经理",
      carBrand: "某品牌C",
      region: "深圳",
    },
  ])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-500"
      case "acknowledged":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "acknowledged":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />
    }
  }

  const updateAlertStatus = (alertId: string, newStatus: "acknowledged" | "resolved") => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: newStatus } : alert)))
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          智能报警中心
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("alerts")}
            className={`px-4 py-2 text-sm rounded ${
              activeTab === "alerts"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            告警列表 ({alerts.filter((a) => a.status === "new").length})
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-4 py-2 text-sm rounded ${
              activeTab === "rules"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            预警规则
          </button>
          <Filter className="w-4 h-4 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {activeTab === "alerts" ? (
        <div className="space-y-4">
          {/* 告警统计 */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{alerts.filter((a) => a.status === "new").length}</div>
              <div className="text-xs text-red-600">新告警</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {alerts.filter((a) => a.status === "acknowledged").length}
              </div>
              <div className="text-xs text-yellow-600">处理中</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {alerts.filter((a) => a.status === "resolved").length}
              </div>
              <div className="text-xs text-green-600">已解决</div>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{alerts.length}</div>
              <div className="text-xs text-blue-600">总计</div>
            </div>
          </div>

          {/* 告警列表 */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.level === "critical"
                    ? "border-l-red-500 bg-red-50 dark:bg-red-900/10"
                    : alert.level === "warning"
                      ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                      : "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    <span className={`px-2 py-1 text-xs rounded border ${getLevelColor(alert.level)}`}>
                      {alert.level === "critical" ? "严重" : alert.level === "warning" ? "警告" : "信息"}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.status)}`} />
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">{alert.details}</div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {alert.carBrand && (
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                        {alert.carBrand}
                      </span>
                    )}
                    {alert.region && (
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                        {alert.region}
                      </span>
                    )}
                    {alert.assignee && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">负责人: {alert.assignee}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {alert.status === "new" && (
                      <>
                        <button
                          onClick={() => updateAlertStatus(alert.id, "acknowledged")}
                          className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          确认
                        </button>
                        <button
                          onClick={() => updateAlertStatus(alert.id, "resolved")}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          解决
                        </button>
                      </>
                    )}
                    {alert.status === "acknowledged" && (
                      <button
                        onClick={() => updateAlertStatus(alert.id, "resolved")}
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        解决
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 预警规则列表 */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">预警规则配置</span>
            <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1">
              <Settings className="w-3 h-3" />
              新增规则
            </button>
          </div>

          <div className="space-y-3">
            {alertRules.map((rule) => (
              <div key={rule.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{rule.name}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        rule.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                      }`}
                    >
                      {rule.status === "active" ? "启用" : "禁用"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">触发次数: {rule.triggerCount}</span>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rule.condition}</div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    阈值: {rule.threshold}
                    {rule.name.includes("占比") ? "%" : rule.name.includes("条数") ? "条/小时" : ""}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-300">
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        setAlertRules((prev) =>
                          prev.map((r) =>
                            r.id === rule.id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r,
                          ),
                        )
                      }}
                      className={`px-2 py-1 text-xs rounded ${
                        rule.status === "active"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {rule.status === "active" ? "禁用" : "启用"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 规则DSL示例 */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">规则DSL示例:</div>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div>• 情感阈值: sentiment.negative_rate &gt; 0.25 AND duration &gt; 30min</div>
              <div>• 车型过滤: car_brand == "某品牌A" AND mention_count &gt; 50/hour</div>
              <div>• 地域过滤: region IN ["北京", "上海"] AND negative_rate &gt; 0.4</div>
              <div>• 滑窗统计: sliding_window(1hour) COUNT(*) &gt; threshold</div>
            </div>
          </div>
        </div>
      )}

      {/* 企业微信/钉钉推送状态 */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            告警推送状态: 企业微信 ✅ | 钉钉 ✅ | 工单系统 ✅
          </div>
          <div className="text-xs text-gray-500">最近推送: 2分钟前</div>
        </div>
      </div>
    </div>
  )
}
