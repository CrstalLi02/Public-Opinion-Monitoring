"use client"

import { useState } from "react"
import { Clock, MessageSquare, Share2, Heart } from "lucide-react"

export default function BehaviorPatterns() {
  const [patterns] = useState([
    {
      pattern: "发帖时间偏好",
      icon: Clock,
      data: [
        { label: "早晨 (6-12点)", value: 25, color: "bg-blue-500" },
        { label: "下午 (12-18点)", value: 35, color: "bg-green-500" },
        { label: "晚上 (18-24点)", value: 30, color: "bg-yellow-500" },
        { label: "深夜 (0-6点)", value: 10, color: "bg-purple-500" },
      ],
    },
    {
      pattern: "内容互动偏好",
      icon: MessageSquare,
      data: [
        { label: "评论", value: 45, color: "bg-blue-500" },
        { label: "点赞", value: 30, color: "bg-green-500" },
        { label: "分享", value: 15, color: "bg-yellow-500" },
        { label: "收藏", value: 10, color: "bg-purple-500" },
      ],
    },
    {
      pattern: "平台使用习惯",
      icon: Share2,
      data: [
        { label: "微博", value: 40, color: "bg-red-500" },
        { label: "小红书", value: 25, color: "bg-pink-500" },
        { label: "抖音", value: 20, color: "bg-black" },
        { label: "其他", value: 15, color: "bg-gray-500" },
      ],
    },
    {
      pattern: "情感表达倾向",
      icon: Heart,
      data: [
        { label: "积极情感", value: 35, color: "bg-green-500" },
        { label: "中性表达", value: 40, color: "bg-gray-500" },
        { label: "负面情感", value: 25, color: "bg-red-500" },
      ],
    },
  ])

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">用户行为模式</h3>

      <div className="space-y-6">
        {patterns.map((pattern, index) => (
          <div key={index}>
            <div className="flex items-center gap-2 mb-3">
              <pattern.icon className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{pattern.pattern}</h4>
            </div>
            <div className="space-y-2">
              {pattern.data.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                      {item.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
