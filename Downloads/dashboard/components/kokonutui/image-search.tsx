"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ImageIcon, Upload, Search, X } from "lucide-react"

export function ImageSearch() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)

  const similarImages = [
    {
      id: 1,
      url: "/placeholder.svg?height=120&width=120",
      similarity: 95,
      source: "微博",
      timestamp: "2024-01-15 14:30",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=120&width=120",
      similarity: 88,
      source: "抖音",
      timestamp: "2024-01-15 13:45",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=120&width=120",
      similarity: 82,
      source: "小红书",
      timestamp: "2024-01-15 12:20",
    },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSearch = () => {
    setIsSearching(true)
    setSearchProgress(0)

    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSearching(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          图搜图
        </CardTitle>
        <CardDescription>上传图片搜索相似内容</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">拖拽图片到此处或点击上传</p>
            <label htmlFor="image-upload">
              <Button variant="outline" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                选择图片
              </Button>
            </label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="上传的图片"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => setUploadedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isSearching && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>搜索进度</span>
                  <span>{searchProgress}%</span>
                </div>
                <Progress value={searchProgress} />
              </div>
            )}

            <Button onClick={handleSearch} disabled={isSearching} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? "搜索中..." : "开始搜索"}
            </Button>

            {searchProgress === 100 && (
              <div className="space-y-3">
                <h4 className="font-medium">相似图片结果</h4>
                <div className="grid grid-cols-2 gap-3">
                  {similarImages.map((image) => (
                    <div key={image.id} className="space-y-2">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt="相似图片"
                        className="w-full h-24 object-cover rounded"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {image.similarity}% 相似
                          </Badge>
                          <span className="text-xs text-gray-500">{image.source}</span>
                        </div>
                        <p className="text-xs text-gray-500">{image.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
