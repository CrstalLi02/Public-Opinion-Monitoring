"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw, Settings, BarChart3 } from "lucide-react"

interface BatchJob {
  id: string
  name: string
  type: "sentiment" | "vehicle_detection" | "ocr" | "full_pipeline"
  status: "running" | "paused" | "completed" | "failed"
  progress: number
  totalRecords: number
  processedRecords: number
  startTime: string
  estimatedTime: string
  errorCount: number
}

export default function BatchProcessing() {
  const [jobs, setJobs] = useState<BatchJob[]>([
    {
      id: "1",
      name: "重跑情感分析模型",
      type: "sentiment",
      status: "running",
      progress: 65,
      totalRecords: 1000,
      processedRecords: 650,
      startTime: "14:30",
      estimatedTime: "15分钟",
      errorCount: 3,
    },
    {
      id: "2",
      name: "批量车辆检测",
      type: "vehicle_detection",
      status: "paused",
      progress: 30,
      totalRecords: 500,
      processedRecords: 150,
      startTime: "13:45",
      estimatedTime: "25分钟",
      errorCount: 0,
    },
  ])

  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case "sentiment":
        return "情感分析"
      case "vehicle_detection":
        return "车辆检测"
      case "ocr":
        return "OCR识别"
      case "full_pipeline":
        return "完整流水线"
      default:
        return "未知类型"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleJobStatus = (jobId: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: job.status === "running" ? "paused" : job.status === "paused" ? "running" : job.status,
            }
          : job,
      ),
    )
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">批量处理任务</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          <Play className="w-4 h-4" />
          新建任务
        </button>
      </div>

      {/* 任务统计 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{jobs.length}</div>
          <div className="text-xs text-blue-600">总任务数</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg font-bold text-green-900 dark:text-green-100">
            {jobs.filter((j) => j.status === "running").length}
          </div>
          <div className="text-xs text-green-600">运行中</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
            {jobs.filter((j) => j.status === "paused").length}
          </div>
          <div className="text-xs text-yellow-600">已暂停</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-lg font-bold text-red-900 dark:text-red-100">
            {jobs.reduce((sum, j) => sum + j.errorCount, 0)}
          </div>
          <div className="text-xs text-red-600">错误数</div>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{job.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {getJobTypeLabel(job.type)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(job.status)}`}>
                    {job.status === "running"
                      ? "运行中"
                      : job.status === "paused"
                        ? "已暂停"
                        : job.status === "completed"
                          ? "已完成"
                          : "失败"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleJobStatus(job.id)} className="p-2 text-gray-500 hover:text-gray-700">
                  {job.status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">进度</span>
                <span className="text-gray-900 dark:text-white">
                  {job.processedRecords}/{job.totalRecords} ({job.progress}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    job.status === "running"
                      ? "bg-blue-500"
                      : job.status === "paused"
                        ? "bg-yellow-500"
                        : job.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                  }`}
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
              <div>
                <span className="text-gray-500">开始时间:</span>
                <span className="ml-1 text-gray-900 dark:text-white">{job.startTime}</span>
              </div>
              <div>
                <span className="text-gray-500">预计剩余:</span>
                <span className="ml-1 text-gray-900 dark:text-white">{job.estimatedTime}</span>
              </div>
              <div>
                <span className="text-gray-500">错误数:</span>
                <span className={`ml-1 ${job.errorCount > 0 ? "text-red-600" : "text-green-600"}`}>
                  {job.errorCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 快速操作 */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">快速批量操作</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <button className="px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">批量情感分析</button>
          <button className="px-3 py-2 text-xs bg-green-500 text-white rounded hover:bg-green-600">批量车辆检测</button>
          <button className="px-3 py-2 text-xs bg-purple-500 text-white rounded hover:bg-purple-600">
            批量OCR识别
          </button>
          <button className="px-3 py-2 text-xs bg-orange-500 text-white rounded hover:bg-orange-600">完整流水线</button>
        </div>
      </div>
    </div>
  )
}
