"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function SearchFilters() {
  const [relevance, setRelevance] = useState(80)

  const sentimentOptions = [
    { id: "all-sentiment", label: "全部" },
    { id: "positive", label: "正面" },
    { id: "neutral", label: "中性" },
    { id: "negative", label: "负面" },
  ]

  const dataSourceOptions = [
    { id: "weibo", label: "微博" },
    { id: "xiaohongshu", label: "小红书" },
    { id: "douyin", label: "抖音" },
    { id: "kuaishou", label: "快手" },
  ]

  const timeRangeOptions = [
    { id: "today", label: "今日" },
    { id: "this-week", label: "本周" },
    { id: "this-month", label: "本月" },
    { id: "custom", label: "自定义" },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-700">筛选条件</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div>
          <Label className="text-base font-medium text-gray-700 mb-2 block">情感倾向</Label>
          <div className="space-y-2">
            {sentimentOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox id={option.id} defaultChecked={option.id === "all-sentiment"} />
                <Label htmlFor={option.id} className="text-sm font-normal text-gray-600">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-medium text-gray-700 mb-2 block">数据来源</Label>
          <div className="space-y-2">
            {dataSourceOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  defaultChecked={["weibo", "xiaohongshu", "douyin", "kuaishou"].includes(option.id)}
                />
                <Label htmlFor={option.id} className="text-sm font-normal text-gray-600">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-medium text-gray-700 mb-2 block">时间范围</Label>
          <RadioGroup defaultValue="this-week" className="space-y-2">
            {timeRangeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="text-sm font-normal text-gray-600">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <Label htmlFor="relevance-slider" className="text-base font-medium text-gray-700 mb-2 block">
            相关度 ({relevance}%)
          </Label>
          <Slider
            id="relevance-slider"
            defaultValue={[relevance]}
            max={100}
            min={0}
            step={1}
            onValueChange={(value) => setRelevance(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
