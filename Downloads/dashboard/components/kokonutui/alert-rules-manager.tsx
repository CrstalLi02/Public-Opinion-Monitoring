"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Play, Pause, Copy, BarChart3 } from "lucide-react"

interface AlertRule {
  id: string
  name: string
  description: string
  dsl: string
  threshold: number
  timeWindow: string
  status: "active" | "inactive" | "testing"
  priority: "low" | "medium" | "high" | "critical"
  triggerCount: number
  lastTriggered: string
  createdBy: string
  createdAt: string
  filters: {
    carBrands?: string[]
    regions?: string[]
    platforms?: string[]
    sentimentTypes?: string[]
  }
}

export default function AlertRulesManager() {
  const [rules, setRules] = useState<AlertRule[]>([
    {
      id: "1",
      name: "负面情感阈值告警",
      description: "当负面情感占比超过设定阈值时触发告警",
      dsl: "sentiment.negative_rate > 0.25 AND duration > 30min",
      threshold: 25,
      timeWindow: "30分钟",
      status: "active",
      priority: "high",
      triggerCount: 12,
      lastTriggered: "2小时前",
      createdBy: "张工程师",
      createdAt: "2024-01-15",
      filters: {
        carBrands: ["某品牌A", "某品牌B"],
        regions: ["北京", "上海"],
        sentimentTypes: ["negative"],
      },
    },
    {
      id: "2",
      name: "特定车型风险告警",
      description: "单一车型负面提及数量异常增长时告警",
      dsl: "car_brand_mentions > 50/hour AND sentiment.negative_rate > 0.3",
      threshold: 50,
      timeWindow: "1小时",
      status: "active",
      priority: "critical",
      triggerCount: 3,
      lastTriggered: "30分钟前",
      createdBy: "李经理",
      createdAt: "2024-01-10",
      filters: {
        carBrands: ["某品牌A"],
        platforms: ["微博", "小红书"],
      },
    },
    {
      id: "3",
      name: "地域集中性告警",
      description: "特定地区负面情感集中爆发时告警",
      dsl: "region_negative_rate > 0.4 AND region_mentions > 100",
      threshold: 40,
      timeWindow: "2小时",
      status: "inactive",
      priority: "medium",
      triggerCount: 0,
      lastTriggered: "从未触发",
      createdBy: "王分析师",
      createdAt: "2024-01-08",
      filters: {
        regions: ["北京", "上海", "深圳"],
        sentimentTypes: ["negative"],
      },
    },
  ])

  const [selectedRule, setSelectedRule] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "testing":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const toggleRuleStatus = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, status: rule.status === "active" ? "inactive" : "active" } : rule,
      ),
    )
  }

  const duplicateRule = (ruleId: string) => {
    const rule = rules.find((r) => r.id === ruleId)
    if (rule) {
      const newRule = {
        ...rule,
        id: Date.now().toString(),
        name: `${rule.name} (副本)`,
        status: "inactive" as const,
        triggerCount: 0,
        lastTriggered: "从未触发",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setRules((prev) => [...prev, newRule])
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">告警规则管理</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Plus className="w-4 h-4" />
          新建规则
        </button>
      </div>

      {/* 规则统计 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg font-bold text-green-600">{rules.filter((r) => r.status === "active").length}</div>
          <div className="text-xs text-green-600">启用中</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
          <div className="text-lg font-bold text-gray-600">{rules.filter((r) => r.status === "inactive").length}</div>
          <div className="text-xs text-gray-600">已禁用</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-lg font-bold text-red-600">{rules.filter((r) => r.priority === "critical").length}</div>
          <div className="text-xs text-red-600">严重级别</div>
        </div>
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{rules.reduce((sum, r) => sum + r.triggerCount, 0)}</div>
          <div className="text-xs text-blue-600">总触发次数</div>
        </div>
      </div>

      {/* 规则列表 */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer ${
              selectedRule === rule.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            onClick={() => setSelectedRule(selectedRule === rule.id ? null : rule.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(rule.status)}`} />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{rule.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{rule.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded border ${getPriorityColor(rule.priority)}`}>
                  {rule.priority === "critical"
                    ? "严重"
                    : rule.priority === "high"
                      ? "高"
                      : rule.priority === "medium"
                        ? "中"
                        : "低"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleRuleStatus(rule.id)
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    {rule.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateRule(rule.id)
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
              <div>
                <span className="text-gray-500">阈值:</span>
                <span className="ml-1 font-medium">{rule.threshold}%</span>
              </div>
              <div>
                <span className="text-gray-500">时间窗口:</span>
                <span className="ml-1 font-medium">{rule.timeWindow}</span>
              </div>
              <div>
                <span className="text-gray-500">触发次数:</span>
                <span className="ml-1 font-medium">{rule.triggerCount}</span>
              </div>
              <div>
                <span className="text-gray-500">最近触发:</span>
                <span className="ml-1 font-medium">{rule.lastTriggered}</span>
              </div>
            </div>

            {selectedRule === rule.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
                {/* DSL规则 */}
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DSL规则:</div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">{rule.dsl}</div>
                </div>

                {/* 过滤条件 */}
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">过滤条件:</div>
                  <div className="flex flex-wrap gap-2">
                    {rule.filters.carBrands && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-500">品牌:</span>
                        {rule.filters.carBrands.map((brand, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {brand}
                          </span>
                        ))}
                      </div>
                    )}
                    {rule.filters.regions && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-500">地区:</span>
                        {rule.filters.regions.map((region, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            {region}
                          </span>
                        ))}
                      </div>
                    )}
                    {rule.filters.platforms && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-500">平台:</span>
                        {rule.filters.platforms.map((platform, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {platform}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-2 pt-2">
                  <button className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    <Edit className="w-3 h-3" />
                    编辑规则
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                    <BarChart3 className="w-3 h-3" />
                    查看统计
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    测试规则
                  </button>
                </div>

                {/* 创建信息 */}
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-600">
                  创建者: {rule.createdBy} • 创建时间: {rule.createdAt}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
