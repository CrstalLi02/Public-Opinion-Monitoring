"use client"

import { useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DemographicsChart() {
  const [selectedMetric, setSelectedMetric] = useState("age")

  const demographics = {
    age: {
      labels: ["18-25岁", "26-35岁", "36-45岁", "46-55岁", "55岁以上"],
      data: [15, 35, 28, 15, 7],
      colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    },
    gender: {
      labels: ["男性", "女性", "未知"],
      data: [68, 28, 4],
      colors: ["#3B82F6", "#EC4899", "#6B7280"],
    },
    region: {
      labels: ["一线城市", "二线城市", "三线城市", "其他"],
      data: [42, 35, 18, 5],
      colors: ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    },
    income: {
      labels: ["5万以下", "5-10万", "10-20万", "20-50万", "50万以上"],
      data: [12, 25, 35, 22, 6],
      colors: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"],
    },
  }

  const currentData = demographics[selectedMetric as keyof typeof demographics]

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        data: currentData.data,
        backgroundColor: currentData.colors,
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">用户人口统计</h3>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
        >
          <option value="age">年龄分布</option>
          <option value="gender">性别分布</option>
          <option value="region">地域分布</option>
          <option value="income">收入分布</option>
        </select>
      </div>

      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {currentData.labels.map((label, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentData.colors[index] }} />
              <span className="text-gray-700 dark:text-gray-300">{label}</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">{currentData.data[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
