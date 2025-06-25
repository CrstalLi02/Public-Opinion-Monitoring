"use client"

import { useState } from "react"
import { Save, RotateCcw, Eye, ThumbsUp, ThumbsDown, Minus } from "lucide-react"

interface AnnotationData {
  recordId: string
  content: string
  platform: string
  currentAnnotation: {
    sentiment: "positive" | "negative" | "neutral" | null
    carBrand: string
    problemType: string
    severity: number
    tags: string[]
    notes: string
  }
  suggestedAnnotation: {
    sentiment: "positive" | "negative" | "neutral"
    confidence: number
    carBrand: string
    problemType: string
    tags: string[]
  }
}

export default function DataAnnotation() {
  const [currentRecord, setCurrentRecord] = useState<AnnotationData>({
    recordId: "1",
    content: "我的新车开了3个月就出现发动机异响，质量真的不行，后悔买这个牌子了",
    platform: "微博",
    currentAnnotation: {
      sentiment: null,
      carBrand: "",
      problemType: "",
      severity: 3,
      tags: [],
      notes: "",
    },
    suggestedAnnotation: {
      sentiment: "negative",
      confidence: 0.94,
      carBrand: "某品牌A",
      problemType: "可靠性问题",
      tags: ["发动机", "异响", "质量问题"],
    },
  })

  const [annotationQueue, setAnnotationQueue] = useState([
    { id: "1", content: "发动机异响问题...", status: "current" },
    { id: "2", content: "仪表盘显示异常...", status: "pending" },
    { id: "3", content: "驾驶体验很好...", status: "pending" },
  ])

  const problemTypes = [
    "可靠性问题",
    "安全性能",
    "内饰质量",
    "动力系统",
    "噪音控制",
    "驾驶体验",
    "售后服务",
    "其他问题",
  ]

  const carBrands = ["某品牌A", "某品牌B", "某品牌C", "某品牌D", "其他品牌"]

  const commonTags = ["发动机", "异响", "质量问题", "仪表盘", "故障", "驾驶体验", "安全", "售后", "维修", "保养"]

  const updateAnnotation = (field: string, value: any) => {
    setCurrentRecord((prev) => ({
      ...prev,
      currentAnnotation: {
        ...prev.currentAnnotation,
        [field]: value,
      },
    }))
  }

  const acceptSuggestion = () => {
    setCurrentRecord((prev) => ({
      ...prev,
      currentAnnotation: {
        ...prev.currentAnnotation,
        sentiment: prev.suggestedAnnotation.sentiment,
        carBrand: prev.suggestedAnnotation.carBrand,
        problemType: prev.suggestedAnnotation.problemType,
        tags: prev.suggestedAnnotation.tags,
      },
    }))
  }

  const addTag = (tag: string) => {
    if (!currentRecord.currentAnnotation.tags.includes(tag)) {
      updateAnnotation("tags", [...currentRecord.currentAnnotation.tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    updateAnnotation(
      "tags",
      currentRecord.currentAnnotation.tags.filter((t) => t !== tag),
    )
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-4 h-4 text-green-600" />
      case "negative":
        return <ThumbsDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-yellow-600" />
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">数据标注工具</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-2 text-xs bg-green-500 text-white rounded hover:bg-green-600">
            <Save className="w-3 h-3" />
            保存
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">
            <RotateCcw className="w-3 h-3" />
            重置
          </button>
        </div>
      </div>

      {/* 标注队列 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">标注队列</h4>
        <div className="flex gap-2 overflow-x-auto">
          {annotationQueue.map((item) => (
            <button
              key={item.id}
              className={`px-3 py-2 text-xs rounded whitespace-nowrap ${
                item.status === "current"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {item.content.substring(0, 20)}...
            </button>
          ))}
        </div>
      </div>

      {/* 内容展示 */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">{currentRecord.platform}</span>
          <span className="text-xs text-gray-500">记录ID: {currentRecord.recordId}</span>
        </div>
        <div className="text-sm text-gray-900 dark:text-white leading-relaxed">{currentRecord.content}</div>
      </div>

      {/* AI建议 */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">AI标注建议</h4>
          <button
            onClick={acceptSuggestion}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            采纳建议
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700 dark:text-blue-300">情感:</span>
            <div className="flex items-center gap-1 mt-1">
              {getSentimentIcon(currentRecord.suggestedAnnotation.sentiment)}
              <span className="text-blue-900 dark:text-blue-100">
                {currentRecord.suggestedAnnotation.sentiment === "positive"
                  ? "积极"
                  : currentRecord.suggestedAnnotation.sentiment === "negative"
                    ? "消极"
                    : "中性"}
              </span>
              <span className="text-xs text-blue-600">
                ({(currentRecord.suggestedAnnotation.confidence * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
          <div>
            <span className="text-blue-700 dark:text-blue-300">车辆品牌:</span>
            <div className="text-blue-900 dark:text-blue-100 mt-1">{currentRecord.suggestedAnnotation.carBrand}</div>
          </div>
          <div>
            <span className="text-blue-700 dark:text-blue-300">问题类型:</span>
            <div className="text-blue-900 dark:text-blue-100 mt-1">{currentRecord.suggestedAnnotation.problemType}</div>
          </div>
          <div>
            <span className="text-blue-700 dark:text-blue-300">建议标签:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {currentRecord.suggestedAnnotation.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-blue-200 text-blue-800 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 手动标注 */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">手动标注</h4>

        {/* 情感标注 */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">情感倾向</label>
          <div className="flex gap-2">
            {["positive", "negative", "neutral"].map((sentiment) => (
              <button
                key={sentiment}
                onClick={() => updateAnnotation("sentiment", sentiment)}
                className={`flex items-center gap-1 px-3 py-2 text-xs rounded ${
                  currentRecord.currentAnnotation.sentiment === sentiment
                    ? sentiment === "positive"
                      ? "bg-green-500 text-white"
                      : sentiment === "negative"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {getSentimentIcon(sentiment)}
                {sentiment === "positive" ? "积极" : sentiment === "negative" ? "消极" : "中性"}
              </button>
            ))}
          </div>
        </div>

        {/* 车辆品牌 */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">车辆品牌</label>
          <select
            value={currentRecord.currentAnnotation.carBrand}
            onChange={(e) => updateAnnotation("carBrand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          >
            <option value="">请选择品牌</option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* 问题类型 */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">问题类型</label>
          <select
            value={currentRecord.currentAnnotation.problemType}
            onChange={(e) => updateAnnotation("problemType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          >
            <option value="">请选择问题类型</option>
            {problemTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* 严重程度 */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            严重程度: {currentRecord.currentAnnotation.severity}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={currentRecord.currentAnnotation.severity}
            onChange={(e) => updateAnnotation("severity", Number.parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>轻微</span>
            <span>严重</span>
          </div>
        </div>

        {/* 标签 */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">标签</label>
          <div className="flex flex-wrap gap-1 mb-2">
            {currentRecord.currentAnnotation.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {tag}
                <button onClick={() => removeTag(tag)} className="text-blue-600 hover:text-blue-800">
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {commonTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                disabled={currentRecord.currentAnnotation.tags.includes(tag)}
                className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                +{tag}
              </button>
            ))}
          </div>
        </div>

        {/* 备注 */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">备注</label>
          <textarea
            value={currentRecord.currentAnnotation.notes}
            onChange={(e) => updateAnnotation("notes", e.target.value)}
            placeholder="添加标注备注..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
            rows={3}
          />
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">
          跳过
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            <Save className="w-4 h-4" />
            保存并下一条
          </button>
          <button className="flex items-center gap-1 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600">
            <Eye className="w-4 h-4" />
            预览结果
          </button>
        </div>
      </div>
    </div>
  )
}
