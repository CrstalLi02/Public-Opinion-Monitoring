"use client"

import { useState } from "react"
import { Database, Filter, Download, Upload, RefreshCw, Search, Calendar } from "lucide-react"

interface DataRecord {
  id: string
  platform: string
  contentType: "text" | "image" | "video"
  content: string
  author: string
  publishTime: string
  collectTime: string
  processStatus: "pending" | "processing" | "completed" | "failed"
  sentiment?: "positive" | "negative" | "neutral"
  confidence?: number
  carBrand?: string
  hasAnnotation: boolean
  tags: string[]
}

export default function DataPoolManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])

  const [dataRecords, setDataRecords] = useState<DataRecord[]>([
    {
      id: "1",
      platform: "微博",
      contentType: "text",
      content: "我的新车开了3个月就出现发动机异响，质量真的不行...",
      author: "车主小王",
      publishTime: "2024-01-20 14:30",
      collectTime: "2024-01-20 14:32",
      processStatus: "completed",
      sentiment: "negative",
      confidence: 0.94,
      carBrand: "某品牌A",
      hasAnnotation: true,
      tags: ["发动机", "异响", "质量问题"],
    },
    {
      id: "2",
      platform: "小红书",
      contentType: "image",
      content: "车辆仪表盘显示图片",
      author: "汽车达人",
      publishTime: "2024-01-20 13:45",
      collectTime: "2024-01-20 13:47",
      processStatus: "processing",
      hasAnnotation: false,
      tags: ["仪表盘", "图片"],
    },
    {
      id: "3",
      platform: "抖音",
      contentType: "video",
      content: "车辆驾驶体验分享视频",
      author: "新手司机",
      publishTime: "2024-01-20 12:15",
      collectTime: "2024-01-20 12:18",
      processStatus: "pending",
      hasAnnotation: false,
      tags: ["驾驶体验", "视频"],
    },
  ])

  const platforms = ["全部", "微博", "小红书", "抖音", "快手"]
  const statuses = ["全部", "待处理", "处理中", "已完成", "失败"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return "🖼️"
      case "video":
        return "🎥"
      default:
        return "📝"
    }
  }

  const toggleRecordSelection = (recordId: string) => {
    setSelectedRecords((prev) => (prev.includes(recordId) ? prev.filter((id) => id !== recordId) : [...prev, recordId]))
  }

  const selectAllRecords = () => {
    setSelectedRecords(selectedRecords.length === dataRecords.length ? [] : dataRecords.map((r) => r.id))
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      {/* 头部控制区 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">数据池管理</h3>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button className="flex items-center gap-1 px-3 py-2 text-xs bg-green-500 text-white rounded hover:bg-green-600">
            <Upload className="w-3 h-3" />
            导入数据
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
            <Download className="w-3 h-3" />
            导出选中
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-xs bg-purple-500 text-white rounded hover:bg-purple-600">
            <RefreshCw className="w-3 h-3" />
            批量重跑
          </button>
        </div>
      </div>

      {/* 筛选控制区 */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="搜索内容、作者、标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          />
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{dataRecords.length}</div>
          <div className="text-xs text-blue-600">总记录数</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg font-bold text-green-900 dark:text-green-100">
            {dataRecords.filter((r) => r.processStatus === "completed").length}
          </div>
          <div className="text-xs text-green-600">已处理</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
            {dataRecords.filter((r) => r.hasAnnotation).length}
          </div>
          <div className="text-xs text-yellow-600">已标注</div>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-lg font-bold text-purple-900 dark:text-purple-100">{selectedRecords.length}</div>
          <div className="text-xs text-purple-600">已选中</div>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={selectedRecords.length === dataRecords.length}
                  onChange={selectAllRecords}
                  className="rounded"
                />
              </th>
              <th className="text-left p-3">类型</th>
              <th className="text-left p-3">平台</th>
              <th className="text-left p-3">内容</th>
              <th className="text-left p-3">作者</th>
              <th className="text-left p-3">发布时间</th>
              <th className="text-left p-3">处理状态</th>
              <th className="text-left p-3">情感分析</th>
              <th className="text-left p-3">标注</th>
              <th className="text-left p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {dataRecords.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(record.id)}
                    onChange={() => toggleRecordSelection(record.id)}
                    className="rounded"
                  />
                </td>
                <td className="p-3">
                  <span className="text-lg">{getContentTypeIcon(record.contentType)}</span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">{record.platform}</span>
                </td>
                <td className="p-3 max-w-xs">
                  <div className="truncate" title={record.content}>
                    {record.content}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {record.tags.map((tag, idx) => (
                      <span key={idx} className="px-1 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">{record.author}</td>
                <td className="p-3">{record.publishTime}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(record.processStatus)}`}>
                    {record.processStatus === "completed"
                      ? "已完成"
                      : record.processStatus === "processing"
                        ? "处理中"
                        : record.processStatus === "pending"
                          ? "待处理"
                          : "失败"}
                  </span>
                </td>
                <td className="p-3">
                  {record.sentiment && (
                    <div className="text-xs">
                      <div
                        className={`px-2 py-1 rounded ${
                          record.sentiment === "positive"
                            ? "bg-green-100 text-green-700"
                            : record.sentiment === "negative"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {record.sentiment === "positive" ? "积极" : record.sentiment === "negative" ? "消极" : "中性"}
                      </div>
                      {record.confidence && (
                        <div className="text-gray-500 mt-1">{(record.confidence * 100).toFixed(1)}%</div>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <span className={`text-xs ${record.hasAnnotation ? "text-green-600" : "text-gray-400"}`}>
                    {record.hasAnnotation ? "✓ 已标注" : "未标注"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">查看</button>
                    <button className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                      标注
                    </button>
                    <button className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600">
                      重跑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          显示 1-{dataRecords.length} 条，共 {dataRecords.length} 条记录
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">上一页</button>
          <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded">1</button>
          <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">下一页</button>
        </div>
      </div>
    </div>
  )
}
