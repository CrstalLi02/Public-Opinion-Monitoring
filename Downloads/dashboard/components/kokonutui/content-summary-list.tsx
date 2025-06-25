"use client"

import { useState } from "react"
import { MessageSquare, ThumbsUp, ThumbsDown, Clock, User, MapPin, Car } from "lucide-react"

interface ContentSummary {
  id: string
  originalContent: string
  summary: string
  mainComplaints: string[]
  suggestions: string[]
  sentiment: "positive" | "negative" | "neutral"
  platform: string
  author: string
  location?: string
  carModel?: string
  timestamp: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  aiConfidence: number
}

export default function ContentSummaryList() {
  const [summaries] = useState<ContentSummary[]>([
    {
      id: "1",
      originalContent:
        "买了这款车半年了，刚开始还挺满意的，但是最近发现续航越来越差，原本能跑400公里，现在只能跑300公里左右。而且充电也变慢了，以前1小时能充满，现在要1.5小时。客服说这是正常现象，但我觉得不太合理。希望厂家能给个说法，或者提供解决方案。另外，车机系统也经常卡顿，导航有时候会突然黑屏。",
      summary: "用户反映新能源车使用半年后续航能力下降25%，充电时间延长50%，同时车机系统存在卡顿和黑屏问题。",
      mainComplaints: ["续航能力下降", "充电时间延长", "车机系统卡顿", "导航黑屏"],
      suggestions: ["厂家提供解决方案", "改进车机系统稳定性"],
      sentiment: "negative",
      platform: "小红书",
      author: "新能源车主小李",
      location: "北京",
      carModel: "某品牌EV-Pro",
      timestamp: "2024-12-24 14:30",
      engagement: { likes: 156, comments: 43, shares: 12 },
      aiConfidence: 0.92,
    },
    {
      id: "2",
      originalContent:
        "这次试驾体验真的很棒！外观设计很时尚，内饰做工也很精致。最让我印象深刻的是智能驾驶功能，在高速上表现很稳定。销售顾问服务态度也很好，很专业。不过价格确实有点高，如果能再优惠一些就更好了。总体来说还是很满意的，准备下单了。",
      summary: "用户对试驾体验表示满意，称赞外观设计、内饰做工和智能驾驶功能，但认为价格偏高。",
      mainComplaints: ["价格偏高"],
      suggestions: ["提供更多优惠政策"],
      sentiment: "positive",
      platform: "微博",
      author: "汽车爱好者",
      location: "上海",
      carModel: "某品牌SUV-X",
      timestamp: "2024-12-24 13:15",
      engagement: { likes: 89, comments: 21, shares: 8 },
      aiConfidence: 0.88,
    },
    {
      id: "3",
      originalContent:
        "刚提车一个月，发现发动机有异响，特别是冷启动的时候。去4S店检查，说是正常现象，但我觉得不对劲。网上查了一下，发现很多车主都有类似问题。这个异响听起来很不舒服，担心会影响发动机寿命。希望厂家重视这个问题，不要总是说正常现象。",
      summary: "新车主反映发动机冷启动异响问题，4S店称为正常现象，但用户担心影响发动机寿命。",
      mainComplaints: ["发动机异响", "4S店服务态度", "质量担忧"],
      suggestions: ["厂家重视质量问题", "提供专业检测"],
      sentiment: "negative",
      platform: "抖音",
      author: "新车主小王",
      location: "广州",
      carModel: "某品牌轿车-A",
      timestamp: "2024-12-24 12:45",
      engagement: { likes: 234, comments: 67, shares: 23 },
      aiConfidence: 0.95,
    },
  ])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      case "negative":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      default:
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-4 h-4" />
      case "negative":
        return <ThumbsDown className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">内容摘要列表</h3>

        <div className="space-y-6">
          {summaries.map((summary) => (
            <div key={summary.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              {/* 头部信息 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getSentimentColor(summary.sentiment)}`}
                  >
                    {getSentimentIcon(summary.sentiment)}
                    {summary.sentiment === "positive" ? "正面" : summary.sentiment === "negative" ? "负面" : "中性"}
                  </div>
                  <span className="text-sm text-gray-500">{summary.platform}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">AI置信度: {(summary.aiConfidence * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  {summary.timestamp}
                </div>
              </div>

              {/* 用户信息 */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {summary.author}
                </div>
                {summary.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {summary.location}
                  </div>
                )}
                {summary.carModel && (
                  <div className="flex items-center gap-1">
                    <Car className="w-3 h-3" />
                    {summary.carModel}
                  </div>
                )}
              </div>

              {/* AI摘要 */}
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">🤖 AI智能摘要</h4>
                <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">{summary.summary}</p>
              </div>

              {/* 主要抱怨点 */}
              {summary.mainComplaints.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">😞 主要抱怨点</h4>
                  <div className="flex flex-wrap gap-2">
                    {summary.mainComplaints.map((complaint, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded"
                      >
                        {complaint}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 用户建议 */}
              {summary.suggestions.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">💡 用户建议</h4>
                  <div className="flex flex-wrap gap-2">
                    {summary.suggestions.map((suggestion, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded"
                      >
                        {suggestion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 原始内容预览 */}
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">📝 原始内容</h4>
                <div className="text-xs text-gray-600 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg max-h-20 overflow-hidden">
                  {summary.originalContent}
                  {summary.originalContent.length > 100 && (
                    <span className="text-blue-600 cursor-pointer ml-2">...展开</span>
                  )}
                </div>
              </div>

              {/* 互动数据 */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>👍 {summary.engagement.likes}</span>
                  <span>💬 {summary.engagement.comments}</span>
                  <span>🔄 {summary.engagement.shares}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">查看详情</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
            加载更多
          </button>
        </div>
      </div>
    </div>
  )
}
