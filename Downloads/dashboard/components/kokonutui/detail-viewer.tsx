"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn, Download, Share2, Eye } from "lucide-react"

export default function DetailViewer() {
  const [selectedContent] = useState({
    id: "1",
    type: "image",
    url: "/placeholder.svg?height=400&width=600",
    platform: "微博",
    author: "车主小王",
    publishTime: "2024-01-20 14:30",
    content: "我的新车开了3个月就出现发动机异响，质量真的不行，后悔买这个牌子了",
    detections: [
      { type: "车牌", value: "京A12345D", confidence: 0.95, bbox: [100, 150, 200, 180] },
      { type: "VIN码", value: "LSGKB54E8EA123456", confidence: 0.92, bbox: [50, 300, 250, 320] },
      { type: "仪表盘", value: "速度65km/h", confidence: 0.87, bbox: [300, 100, 500, 250] },
    ],
  })

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">内容详情</h3>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 内容信息 */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{selectedContent.platform}</span>
          <span className="text-xs text-gray-500">{selectedContent.author}</span>
          <span className="text-xs text-gray-500">{selectedContent.publishTime}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">{selectedContent.content}</p>
      </div>

      {/* 图片/视频展示 */}
      <div className="relative mb-4">
        <Image
          src={selectedContent.url || "/placeholder.svg"}
          alt="分析内容"
          width={600}
          height={400}
          className="w-full rounded-lg object-cover"
        />

        {/* 检测框叠加 */}
        {selectedContent.detections.map((detection, index) => (
          <div
            key={index}
            className="absolute border-2 border-red-500 bg-red-500/20"
            style={{
              left: `${(detection.bbox[0] / 600) * 100}%`,
              top: `${(detection.bbox[1] / 400) * 100}%`,
              width: `${((detection.bbox[2] - detection.bbox[0]) / 600) * 100}%`,
              height: `${((detection.bbox[3] - detection.bbox[1]) / 400) * 100}%`,
            }}
          >
            <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
              {detection.type}
            </div>
          </div>
        ))}
      </div>

      {/* 检测结果列表 */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">检测结果</h4>
        <div className="space-y-2">
          {selectedContent.detections.map((detection, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">{detection.type}:</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{detection.value}</span>
              </div>
              <span className="text-xs text-gray-500">{(detection.confidence * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
