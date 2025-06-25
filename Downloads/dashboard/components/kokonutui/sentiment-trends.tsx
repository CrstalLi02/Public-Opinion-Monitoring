"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const dailyTrendData = [
  { date: "12-18", positive: 1200, negative: 800, neutral: 900 },
  { date: "12-19", positive: 1350, negative: 750, neutral: 950 },
  { date: "12-20", positive: 1100, negative: 1200, neutral: 800 },
  { date: "12-21", positive: 1400, negative: 900, neutral: 1000 },
  { date: "12-22", positive: 1250, negative: 1100, neutral: 850 },
  { date: "12-23", positive: 1600, negative: 700, neutral: 1200 },
  { date: "12-24", positive: 1800, negative: 650, neutral: 1100 },
]

const weeklyTrendData = [
  { week: "第47周", positive: 8500, negative: 5200, neutral: 6800 },
  { week: "第48周", positive: 9200, negative: 4800, neutral: 7200 },
  { week: "第49周", positive: 7800, negative: 6500, neutral: 6200 },
  { week: "第50周", positive: 10200, negative: 4200, neutral: 7800 },
  { week: "第51周", positive: 11500, negative: 3800, neutral: 8200 },
]

export default function SentimentTrends() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly">("daily")

  const currentData = timeRange === "daily" ? dailyTrendData : weeklyTrendData
  const xAxisKey = timeRange === "daily" ? "date" : "week"

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">情感趋势分析</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange("daily")}
              className={`px-3 py-1 text-sm rounded ${
                timeRange === "daily"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              日趋势
            </button>
            <button
              onClick={() => setTimeRange("weekly")}
              className={`px-3 py-1 text-sm rounded ${
                timeRange === "weekly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              周趋势
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="positive"
                stroke="#10B981"
                strokeWidth={2}
                name="积极情感"
                dot={{ fill: "#10B981" }}
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke="#EF4444"
                strokeWidth={2}
                name="负面情感"
                dot={{ fill: "#EF4444" }}
              />
              <Line
                type="monotone"
                dataKey="neutral"
                stroke="#F59E0B"
                strokeWidth={2}
                name="中性情感"
                dot={{ fill: "#F59E0B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-lg font-bold text-green-600">+12.5%</div>
            <div className="text-sm text-green-700 dark:text-green-300">积极情感增长</div>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-lg font-bold text-red-600">-8.3%</div>
            <div className="text-sm text-red-700 dark:text-red-300">负面情感下降</div>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-lg font-bold text-yellow-600">+2.1%</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">中性情感变化</div>
          </div>
        </div>
      </div>
    </div>
  )
}
