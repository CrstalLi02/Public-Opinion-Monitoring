"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Mic, UploadCloud } from "lucide-react"

export function IntelligentSearchEngine() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("text")

  const hotSearches = ["Model X", "比亚迪汉", "蔚来ES6", "理想L9"]

  const handleSearch = () => {
    console.log(`Searching for "${searchQuery}" with type "${activeTab}"`)
    // Implement search logic here
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-md">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm py-2.5"
            >
              文本检索
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm py-2.5"
            >
              图像检索
            </TabsTrigger>
            <TabsTrigger
              value="voice"
              className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm py-2.5"
            >
              语音检索
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-6">
            <div className="flex items-center gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="输入车型、车牌号、VIN码或关键词..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 h-12 text-base border-gray-300 focus:ring-primary focus:border-primary"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 h-12 text-base"
              >
                搜索
              </Button>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              热门搜索:{" "}
              {hotSearches.map((term, index) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-primary hover:underline focus:outline-none focus:underline mr-2"
                >
                  {term}
                  {index < hotSearches.length - 1 ? "" : ""}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="image" className="mt-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <UploadCloud className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">拖拽图片到此处或点击上传</p>
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
                选择图片
              </Button>
              <Input type="file" accept="image/*" className="hidden" id="imageUpload" />
            </div>
            {/* Add logic for image preview and search initiation */}
          </TabsContent>

          <TabsContent value="voice" className="mt-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Mic className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">点击麦克风开始语音输入</p>
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
                <Mic className="h-4 w-4 mr-2" />
                开始录音
              </Button>
            </div>
            {/* Add logic for voice input and search initiation */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
