"use client"

import { useState } from "react"
import { Play, Pause, Filter, Search, Tag, AlertTriangle } from "lucide-react"

export default function TimelineControls() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["全部"])
  const [sentimentFilter, setSentimentFilter] = useState("全部")

  const platforms = ["全部", "微博", "小红书", "抖音", "快手", "知乎"]
  const sentiments = ["全部", "积极", "���极", "中性"]

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex flex-wrap items-center gap-4">
        {/* 播放控制 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              isPlaying ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "暂停" : "播放"}
          </button>
          <div className="text-sm text-gray-500">{isPlaying ? "实时更新中..." : "已暂停更新"}</div>
        </div>

        {/* 搜索框 */}
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="搜索关键词..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          />
        </div>

        {/* 平台筛选 */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">平台:</span>
          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
            value={selectedPlatforms[0]}
            onChange={(e) => setSelectedPlatforms([e.target.value])}
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        {/* 情感筛选 */}
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">情感:</span>
          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
          >
            {sentiments.map((sentiment) => (
              <option key={sentiment} value={sentiment}>
                {sentiment}
              </option>
            ))}
          </select>
        </div>

        {/* 快速筛选标签 */}
        <div className="flex items-center gap-2 ml-auto">
          <Tag className="w-4 h-4 text-gray-500" />
          <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">仅看负面</button>
          <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
            关注标记
          </button>
          <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">热门话题</button>
        </div>
      </div>

      {/* 实时统计 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">1,247</div>
            <div className="text-xs text-gray-500">今日新增</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">23.5%</div>
            <div className="text-xs text-gray-500">负面占比</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">156</div>
            <div className="text-xs text-gray-500">关注标记</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">45</div>
            <div className="text-xs text-gray-500">热门话题</div>
          </div>
        </div>
      </div>
    </div>
  )
}
