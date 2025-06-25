"use client"

import { useState } from "react"
import { MapPin, Filter, TrendingDown, Eye } from "lucide-react"

interface RegionData {
  province: string
  city: string
  negativeCount: number
  totalCount: number
  negativeRate: number
  hotTopics: string[]
  coordinates: [number, number]
}

export default function SentimentHeatMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"province" | "city">("province")

  const [regionData, setRegionData] = useState<RegionData[]>([
    {
      province: "北京",
      city: "北京市",
      negativeCount: 1247,
      totalCount: 4521,
      negativeRate: 27.6,
      hotTopics: ["发动机异响", "仪表盘故障", "刹车问题"],
      coordinates: [116.4074, 39.9042],
    },
    {
      province: "上海",
      city: "上海市",
      negativeCount: 892,
      totalCount: 3208,
      negativeRate: 27.8,
      hotTopics: ["电池续航", "充电故障", "软件BUG"],
      coordinates: [121.4737, 31.2304],
    },
    {
      province: "广东",
      city: "深圳市",
      negativeCount: 654,
      totalCount: 2847,
      negativeRate: 23.0,
      hotTopics: ["空调异响", "内饰异味", "导航问题"],
      coordinates: [114.0579, 22.5431],
    },
    {
      province: "浙江",
      city: "杭州市",
      negativeCount: 432,
      totalCount: 1876,
      negativeRate: 23.0,
      hotTopics: ["轮胎磨损", "油耗偏高", "座椅不适"],
      coordinates: [120.1551, 30.2741],
    },
    {
      province: "江苏",
      city: "南京市",
      negativeCount: 321,
      totalCount: 1432,
      negativeRate: 22.4,
      hotTopics: ["变速箱顿挫", "噪音控制", "漆面问题"],
      coordinates: [118.7969, 32.0603],
    },
  ])

  const getHeatColor = (rate: number) => {
    if (rate >= 25) return "bg-red-500"
    if (rate >= 20) return "bg-orange-500"
    if (rate >= 15) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getHeatIntensity = (rate: number) => {
    if (rate >= 25) return "opacity-90"
    if (rate >= 20) return "opacity-70"
    if (rate >= 15) return "opacity-50"
    return "opacity-30"
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          舆情热力图分布
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("province")}
            className={`px-3 py-1 text-xs rounded ${
              viewMode === "province"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            省份
          </button>
          <button
            onClick={() => setViewMode("city")}
            className={`px-3 py-1 text-xs rounded ${
              viewMode === "city"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            城市
          </button>
          <Filter className="w-4 h-4 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* 简化的中国地图热力图 */}
      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4" style={{ height: "300px" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm">中国地图热力图区域</div>
        </div>

        {/* 热点标记 */}
        {regionData.map((region, index) => (
          <div
            key={index}
            className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-200 hover:scale-125 ${getHeatColor(region.negativeRate)} ${getHeatIntensity(region.negativeRate)}`}
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 3) * 20}%`,
            }}
            onClick={() => setSelectedRegion(selectedRegion === region.city ? null : region.city)}
            title={`${region.city}: ${region.negativeRate}%`}
          >
            <div className="w-full h-full rounded-full animate-ping absolute" />
          </div>
        ))}
      </div>

      {/* 热力图图例 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600 dark:text-gray-400">负面情感热度</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs text-gray-500">低</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-xs text-gray-500">中</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-xs text-gray-500">高</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-500">极高</span>
          </div>
        </div>
      </div>

      {/* 区域详情列表 */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {regionData.map((region, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedRegion === region.city
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            onClick={() => setSelectedRegion(selectedRegion === region.city ? null : region.city)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getHeatColor(region.negativeRate)}`} />
                <span className="font-medium text-gray-900 dark:text-white">
                  {viewMode === "province" ? region.province : region.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-red-600">{region.negativeRate}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
              <div>负面: {region.negativeCount}</div>
              <div>总计: {region.totalCount}</div>
            </div>

            {selectedRegion === region.city && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">热点话题:</div>
                <div className="flex flex-wrap gap-1">
                  {region.hotTopics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <button className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  <Eye className="w-3 h-3" />
                  查看详细数据
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
