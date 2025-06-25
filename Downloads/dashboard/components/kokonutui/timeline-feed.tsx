"use client"

import { useState, useEffect } from "react"
import { Clock, MessageSquare, Heart, Star, Tag } from "lucide-react"

interface TimelinePost {
  id: string
  platform: string
  content: string
  author: string
  timestamp: string
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
  keywords: string[]
  isHighlighted: boolean
  isFocused: boolean
  carBrand?: string
  problemType?: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
}

export default function TimelineFeed() {
  const [posts, setPosts] = useState<TimelinePost[]>([
    {
      id: "1",
      platform: "微博",
      content: "我的新车开了3个月就出现发动机异响，质量真的不行，后悔买这个牌子了，准备去4S店投诉",
      author: "车主小王",
      timestamp: "2分钟前",
      sentiment: "negative",
      confidence: 0.94,
      keywords: ["发动机异响", "质量问题", "4S店"],
      isHighlighted: true,
      isFocused: false,
      carBrand: "某品牌A",
      problemType: "可靠性问题",
      engagement: { likes: 23, comments: 8, shares: 5 },
    },
    {
      id: "2",
      platform: "小红书",
      content: "这款车的驾驶体验真的很棒！加速平顺，刹车灵敏，安全感满满，推荐给大家",
      author: "汽车达人",
      timestamp: "5分钟前",
      sentiment: "positive",
      confidence: 0.89,
      keywords: ["驾驶体验", "加速", "刹车", "安全"],
      isHighlighted: false,
      isFocused: false,
      carBrand: "某品牌B",
      problemType: "驾驶体验",
      engagement: { likes: 156, comments: 34, shares: 12 },
    },
    {
      id: "3",
      platform: "抖音",
      content: "仪表盘显示有时候会闪烁，不知道是不是正常现象，有没有遇到同样问题的朋友？",
      author: "新手司机",
      timestamp: "8分钟前",
      sentiment: "neutral",
      confidence: 0.76,
      keywords: ["仪表盘", "闪烁", "显示异常"],
      isHighlighted: true,
      isFocused: false,
      carBrand: "某品牌C",
      problemType: "仪表盘问题",
      engagement: { likes: 45, comments: 23, shares: 3 },
    },
  ])

  const [highlightKeywords, setHighlightKeywords] = useState(["发动机", "仪表盘", "质量", "异响"])
  const [autoScroll, setAutoScroll] = useState(true)

  // 模拟实时新帖子
  useEffect(() => {
    if (!autoScroll) return

    const interval = setInterval(() => {
      const newPost: TimelinePost = {
        id: Date.now().toString(),
        platform: ["微博", "小红书", "抖音", "快手"][Math.floor(Math.random() * 4)],
        content: [
          "刚提的新车，内饰做工还不错，就是有点异味",
          "这个品牌的售后服务真的很好，点赞！",
          "车载系统经常卡顿，希望能尽快修复",
          "油耗比预期的要高一些，不过动力还可以",
        ][Math.floor(Math.random() * 4)],
        author: `用户${Math.floor(Math.random() * 1000)}`,
        timestamp: "刚刚",
        sentiment: ["positive", "negative", "neutral"][Math.floor(Math.random() * 3)] as any,
        confidence: 0.7 + Math.random() * 0.3,
        keywords: ["内饰", "异味", "售后", "系统", "油耗"][Math.floor(Math.random() * 5)]
          ? ["内饰", "异味"]
          : ["售后", "服务"],
        isHighlighted: Math.random() > 0.7,
        isFocused: false,
        carBrand: `某品牌${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
        problemType: ["质量问题", "服务问题", "性能问题"][Math.floor(Math.random() * 3)],
        engagement: {
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 50),
          shares: Math.floor(Math.random() * 20),
        },
      }

      setPosts((prev) => [newPost, ...prev.slice(0, 9)]) // 保持最新10条
    }, 5000)

    return () => clearInterval(interval)
  }, [autoScroll])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-100 dark:bg-green-900/30"
      case "negative":
        return "text-red-600 bg-red-100 dark:bg-red-900/30"
      default:
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "😊"
      case "negative":
        return "😞"
      default:
        return "😐"
    }
  }

  const highlightText = (text: string, keywords: string[]) => {
    let highlightedText = text
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>`,
      )
    })
    return highlightedText
  }

  const toggleFocus = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isFocused: !post.isFocused } : post)))
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          实时舆情时间轴
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-3 py-1 text-xs rounded ${
              autoScroll ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {autoScroll ? "自动刷新" : "暂停刷新"}
          </button>
        </div>
      </div>

      {/* 关键词高亮设置 */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">关键词高亮:</div>
        <div className="flex flex-wrap gap-2">
          {highlightKeywords.map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs rounded"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* 时间轴流 */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`
              relative p-4 rounded-lg border transition-all duration-300
              ${post.isHighlighted ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10" : "border-gray-200 dark:border-gray-700"}
              ${post.isFocused ? "ring-2 ring-blue-500" : ""}
              ${index === 0 ? "animate-slideInDown" : ""}
            `}
          >
            {/* 新帖子标识 */}
            {index === 0 && <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />}

            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{post.platform}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{post.author}</span>
                {post.carBrand && (
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                    {post.carBrand}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{post.timestamp}</span>
                <button
                  onClick={() => toggleFocus(post.id)}
                  className={`p-1 rounded ${post.isFocused ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  <Star className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div
              className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: highlightText(post.content, highlightKeywords),
              }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-lg">{getSentimentIcon(post.sentiment)}</span>
                  <span className={`text-xs px-2 py-1 rounded ${getSentimentColor(post.sentiment)}`}>
                    {post.sentiment === "positive" ? "积极" : post.sentiment === "negative" ? "消极" : "中性"}
                  </span>
                  <span className="text-xs text-gray-500">{(post.confidence * 100).toFixed(1)}%</span>
                </div>

                {post.problemType && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{post.problemType}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{post.engagement.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{post.engagement.comments}</span>
                </div>
              </div>
            </div>

            {/* 关键词标签 */}
            {post.keywords.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap gap-1">
                  {post.keywords.map((keyword, keywordIndex) => (
                    <span
                      key={keywordIndex}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {posts.filter((p) => p.sentiment === "positive").length}
            </div>
            <div className="text-xs text-gray-500">积极</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {posts.filter((p) => p.sentiment === "negative").length}
            </div>
            <div className="text-xs text-gray-500">消极</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{posts.filter((p) => p.isFocused).length}</div>
            <div className="text-xs text-gray-500">关注</div>
          </div>
        </div>
      </div>
    </div>
  )
}
