"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Search, MapPin, Clock } from "lucide-react"

export function PlateSearch() {
  const [plateNumber, setPlateNumber] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const mockResults = [
    {
      id: 1,
      plate: "京A12345",
      location: "北京市朝阳区",
      timestamp: "2024-01-15 14:30:25",
      confidence: 98,
      source: "交通摄像头",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 2,
      plate: "京A12345",
      location: "北京市海淀区",
      timestamp: "2024-01-15 13:15:42",
      confidence: 95,
      source: "停车场监控",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 3,
      plate: "京A12345",
      location: "北京市西城区",
      timestamp: "2024-01-15 11:45:18",
      confidence: 92,
      source: "路口监控",
      image: "/placeholder.svg?height=80&width=120",
    },
  ]

  const handleSearch = () => {
    if (!plateNumber.trim()) return

    setIsSearching(true)
    setTimeout(() => {
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1500)
  }

  const recentSearches = ["京A12345", "沪B67890", "粤C11111"]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          车牌检索
        </CardTitle>
        <CardDescription>输入车牌号码搜索相关记录</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="输入车牌号码，如：京A12345"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            <Search className="h-4 w-4 mr-2" />
            {isSearching ? "搜索中..." : "检索"}
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">最近搜索</h4>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((plate) => (
              <Badge
                key={plate}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setPlateNumber(plate)}
              >
                {plate}
              </Badge>
            ))}
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">检索结果 ({searchResults.length})</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {searchResults.map((result) => (
                <div key={result.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <img
                    src={result.image || "/placeholder.svg"}
                    alt="车牌图片"
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{result.plate}</span>
                      <Badge variant="outline" className="text-xs">
                        {result.confidence}% 置信度
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {result.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {result.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">来源: {result.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
