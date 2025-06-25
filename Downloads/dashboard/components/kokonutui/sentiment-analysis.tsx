"use client"

import { useState } from "react"
import { MessageSquare, TrendingUp, TrendingDown, AlertTriangle, Car, Wrench, Shield } from "lucide-react"

interface SentimentResult {
  id: string
  content: string
  platform: string
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
  problemCategory: string
  carBrand?: string
  summary: {
    mainPoints: string[]
    complaints?: string[]
    suggestions?: string[]
    keyIssues: string
  }
  timestamp: string
}

export default function SentimentAnalysis() {
  const [sentimentResults, setSentimentResults] = useState<SentimentResult[]>([
    {
      id: "1",
      content:
        "我的新车开了3个月就出现发动机异响，质量真的不行，后悔买这个牌子了。希望厂家能重视质量问题，改进生产工艺",
      platform: "微博",
      sentiment: "negative",
      confidence: 0.94,
      problemCategory: "可靠性问题",
      carBrand: "某品牌A",
      summary: {
        mainPoints: ["发动机异响", "质量问题", "品牌失望"],
        complaints: ["3个月出现异响", "质量不达标", "后悔购买"],
        suggestions: ["重视质量问题", "改进生产工艺"],
        keyIssues: "发动机异响导致的质量信任危机",
      },
      timestamp: "2分钟前",
    },
    {
      id: "2",
      content: "这款车的驾驶体验真的很棒，加速平顺，刹车灵敏，安全感满满。如果能在内饰材质上再提升一下就更完美了",
      platform: "小红书",
      sentiment: "positive",
      confidence: 0.89,
      problemCategory: "驾驶体验",
      carBrand: "某品牌B",
      summary: {
        mainPoints: ["驾驶体验优秀", "安全性能好", "内饰待改进"],
        complaints: [],
        suggestions: ["提升内饰材质"],
        keyIssues: "整体满意，内饰有改进空间",
      },
      timestamp: "5分钟前",
    },
    {
      id: "3",
      content: "仪表盘显示有时候会闪烁，不知道是不是正常现象，去4S店问了也说不清楚，希望能有更详细的说明书",
      platform: "抖音",
      sentiment: "neutral",
      confidence: 0.76,
      problemCategory: "仪表盘问题",
      carBrand: "某品牌C",
      summary: {
        mainPoints: ["仪表盘闪烁", "4S店解释不清", "需要详细说明"],
        complaints: ["4S店服务不专业"],
        suggestions: ["提供更详细的说明书", "改进售后服务"],
        keyIssues: "仪表盘异常及售后服务待改进",
      },
      timestamp: "8分钟前",
    },
  ])

  const [analysisStats, setAnalysisStats] = useState({
    totalAnalyzed: 12847,
    positiveRate: 45.2,
    negativeRate: 23.5,
    neutralRate: 31.3,
    avgConfidence: 0.87,
    topProblem: "可靠性问题",
  })

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "negative":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    }
  }

  const getProblemIcon = (category: string) => {
    if (category.includes("可靠性")) return <Wrench className="w-3 h-3" />
    if (category.includes("安全")) return <Shield className="w-3 h-3" />
    if (category.includes("仪表盘")) return <Car className="w-3 h-3" />
    return <AlertTriangle className="w-3 h-3" />
  }

  return (
    <div className="space-y-4">
      {/* 情感分析统计 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">{analysisStats.positiveRate}%</div>
          <div className="text-xs text-green-600 dark:text-green-400">积极情感</div>
        </div>
        <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
          <div className="text-2xl font-bold text-red-700 dark:text-red-300">{analysisStats.negativeRate}%</div>
          <div className="text-xs text-red-600 dark:text-red-400">负面情感</div>
        </div>
      </div>

      {/* LLM分析质量指标 */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">通义千问分析质量</span>
          <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
            {(analysisStats.avgConfidence * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${analysisStats.avgConfidence * 100}%` }}
          />
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">平均置信度</div>
      </div>

      {/* 实时分析结果流 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">实时情感分析结果</span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {sentimentResults.map((result) => (
            <div
              key={result.id}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{result.platform}</span>
                  {result.carBrand && (
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                      {result.carBrand}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{result.timestamp}</span>
              </div>

              <div className="text-xs text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">{result.content}</div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSentimentIcon(result.sentiment)}
                  <span
                    className={`text-xs font-medium ${
                      result.sentiment === "positive"
                        ? "text-green-600"
                        : result.sentiment === "negative"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {result.sentiment === "positive" ? "积极" : result.sentiment === "negative" ? "消极" : "中性"}
                  </span>
                </div>
                <span className="text-xs text-gray-500">置信度: {(result.confidence * 100).toFixed(1)}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {getProblemIcon(result.problemCategory)}
                  <span className="text-xs text-gray-600 dark:text-gray-400">{result.problemCategory}</span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  摘要: {result.summary.keyIssues}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 问题归类统计 */}
      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">主要问题类别</div>
        <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">{analysisStats.topProblem}</div>
        <div className="text-xs text-yellow-700 dark:text-yellow-300">占负面反馈的 34.2%</div>
      </div>

      {/* 新增：摘要分析统计 */}
      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <div className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">通义千问摘要分析</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-purple-600 dark:text-purple-400">主要抱怨: </span>
            <span className="font-medium">质量问题 (45%)</span>
          </div>
          <div>
            <span className="text-purple-600 dark:text-purple-400">改进建议: </span>
            <span className="font-medium">售后服务 (32%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
