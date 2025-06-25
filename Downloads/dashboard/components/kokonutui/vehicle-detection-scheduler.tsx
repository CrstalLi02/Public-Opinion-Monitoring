"use client"

import { useState } from "react"
import { Play, Pause, Settings, BarChart3, Cpu, Zap } from "lucide-react"

interface DetectionTask {
  id: string
  name: string
  type: "yolo" | "ocr" | "dashboard" | "full"
  status: "running" | "paused" | "queued"
  priority: "high" | "medium" | "low"
  progress: number
  queueSize: number
  throughput: number
  gpuUsage: number
}

export default function VehicleDetectionScheduler() {
  const [tasks, setTasks] = useState<DetectionTask[]>([
    {
      id: "1",
      name: "YOLO车辆检测",
      type: "yolo",
      status: "running",
      priority: "high",
      progress: 78,
      queueSize: 245,
      throughput: 12.5,
      gpuUsage: 85,
    },
    {
      id: "2",
      name: "OCR车牌识别",
      type: "ocr",
      status: "running",
      priority: "medium",
      progress: 65,
      queueSize: 156,
      throughput: 8.3,
      gpuUsage: 62,
    },
    {
      id: "3",
      name: "仪表盘解析",
      type: "dashboard",
      status: "paused",
      priority: "low",
      progress: 0,
      queueSize: 89,
      throughput: 0,
      gpuUsage: 0,
    },
  ])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "yolo":
        return "bg-blue-100 text-blue-800"
      case "ocr":
        return "bg-green-100 text-green-800"
      case "dashboard":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: task.status === "running" ? "paused" : "running" } : task,
      ),
    )
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">检测任务调度器</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
            <Settings className="w-3 h-3" />
            调度配置
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-xs bg-green-500 text-white rounded hover:bg-green-600">
            <BarChart3 className="w-3 h-3" />
            性能监控
          </button>
        </div>
      </div>

      {/* 系统资源概览 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Cpu className="w-6 h-6 mx-auto mb-2 text-blue-600" />
          <div className="text-lg font-bold text-blue-900 dark:text-blue-100">4/8</div>
          <div className="text-xs text-blue-600">GPU使用</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Zap className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <div className="text-lg font-bold text-green-900 dark:text-green-100">28.1</div>
          <div className="text-xs text-green-600">总吞吐量/s</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">490</div>
          <div className="text-xs text-yellow-600">队列总数</div>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-lg font-bold text-purple-900 dark:text-purple-100">94.2%</div>
          <div className="text-xs text-purple-600">平均准确率</div>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{task.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded ${getTypeColor(task.type)}`}>
                      {task.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">优先级: {task.priority}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => toggleTask(task.id)} className="p-2 text-gray-500 hover:text-gray-700">
                {task.status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm mb-3">
              <div>
                <span className="text-gray-500">队列:</span>
                <span className="ml-1 font-medium">{task.queueSize}</span>
              </div>
              <div>
                <span className="text-gray-500">吞吐量:</span>
                <span className="ml-1 font-medium">{task.throughput}/s</span>
              </div>
              <div>
                <span className="text-gray-500">GPU:</span>
                <span className="ml-1 font-medium">{task.gpuUsage}%</span>
              </div>
              <div>
                <span className="text-gray-500">进度:</span>
                <span className="ml-1 font-medium">{task.progress}%</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  task.status === "running"
                    ? "bg-green-500"
                    : task.status === "paused"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                }`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
