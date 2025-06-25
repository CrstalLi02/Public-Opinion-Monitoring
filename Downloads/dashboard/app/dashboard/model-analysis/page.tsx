"use client"

import { Label } from "@/components/ui/label"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChartIcon } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts"
import { useState, useEffect } from "react"

export default function ModelAnalysisPage() {
  const [selectedModel, setSelectedModel] = useState("model3")
  const [modelData, setModelData] = useState<any>(null)

  useEffect(() => {
    // Simulate fetching data based on selectedModel
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API call
      if (selectedModel === "model3") {
        setModelData({
          negativeTrend: [
            { name: "1月", value: 120 },
            { name: "2月", value: 150 },
            { name: "3月", value: 130 },
            { name: "4月", value: 180 },
            { name: "5月", value: 200 },
            { name: "6月", value: 170 },
          ],
          faultDistribution: [
            { name: "车机故障", value: 40 },
            { name: "续航问题", value: 30 },
            { name: "异响", value: 15 },
            { name: "充电异常", value: 10 },
            { name: "其他", value: 5 },
          ],
          sentimentDistribution: [
            { name: "积极", value: 60 },
            { name: "中性", value: 25 },
            { name: "消极", value: 15 },
          ],
        })
      } else if (selectedModel === "modelY") {
        setModelData({
          negativeTrend: [
            { name: "1月", value: 100 },
            { name: "2月", value: 110 },
            { name: "3月", value: 90 },
            { name: "4月", value: 140 },
            { name: "5月", value: 160 },
            { name: "6月", value: 130 },
          ],
          faultDistribution: [
            { name: "续航问题", value: 35 },
            { name: "车机故障", value: 25 },
            { name: "异响", value: 20 },
            { name: "充电异常", value: 10 },
            { name: "其他", value: 10 },
          ],
          sentimentDistribution: [
            { name: "积极", value: 65 },
            { name: "中性", value: 20 },
            { name: "消极", value: 15 },
          ],
        })
      } else {
        setModelData(null)
      }
    }
    fetchData()
  }, [selectedModel])

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5" />
            {"车型聚合分析"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="model-select">{"选择车型"}</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model-select" className="w-[200px]">
                <SelectValue placeholder="选择车型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="model3">{"Tesla Model 3"}</SelectItem>
                <SelectItem value="modelY">{"Tesla Model Y"}</SelectItem>
                <SelectItem value="modelS">{"Tesla Model S"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {modelData ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{"负面趋势"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={modelData.negativeTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="负面事件数" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"故障类型分布"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={modelData.faultDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" name="事件数" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"情感分布"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={modelData.sentimentDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#ffc658" name="占比" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <p className="text-center text-gray-500">{"请选择车型以查看分析数据。"}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
