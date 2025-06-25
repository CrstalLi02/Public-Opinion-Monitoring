"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react"

export default function MediaAnalysis() {
  const [stats] = useState({
    totalImages: 1284,
    totalVideos: 324,
    plateDetectionRate: 63.7,
    vinExtractionRate: 31.4,
    avgObjectsPerImage: 4.2,
  })

  return (
    <div className="bg-white dark:bg-[#0F0F12] border border-gray-200 dark:border-[#1F1F23] rounded-xl p-6 h-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-purple-600" />
        多媒体分析概览
      </h3>

      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">总图片数</span>
          <span className="font-medium text-gray-900 dark:text-white">{stats.totalImages}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">总视频数</span>
          <span className="font-medium text-gray-900 dark:text-white">{stats.totalVideos}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">车牌识别率</span>
          <span className="flex items-center gap-1 font-medium text-gray-900 dark:text-white">
            {stats.plateDetectionRate}%
            <TrendingUp className="w-3 h-3 text-green-600" />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">VIN提取率</span>
          <span className="flex items-center gap-1 font-medium text-gray-900 dark:text-white">
            {stats.vinExtractionRate}%
            <TrendingDown className="w-3 h-3 text-red-600" />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">平均目标数/图</span>
          <span className="font-medium text-gray-900 dark:text-white">{stats.avgObjectsPerImage}</span>
        </div>
      </div>
    </div>
  )
}
