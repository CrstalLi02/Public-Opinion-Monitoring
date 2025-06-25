"use client"

import { useState } from "react"
import { Scatter } from "react-chartjs-2"
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from "chart.js"

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default function TopicClusters() {
  const [clusters] = useState([
    { id: 1, name: "发动机问题", x: 20, y: 30, size: 150, color: "rgb(239, 68, 68)" },
    { id: 2, name: "仪表盘故障", x: 60, y: 70, size: 120, color: "rgb(245, 158, 11)" },
    { id: 3, name: "驾驶体验", x: 80, y: 20, size: 200, color: "rgb(34, 197, 94)" },
    { id: 4, name: "售后服务", x: 40, y: 80, size: 90, color: "rgb(59, 130, 246)" },
    { id: 5, name: "内饰质量", x: 70, y: 50, size: 110, color: "rgb(168, 85, 247)" },
  ])

  const data = {
    datasets: clusters.map((cluster) => ({
      label: cluster.name,
      data: [{ x: cluster.x, y: cluster.y }],
      backgroundColor: cluster.color,
      pointRadius: cluster.size / 10,
    })),
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const cluster = clusters[context.datasetIndex]
            return `${cluster.name}: ${cluster.size} 条讨论`
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
        title: {
          display: true,
          text: "情感倾向 →",
        },
      },
      y: {
        title: {
          display: true,
          text: "讨论热度 →",
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">主题聚类分布</h3>

      <div className="h-96">
        <Scatter data={data} options={options} />
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-5 gap-2">
        {clusters.map((cluster) => (
          <div key={cluster.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded text-center">
            <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: cluster.color }} />
            <div className="text-xs font-medium text-gray-900 dark:text-white">{cluster.name}</div>
            <div className="text-xs text-gray-500">{cluster.size} 条</div>
          </div>
        ))}
      </div>
    </div>
  )
}
