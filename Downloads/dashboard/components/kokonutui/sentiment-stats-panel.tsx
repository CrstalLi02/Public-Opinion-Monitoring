"use client"

import { useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const sentimentData = [
  { name: "积极", value: 40.9, count: 18492, color: "#10B981" },
  { name: "负面", value: 28.4, count: 12847, color: "#EF4444" },
  { name: "中性", value: 30.7, count: 13892, color: "#F59E0B" },
]

const platformData = [
  { platform: "微博", positive: 8500, negative: 4200, neutral: 5800 },
  { platform: "小红书", positive: 6200, negative: 3800, neutral: 4200 },
  { platform: "抖音", positive: 3792, negative: 4847, neutral: 3892 },
]

export default function SentimentStatsPanel() {
  const [viewType, setViewType] = useState<"pie" | "bar">("pie")

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">情感分布统计</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setViewType("pie")}
              className={`px-3 py-1 text-sm rounded ${
                viewType === "pie"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              饼图
            </button>
            <button
              onClick={() => setViewType("bar")}
              className={`px-3 py-1 text-sm rounded ${
                viewType === "bar"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              柱状图
            </button>
          </div>
        </div>

        {viewType === "pie" ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, "占比"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" fill="#10B981" name="积极" />
                <Bar dataKey="negative" fill="#EF4444" name="负面" />
                <Bar dataKey="neutral" fill="#F59E0B" name="中性" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-4">
          {sentimentData.map((item) => (
            <div key={item.name} className="text-center">
              <div className="text-2xl font-bold" style={{ color: item.color }}>
                {item.count.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">{item.name}情感</div>
              <div className="text-xs text-gray-400">{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
