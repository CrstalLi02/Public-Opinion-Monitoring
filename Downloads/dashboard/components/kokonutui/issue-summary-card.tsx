"use client"

import { Separator } from "@/components/ui/separator"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, MessageSquare, User, Calendar, AlertTriangle, Edit, RefreshCw, FileText } from "lucide-react"

interface IssueSummaryProps {
  issue?: {
    id: string
    sourceIcon?: React.ReactNode
    sourceName: string
    title: string
    tags: string[]
    ownerName: string
    timestamp: string
    status: string // e.g., "已完成", "处理中"
    sentiment?: {
      label: string // e.g., "消极", "中性", "正面"
      score: number // e.g., 94.0
    }
    isAnnotated: boolean
  }
}

const defaultIssue = {
  id: "ISSUE-001",
  sourceIcon: <MessageSquare className="h-5 w-5 text-blue-500" />,
  sourceName: "微博",
  title: "我的新车开了3个月就出现发动机异响，质量问题严重，厂家不给解决。",
  tags: ["#发动机", "#异响", "#质量问题"],
  ownerName: "小王",
  timestamp: "2024-01-20 14:30",
  status: "已完成",
  sentiment: { label: "消极", score: 94.0 },
  isAnnotated: true,
}

export function IssueSummaryCard({ issue = defaultIssue }: IssueSummaryProps) {
  const getStatusBadgeColor = (status: string) => {
    if (status.includes("完成")) return "bg-green-100 text-green-700"
    if (status.includes("处理中")) return "bg-yellow-100 text-yellow-700"
    return "bg-gray-100 text-gray-700"
  }

  const getSentimentBadgeColor = (label?: string) => {
    if (label === "消极") return "bg-red-100 text-red-700"
    if (label === "正面") return "bg-green-100 text-green-700"
    return "bg-blue-100 text-blue-700" // Neutral or default
  }

  return (
    <Card className="shadow-lg mb-6">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-gray-700 flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-destructive" />
          舆情事件摘要 (Issue Summary)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 pt-1">{issue.sourceIcon || <FileText className="h-6 w-6 text-gray-400" />}</div>
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium text-gray-600 mr-2">{issue.sourceName}</span>
              <span className="text-xs text-gray-400 flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {issue.timestamp}
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">{issue.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {issue.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-blue-50 border-blue-200 text-blue-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1.5 text-gray-400" />
                车主: {issue.ownerName}
              </div>
              <div className="flex items-center">
                <Badge className={`px-2 py-0.5 text-xs ${getStatusBadgeColor(issue.status)}`}>{issue.status}</Badge>
              </div>
              {issue.sentiment && (
                <div className="flex items-center">
                  <Badge className={`px-2 py-0.5 text-xs ${getSentimentBadgeColor(issue.sentiment.label)}`}>
                    {issue.sentiment.label} {issue.sentiment.score.toFixed(1)}%
                  </Badge>
                </div>
              )}
              {issue.isAnnotated && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1.5" /> 已标注
                </div>
              )}
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end space-x-3">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1.5" /> 编辑标注
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1.5" /> 重新分析
          </Button>
          <Button variant="default" size="sm">
            创建工单
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
