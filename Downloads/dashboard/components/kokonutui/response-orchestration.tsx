"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Users } from "lucide-react"

export function ResponseOrchestration() {
  const [activeTab, setActiveTab] = useState("ongoing")

  const responses = [
    {
      id: 1,
      title: "刹车系统问题回应",
      status: "active",
      priority: "high",
      progress: 75,
      assignee: "公关团队A",
      deadline: "2024-01-16 18:00",
      channels: ["微博", "官网", "媒体"],
    },
    {
      id: 2,
      title: "软件更新说明",
      status: "pending",
      priority: "medium",
      progress: 30,
      assignee: "技术团队",
      deadline: "2024-01-17 12:00",
      channels: ["APP", "邮件"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          公关响应编排
        </CardTitle>
        <CardDescription>统一管理和协调公关响应活动</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ongoing">进行中</TabsTrigger>
            <TabsTrigger value="pending">待处理</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4 mt-4">
            {responses
              .filter((r) => r.status === "active")
              .map((response) => (
                <div key={response.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{response.title}</h3>
                    <Badge variant={response.priority === "high" ? "destructive" : "default"}>
                      {response.priority === "high" ? "高优先级" : "中优先级"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>进度</span>
                      <span>{response.progress}%</span>
                    </div>
                    <Progress value={response.progress} />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>负责人: {response.assignee}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {response.deadline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">发布渠道:</span>
                    {response.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">查看详情</Button>
                    <Button size="sm" variant="outline">
                      编辑
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {responses
              .filter((r) => r.status === "pending")
              .map((response) => (
                <div key={response.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{response.title}</h3>
                    <Badge variant="secondary">待处理</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>负责人: {response.assignee}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {response.deadline}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">开始处理</Button>
                    <Button size="sm" variant="outline">
                      分配
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <p>暂无已完成的响应任务</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
