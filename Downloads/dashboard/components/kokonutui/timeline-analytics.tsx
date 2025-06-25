"use client"

import { useState } from "react"
import { TrendingUp, Hash, Users, Clock, AlertTriangle } from "lucide-react"

interface TrendingTopic {
  keyword: string
  mentions: number
  sentiment: "positive" | "negative" | "neutral"
  trend: "up" | "down" | "stable"
  trendValue: number
}

interface InfluentialUser {
  username: string
  platform: string
  followers: number
  influence: number
  recentPosts: number
  sentiment: "positive" | "negative" | "neutral"
}

export default function TimelineAnalytics() {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([
    { keyword: "发动机异响", mentions: 423, sentiment: "negative", trend: "up", trendValue: 15.2 },
    { keyword: "仪表盘故障", mentions: 312, sentiment: "negative", trend: "up", trendValue: 8.7 },
    { keyword: "驾驶体验", mentions: 298, sentiment: "positive", trend: "stable", trendValue: 2.1 },
    { keyword: "售后服务", mentions: 267, sentiment: "negative", trend: "up", trendValue: 12.3 },
    { keyword: "油耗表现", mentions: 234, sentiment: "neutral", trend: "down", trendValue: -3.4 },
  ])

  const [influentialUsers, setInfluentialUsers] = useState<InfluentialUser[]>([
    {
      username: "汽车评测师老王",
      platform: "微博",
      followers: 125000,
      influence: 8.7,
      recentPosts: 5,
      sentiment: "negative",
    },
    {
      username: "车主小李",
      platform: "小红书",
      followers: 45000,
      influence: 6.2,
      recentPosts: 3,
      sentiment: "positive",
    },
    {
      username: "修车师傅张",
      platform: "抖音",
      followers: 78000,
      influence: 7.1,
      recentPosts: 8,
      sentiment: "negative",
    },
    { username: "汽车达人", platform: "知乎", followers: 89000, influence: 7.8, recentPosts: 2, sentiment: "neutral" },
  ])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      default:
        return "→"
    }
  }

  return (
    <div className="space-y-6">
      {/* 热门话题 */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-orange-600" />
          热门话题趋势
        </h3>

        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">#{topic.keyword}</span>
                  <span className={`text-xs ${getSentimentColor(topic.sentiment)}`}>
                    {topic.sentiment === "positive" ? "积极" : topic.sentiment === "negative" ? "消极" : "中性"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">{getTrendIcon(topic.trend)}</span>
                  <span
                    className={`text-xs ${topic.trend === "up" ? "text-red-500" : topic.trend === "down" ? "text-green-500" : "text-gray-500"}`}
                  >
                    {topic.trendValue > 0 ? "+" : ""}
                    {topic.trendValue}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">提及次数</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{topic.mentions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 意见领袖 */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          意见领袖动态
        </h3>

        <div className="space-y-3">
          {influentialUsers.map((user, index) => (
            <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{user.platform}</span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    user.sentiment === "positive"
                      ? "bg-green-100 text-green-700"
                      : user.sentiment === "negative"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.sentiment === "positive" ? "积极" : user.sentiment === "negative" ? "消极" : "中性"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-gray-500">粉丝数</div>
                  <div className="font-medium">{(user.followers / 1000).toFixed(1)}K</div>
                </div>
                <div>
                  <div className="text-gray-500">影响力</div>
                  <div className="font-medium">{user.influence}</div>
                </div>
                <div>
                  <div className="text-gray-500">近期发帖</div>
                  <div className="font-medium">{user.recentPosts}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 实时统计 */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          实时统计
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800 dark:text-blue-200">平均响应时间</span>
            </div>
            <span className="text-lg font-bold text-blue-900 dark:text-blue-100">2.3分钟</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-800 dark:text-red-200">待处理告警</span>
            </div>
            <span className="text-lg font-bold text-red-900 dark:text-red-100">7</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800 dark:text-green-200">处理效率</span>
            </div>
            <span className="text-lg font-bold text-green-900 dark:text-green-100">94.2%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
