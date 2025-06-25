"use client"

import { useState } from "react"
import { Search, Filter, ImageIcon, VideoIcon } from "lucide-react"

export default function MediaFilters() {
  const [keyword, setKeyword] = useState("")
  const [mediaType, setMediaType] = useState<"all" | "image" | "video">("all")
  const [platform, setPlatform] = useState("全部")

  const platforms = ["全部", "微博", "小红书", "抖音", "快手"]

  return (
    <div className="bg-white dark:bg-[#0F0F12] border border-gray-200 dark:border-[#1F1F23] rounded-xl p-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索关键词..."
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
          >
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setMediaType("all")}
            className={`px-3 py-1 text-xs rounded ${
              mediaType === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setMediaType("image")}
            className={`flex items-center gap-1 px-3 py-1 text-xs rounded ${
              mediaType === "image"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            图片
          </button>
          <button
            onClick={() => setMediaType("video")}
            className={`flex items-center gap-1 px-3 py-1 text-xs rounded ${
              mediaType === "video"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <VideoIcon className="w-3 h-3" />
            视频
          </button>
        </div>
      </div>
    </div>
  )
}
