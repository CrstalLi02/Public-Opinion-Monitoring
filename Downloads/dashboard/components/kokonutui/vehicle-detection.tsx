"use client"

import { useState } from "react"
import { Car, FileText, ImageIcon, Eye, Camera } from "lucide-react"

interface VehicleDetectionResult {
  id: string
  imageUrl: string
  platform: string
  licensePlates: Array<{
    plate: string
    confidence: number
    source: "OCR" | "YOLO" | "PaddleOCR"
    isNewEnergy: boolean
  }>
  vins: Array<{
    vin: string
    confidence: number
    source: "OCR" | "Image"
  }>
  dashboardInfo?: {
    speed: string
    fuel: string
    mileage: string
    warnings: string[]
  }
  processingStage: "downloading" | "detecting" | "recognizing" | "completed"
  timestamp: string
}

export default function VehicleDetection() {
  const [detectionResults, setDetectionResults] = useState<VehicleDetectionResult[]>([
    {
      id: "1",
      imageUrl: "/placeholder.svg?height=100&width=150",
      platform: "微博",
      licensePlates: [
        { plate: "京A12345D", confidence: 0.95, source: "YOLO", isNewEnergy: true },
        { plate: "京A12345", confidence: 0.87, source: "OCR", isNewEnergy: false },
      ],
      vins: [{ vin: "LSGKB54E8EA123456", confidence: 0.92, source: "OCR" }],
      dashboardInfo: {
        speed: "65 km/h",
        fuel: "45%",
        mileage: "12,345 km",
        warnings: ["发动机故障灯"],
      },
      processingStage: "completed",
      timestamp: "2分钟前",
    },
    {
      id: "2",
      imageUrl: "/placeholder.svg?height=100&width=150",
      platform: "小红书",
      licensePlates: [{ plate: "沪B67890", confidence: 0.89, source: "PaddleOCR", isNewEnergy: false }],
      vins: [],
      processingStage: "recognizing",
      timestamp: "5分钟前",
    },
  ])

  const [extractionStats, setExtractionStats] = useState({
    totalImages: 8234,
    plateDetectionRate: 64.1,
    vinExtractionRate: 32.4,
    dashboardRecognitionRate: 28.7,
    newEnergyPlateCount: 2156,
    traditionalPlateCount: 3076,
  })

  const getProcessingStageInfo = (stage: string) => {
    switch (stage) {
      case "downloading":
        return { name: "下载图片", color: "text-blue-600", bg: "bg-blue-100" }
      case "detecting":
        return { name: "车牌检测", color: "text-yellow-600", bg: "bg-yellow-100" }
      case "recognizing":
        return { name: "文字识别", color: "text-purple-600", bg: "bg-purple-100" }
      case "completed":
        return { name: "处理完成", color: "text-green-600", bg: "bg-green-100" }
      default:
        return { name: "未知", color: "text-gray-600", bg: "bg-gray-100" }
    }
  }

  return (
    <div className="space-y-4">
      {/* 提取统计概览 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Car className="w-4 h-4 mx-auto mb-1 text-blue-600" />
          <div className="text-sm font-bold text-blue-700">{extractionStats.plateDetectionRate}%</div>
          <div className="text-xs text-blue-600">车牌识别率</div>
        </div>
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <FileText className="w-4 h-4 mx-auto mb-1 text-green-600" />
          <div className="text-sm font-bold text-green-700">{extractionStats.vinExtractionRate}%</div>
          <div className="text-xs text-green-600">VIN提取率</div>
        </div>
        <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Eye className="w-4 h-4 mx-auto mb-1 text-purple-600" />
          <div className="text-sm font-bold text-purple-700">{extractionStats.dashboardRecognitionRate}%</div>
          <div className="text-xs text-purple-600">仪表盘识别</div>
        </div>
      </div>

      {/* 新能源vs传统车牌统计 */}
      <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">车牌类型分布</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-green-700">{extractionStats.newEnergyPlateCount}</div>
            <div className="text-xs text-green-600">新能源车牌</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-700">{extractionStats.traditionalPlateCount}</div>
            <div className="text-xs text-blue-600">传统车牌</div>
          </div>
        </div>
      </div>

      {/* 实时检测结果 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">实时检测结果</span>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {detectionResults.map((result) => {
            const stageInfo = getProcessingStageInfo(result.processingStage)
            return (
              <div key={result.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex gap-3">
                  {/* 图片预览 */}
                  <div className="flex-shrink-0">
                    <ImageIcon
                      src={result.imageUrl || "/placeholder.svg"}
                      alt="检测图片"
                      className="w-16 h-12 object-cover rounded border"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* 头部信息 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{result.platform}</span>
                        <span className={`text-xs px-2 py-1 rounded ${stageInfo.bg} ${stageInfo.color}`}>
                          {stageInfo.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{result.timestamp}</span>
                    </div>

                    {/* 车牌信息 */}
                    {result.licensePlates.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">识别车牌:</div>
                        {result.licensePlates.map((plate, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded ${plate.isNewEnergy ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                              >
                                {plate.plate}
                              </span>
                              <span className="text-gray-500">({plate.source})</span>
                              {plate.isNewEnergy && <span className="text-green-600">新能源</span>}
                            </div>
                            <span className="text-gray-500">{(plate.confidence * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* VIN信息 */}
                    {result.vins.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">VIN码:</div>
                        {result.vins.map((vin, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-purple-700 bg-purple-100 px-2 py-1 rounded">
                                {vin.vin}
                              </span>
                              <span className="text-gray-500">({vin.source})</span>
                            </div>
                            <span className="text-gray-500">{(vin.confidence * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 仪表盘信息 */}
                    {result.dashboardInfo && (
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">仪表盘信息:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>速度: {result.dashboardInfo.speed}</div>
                          <div>油量: {result.dashboardInfo.fuel}</div>
                          <div>里程: {result.dashboardInfo.mileage}</div>
                          {result.dashboardInfo.warnings.length > 0 && (
                            <div className="col-span-2 text-red-600">
                              警告: {result.dashboardInfo.warnings.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
