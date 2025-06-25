"use client"

import { useState } from "react"
import { Calendar, Filter, Download, RefreshCw, MapPin, BarChart3 } from "lucide-react"

export default function HeatMapControls() {
  const [timeRange, setTimeRange] = useState("24h")
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["全部"])
  const [mapType, setMapType] = useState<"province" | "city">("province")

  const brands = ["全部", "某品牌A", "某品牌B", "某品牌C", "某品牌D"]
  const timeRanges = [
    { value: "1h", label: "近1小时" },
    { value: "24h", label: "近24小时" },
    { value: "7d", label: "近7天" },
    { value: "30d", label: "近30天" },
  ]

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex flex-wrap items-center gap-4">
        {/* 时间范围选择 */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">时间范围:</span>
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

        {/* 品牌筛选 */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">品牌筛选:</span>
          <select
            className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            value={selectedBrands[0]}
            onChange={(e) => setSelectedBrands([e.target.value])}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* 地图类型 */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">显示级别:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setMapType("province")}
              className={`px-3 py-1 text-xs rounded ${
                mapType === "province"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              省份
            </button>
            <button
              onClick={() => setMapType("city")}
              className={`px-3 py-1 text-xs rounded ${
                mapType === "city"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              城市
            </button>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
            <RefreshCw className="w-3 h-3" />
            刷新
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
            <Download className="w-3 h-3" />
            导出
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600">
            <BarChart3 className="w-3 h-3" />
            分析报告
          </button>
        </div>
      </div>
    </div>
  )
}
