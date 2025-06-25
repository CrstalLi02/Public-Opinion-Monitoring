"use client"

import { useState } from "react"
import { ArrowRight, Clock, User, MessageSquare, CheckCircle } from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  status: "completed" | "current" | "pending"
  assignee?: string
  completedAt?: string
  duration?: string
  notes?: string
}

interface AlertWorkflowData {
  alertId: string
  alertTitle: string
  currentStep: number
  steps: WorkflowStep[]
  totalDuration: string
  sla: string
  slaStatus: "normal" | "warning" | "exceeded"
}

export default function AlertWorkflow() {
  const [workflows, setWorkflows] = useState<AlertWorkflowData[]>([
    {
      alertId: "ALT-001",
      alertTitle: "某品牌A负面情感激增",
      currentStep: 2,
      totalDuration: "45分钟",
      sla: "2小时",
      slaStatus: "normal",
      steps: [
        {
          id: "1",
          name: "告警触发",
          status: "completed",
          completedAt: "14:30",
          duration: "0分钟",
        },
        {
          id: "2",
          name: "初步分析",
          status: "current",
          assignee: "张工程师",
          notes: "正在分析负面情感来源和传播路径",
        },
        {
          id: "3",
          name: "风险评估",
          status: "pending",
        },
        {
          id: "4",
          name: "响应方案制定",
          status: "pending",
        },
        {
          id: "5",
          name: "执行处置",
          status: "pending",
        },
        {
          id: "6",
          name: "效果跟踪",
          status: "pending",
        },
      ],
    },
  ])

  const getSlaColor = (status: string) => {
    switch (status) {
      case "exceeded":
        return "text-red-600 bg-red-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-green-600 bg-green-100"
    }
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "current":
        return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">工单处理流程</h3>

      <div className="space-y-6">
        {workflows.map((workflow) => (
          <div key={workflow.alertId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{workflow.alertTitle}</h4>
                <div className="text-sm text-gray-500">工单号: {workflow.alertId}</div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 text-xs rounded ${getSlaColor(workflow.slaStatus)}`}>
                  SLA: {workflow.sla}
                </div>
                <div className="text-xs text-gray-500 mt-1">已用时: {workflow.totalDuration}</div>
              </div>
            </div>

            <div className="space-y-3">
              {workflow.steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    {getStepIcon(step.status)}
                    {index < workflow.steps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 mt-2 ${
                          step.status === "completed" ? "bg-green-300" : "bg-gray-200 dark:bg-gray-600"
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          step.status === "completed"
                            ? "text-green-700 dark:text-green-300"
                            : step.status === "current"
                              ? "text-blue-700 dark:text-blue-300"
                              : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </span>
                      {step.completedAt && <span className="text-xs text-gray-500">{step.completedAt}</span>}
                    </div>

                    {step.assignee && (
                      <div className="flex items-center gap-1 mt-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{step.assignee}</span>
                      </div>
                    )}

                    {step.notes && (
                      <div className="flex items-start gap-1 mt-1">
                        <MessageSquare className="w-3 h-3 text-gray-400 mt-0.5" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{step.notes}</span>
                      </div>
                    )}

                    {step.duration && <div className="text-xs text-gray-500 mt-1">耗时: {step.duration}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  进度: {workflow.currentStep}/{workflow.steps.length}
                </div>
                <button className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                  推进流程
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
