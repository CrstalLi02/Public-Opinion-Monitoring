"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"

export function OtaRecallInsights() {
  const otaUpdates = [
    {
      id: 1,
      version: "v2.1.3",
      description: "刹车系统优化",
      progress: 85,
      affected: 125000,
      completed: 106250,
      status: "active",
    },
    {
      id: 2,
      version: "v2.1.2",
      description: "信息娱乐系统修复",
      progress: 100,
      affected: 89000,
      completed: 89000,
      status: "completed",
    },
  ]

  const recalls = [
    {
      id: 1,
      title: "刹车助力器召回",
      vehicles: 45000,
      completed: 32000,
      progress: 71,
      severity: "high",
    },
    {
      id: 2,
      title: "安全带扣召回",
      vehicles: 12000,
      completed: 11500,
      progress: 96,
      severity: "medium",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          OTA & 召回洞察
        </CardTitle>
        <CardDescription>监控OTA更新和召回活动的执行情况</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ota" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ota">OTA更新</TabsTrigger>
            <TabsTrigger value="recall">召回管理</TabsTrigger>
          </TabsList>

          <TabsContent value="ota" className="space-y-4">
            {otaUpdates.map((update) => (
              <div key={update.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{update.version}</h3>
                    <p className="text-sm text-gray-500">{update.description}</p>
                  </div>
                  <Badge variant={update.status === "active" ? "default" : "secondary"}>
                    {update.status === "active" ? "进行中" : "已完成"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>更新进度</span>
                    <span>
                      {update.completed.toLocaleString()} / {update.affected.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={update.progress} />
                  <div className="text-right text-sm text-gray-500">{update.progress}%</div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="recall" className="space-y-4">
            {recalls.map((recall) => (
              <div key={recall.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{recall.title}</h3>
                    <p className="text-sm text-gray-500">影响车辆: {recall.vehicles.toLocaleString()}</p>
                  </div>
                  <Badge variant={recall.severity === "high" ? "destructive" : "default"}>
                    {recall.severity === "high" ? "高严重性" : "中等严重性"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>召回进度</span>
                    <span>
                      {recall.completed.toLocaleString()} / {recall.vehicles.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={recall.progress} />
                  <div className="text-right text-sm text-gray-500">{recall.progress}%</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
