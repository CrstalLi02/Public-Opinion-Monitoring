"use client"

import { useState } from "react"
import { AlertTriangle, Shield, Wrench } from "lucide-react"

interface ComponentRisk {
  component: string
  riskLevel: "critical" | "high" | "medium" | "low"
  riskScore: number
  mentionCount: number
  negativeRate: number
  trend: "up" | "down" | "stable"
  trendValue: number
  topIssues: string[]
  affectedModels: string[]
}

export default function ComponentRiskPanel() {
  const [components, setComponents] = useState<ComponentRisk[]>([
    {
      component: "发动机",
      riskLevel: "critical",
      riskScore: 8.7,
      mentionCount: 1247,
      negativeRate: 78.5,
      trend: "up",
      trendValue: 15.2,
      topIssues: ["异响", "抖动", "无力"],
      affectedModels: ["某品牌A-SUV", "某品牌A-轿车"],
    },
    {
      component: "变速箱",
      riskLevel: "high",
      riskScore: 7.2,
      mentionCount: 892,
      negativeRate: 65.3,
      trend: "up",
      trendValue: 8.7,
      topIssues: ["顿挫", "异响", "漏油"],
      affectedModels: ["某品牌B-SUV"],
    },
    {
      component: "仪表盘",
      riskLevel: "medium",
      riskScore: 5.8,
      mentionCount: 654,
      negativeRate: 45.2,
      trend: "stable",
      trendValue: 2.1,
      topIssues: ["显示异常", "死机", "按键失灵"],
      affectedModels: ["某品牌C-轿车", "某品牌C-MPV"],
    },
    {
      component: "刹车系统",
      riskLevel: "high",
      riskScore: 7.8,
      mentionCount: 523,
      negativeRate: 72.1,
      trend: "down",
      trendValue: -5.3,
      topIssues: ["制动距离长", "异响", "软踏板"],
      affectedModels: ["某品牌D-SUV"],
    },
    {
      component: "空调系统",
      riskLevel: "low",
      riskScore: 3.2,
      mentionCount: 321,
      negativeRate: 28.7,
      trend: "down",
      trendValue: -12.4,
      topIssues: ["制冷效果差", "异味", "噪音"],
      affectedModels: ["某品牌E-轿车"],
    },
  ])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "high":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      case "medium":
        return <Shield className="w-5 h-5 text-yellow-600" />
      default:
        return <Shield className="w-5 h-5 text-green-600" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      default:
        return "→"
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-500"
      case "down":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          零部件风险评估
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">导出报告</button>
          <button className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">预警设置</button>
        </div>
      </div>

      {/* 风险概览 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-lg font-bold text-red-900 dark:text-red-100">
            {components.filter((c) => c.riskLevel === "critical").length}
          </div>
          <div className="text-xs text-red-600">严重风险</div>
        </div>
        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="text-lg font-bold text-orange-900 dark:text-orange-100">
            {components.filter((c) => c.riskLevel === "high").length}
          </div>
          <div className="text-xs text-orange-600">高风险</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
            {components.filter((c) => c.riskLevel === "medium").length}
          </div>
          <div className="text-xs text-yellow-600">中风险</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg font-bold text-green-900 dark:text-green-100">
            {components.filter((c) => c.riskLevel === "low").length}
          </div>
          <div className="text-xs text-green-600">低风险</div>
        </div>
      </div>

      {/* 零部件风险列表 */}
      <div className="space-y-4">
        {components.map((component, index) => (
          <div
            key={index}
            className={`p-4 border-l-4 rounded-lg ${
              component.riskLevel === "critical"
                ? "border-l-red-500 bg-red-50 dark:bg-red-900/10"
                : component.riskLevel === "high"
                  ? "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10"
                  : component.riskLevel === "medium"
                    ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                    : "border-l-green-500 bg-green-50 dark:bg-green-900/10"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getRiskIcon(component.riskLevel)}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{component.component}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded border ${getRiskColor(component.riskLevel)}`}>
                      {component.riskLevel === "critical"
                        ? "严重"
                        : component.riskLevel === "high"
                          ? "高风险"
                          : component.riskLevel === "medium"
                            ? "中风险"
                            : "低风险"}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      风险分: {component.riskScore}/10
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className={`text-sm ${getTrendColor(component.trend)}`}>{getTrendIcon(component.trend)}</span>
                  <span className={`text-sm font-medium ${getTrendColor(component.trend)}`}>
                    {component.trendValue > 0 ? "+" : ""}
                    {component.trendValue}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">7天变化</div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
              <div>
                <div className="text-xs text-gray-500">提及数</div>
                <div className="font-bold text-gray-900 dark:text-white">{component.mentionCount}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">负面率</div>
                <div className="font-bold text-red-600">{component.negativeRate}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">主要问题</div>
                <div className="flex flex-wrap gap-1">
                  {component.topIssues.slice(0, 2).map((issue, idx) => (
                    <span key={idx} className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs rounded">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">影响车型</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">{component.affectedModels.length} 个车型</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {component.affectedModels.map((model, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {model}
                  </span>
                ))}
              </div>
              <button className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">查看详情</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
