"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Define a type for search result items
type SearchResultItem = {
  id: number
  sentiment: "正面" | "中性" | "负面"
  source: string
  model: string
  title: string
  content: string
  author: string
  timestamp: string
  relevance: number
  thumbnailUrl: string
}

// Sample search results data
const sampleResults: SearchResultItem[] = [
  {
    id: 1,
    sentiment: "负面",
    source: "微博",
    model: "Model X",
    title: "新款Model X的自动驾驶系统在高速公路上出现异常",
    content: "方向盘突然失控，差点造成事故，厂家至今没有给出合理解释。",
    author: "车评达人",
    timestamp: "2023-06-23 14:32",
    relevance: 98.5,
    thumbnailUrl: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    sentiment: "中性",
    source: "小红书",
    model: "Model X",
    title: "Model X自动驾驶功能测试",
    content: "高速公路上表现稳定，但城市道路还需改进，总体来说比上一代有明显提升。",
    author: "汽车科技控",
    timestamp: "2023-06-22 09:15",
    relevance: 92.3,
    thumbnailUrl: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    sentiment: "正面",
    source: "知乎",
    model: "比亚迪汉",
    title: "比亚迪汉EV长途体验：续航扎实，智能驾驶辅助给力",
    content: "从上海开到杭州，全程使用辅助驾驶，非常轻松，能耗表现也超出预期。",
    author: "新能源观察家",
    timestamp: "2023-06-21 18:50",
    relevance: 89.7,
    thumbnailUrl: "/placeholder.svg?height=120&width=120",
  },
]

export function SearchResults({ searchQuery = "Model X 自动驾驶", results = sampleResults, searchTime = 0.32 }) {
  const getSentimentBadgeVariant = (sentiment: SearchResultItem["sentiment"]) => {
    switch (sentiment) {
      case "正面":
        return "bg-green-100 text-green-700 border-green-300"
      case "负面":
        return "bg-red-100 text-red-700 border-red-300"
      case "中性":
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-700">搜索结果: "{searchQuery}"</CardTitle>
        <p className="text-sm text-gray-500">
          找到 {results.length} 条相关结果，用时 {searchTime} 秒
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="w-32 h-full md:w-40 flex-shrink-0">
                  <img
                    src={result.thumbnailUrl || "/placeholder.svg"}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={`${getSentimentBadgeVariant(result.sentiment)} px-2.5 py-1 text-xs`}
                      >
                        {result.sentiment}
                      </Badge>
                      <Badge variant="outline" className="px-2.5 py-1 text-xs border-gray-300 text-gray-600">
                        {result.source}
                      </Badge>
                      <Badge variant="outline" className="px-2.5 py-1 text-xs border-gray-300 text-gray-600">
                        {result.model}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight hover:text-primary transition-colors">
                      <a href="#" className="focus:outline-none">
                        {result.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{result.content}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      {result.author} · {result.timestamp}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">相关度: {result.relevance}%</span>
                      <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/5">
                        <Eye className="h-4 w-4 mr-1.5" />
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {results.length === 0 && (
            <p className="text-center text-gray-500 py-8">暂无搜索结果，请尝试其他关键词或调整筛选条件。</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
