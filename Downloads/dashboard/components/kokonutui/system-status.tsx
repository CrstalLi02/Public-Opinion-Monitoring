"use client"

import { useState } from "react"
import { Server, Database, Cpu, HardDrive, Wifi, AlertCircle, CheckCircle } from "lucide-react"

interface SystemMetric {
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "critical"
  icon: any
}

export default function SystemStatus() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: "CPU使用率",
      value: 45,
      unit: "%",
      status: "normal",
      icon: Cpu,
    },
    {
      name: "内存使用",
      value: 68,
      unit: "%",
      status: "warning",
      icon: Server,
    },
    {
      name: "磁盘空间",
      value: 23,
      unit: "%",
      status: "normal",
      icon: HardDrive,
    },
    {
      name: "数据库连接",
      value: 156,
      unit: "个",
      status: "normal",
      icon: Database,
    },
    {
      name: "网络延迟",
      value: 45,
      unit: "ms",
      status: "normal",
      icon: Wifi,
    },
  ])

  const [services, setServices] = useState([
    { name: "数据采集服务", status: "running" },
    { name: "图像识别服务", status: "running" },
    { name: "情感分析服务", status: "running" },
    { name: "数据库服务", status: "running" },
    { name: "API网关", status: "warning" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
      case "running":
        return "text-green-600 dark:text-green-400"
      case "warning":
        return "text-yellow-600 dark:text-yellow-400"
      case "critical":
      case "error":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
      case "running":
        return <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
      case "warning":
        return <AlertCircle className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
      case "critical":
      case "error":
        return <AlertCircle className="w-3 h-3 text-red-600 dark:text-red-400" />
      default:
        return <AlertCircle className="w-3 h-3 text-gray-600 dark:text-gray-400" />
    }
  }

  return (
    <div className="space-y-4">
      {/* 系统指标 */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-900 dark:text-white">系统指标</div>
        {metrics.map((metric, index) => (
          <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <metric.icon className={`w-3 h-3 ${getStatusColor(metric.status)}`} />
                <span className="text-xs text-gray-700 dark:text-gray-300">{metric.name}</span>
              </div>
              <span className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.value}
                {metric.unit}
              </span>
            </div>
            {metric.unit === "%" && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    metric.status === "normal"
                      ? "bg-green-500"
                      : metric.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 服务状态 */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-900 dark:text-white">服务状态</div>
        <div className="space-y-1">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <span className="text-xs text-gray-700 dark:text-gray-300">{service.name}</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(service.status)}
                <span className={`text-xs ${getStatusColor(service.status)}`}>
                  {service.status === "running" ? "运行中" : service.status === "warning" ? "警告" : "异常"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 系统概览 */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">系统状态</div>
        <div className="text-lg font-bold text-blue-900 dark:text-blue-100">正常运行</div>
        <div className="text-xs text-blue-700 dark:text-blue-300">所有核心服务运行正常</div>
      </div>
    </div>
  )
}
