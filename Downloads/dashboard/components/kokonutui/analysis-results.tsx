"use client"

import { useState } from "react"
import { Brain, TrendingDown, AlertTriangle } from "lucide-react"

export default function AnalysisResults() {
  const [results] = useState({
    sentiment: {
      type: "negative",
      confidence: 0.94,
      keywords: ["异响", "质量", "后悔"],
    },
    carInfo: {
      brand: "某品牌A",
      model: "未识别",
      year: "2023",
    },
    problemAnalysis: {
      category: "可靠性问题",
      severity: 4,
      components: ["发动机", "传动系统"],
    },
    riskAssessment: {
      level: "高风险",
      score: 8.5,
      factors: ["负面情感强烈", "涉及核心部件", "用户影响力较高"],
    },
  })

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-purple-600" />
        AI分析结果
      </h3>

      <div className="space-y-4">
        {/* 情感分析 */}
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800 dark:text-red-200">情感分析</span>
          </div>
          <div className="text-lg font-bold text-red-900 dark:text-red-100">
            负面情感 ({(results.sentiment.confidence * 100).toFixed(1)}%)
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {results.sentiment.keywords.map((keyword, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-red-200 text-red-800 text-xs rounded">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 车辆信息 */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">车辆信息</h4>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-blue-700">品牌:</span> {results.carInfo.brand}
            </div>
            <div>
              <span className="text-blue-700">年份:</span> {results.carInfo.year}
            </div>
          </div>
        </div>

        {/* 问题分析 */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">问题分析</h4>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-yellow-700">类别:</span> {results.problemAnalysis.category}
            </div>
            <div className="text-sm">
              <span className="text-yellow-700">严重程度:</span>
              <span className="ml-1">{results.problemAnalysis.severity}/5</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {results.problemAnalysis.components.map((comp, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded">
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 风险评估 */}
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800 dark:text-red-200">风险评估</span>
          </div>
          <div className="text-lg font-bold text-red-900 dark:text-red-100">
            {results.riskAssessment.level} ({results.riskAssessment.score}/10)
          </div>
          <div className="mt-2 space-y-1">
            {results.riskAssessment.factors.map((factor, idx) => (
              <div key={idx} className="text-xs text-red-700 dark:text-red-300">
                • {factor}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
