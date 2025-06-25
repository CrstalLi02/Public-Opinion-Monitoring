"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const trendData = [
  { date: "12-18", safety: 1100, battery: 800, infotainment: 650, quality: 400 },
  { date: "12-19", safety: 1150, battery: 820, infotainment: 680, quality: 420 },
  { date: "12-20", safety: 1200, battery: 850, infotainment: 620, quality: 450 },
  { date: "12-21", safety: 1180, battery: 870, infotainment: 640, quality: 430 },
  { date: "12-22", safety: 1220, battery: 880, infotainment: 630, quality: 440 },
  { date: "12-23", safety: 1230, battery: 890, infotainment: 635, quality: 450 },
  { date: "12-24", safety: 1247, battery: 892, infotainment: 634, quality: 456 },
]

export default function ProblemTrends() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">问题趋势分析</h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="safety"
                stroke="#EF4444"
                strokeWidth={2}
                name="安全问题"
                dot={{ fill: "#EF4444" }}
              />
              <Line
                type="monotone"
                dataKey="battery"
                stroke="#F97316"
                strokeWidth={2}
                name="续航问题"
                dot={{ fill: "#F97316" }}
              />
              <Line
                type="monotone"
                dataKey="infotainment"
                stroke="#3B82F6"
                strokeWidth={2}
                name="车机故障"
                dot={{ fill: "#3B82F6" }}
              />
              <Line
                type="monotone"
                dataKey="quality"
                stroke="#8B5CF6"
                strokeWidth={2}
                name="质量问题"
                dot={{ fill: "#8B5CF6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-lg font-bold text-red-600">+15.2%</div>
            <div className="text-sm text-red-700 dark:text-red-300">安全问题增长</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-lg font-bold text-orange-600">+8.7%</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">续航问题增长</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-lg font-bold text-blue-600">-3.1%</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">车机故障下降</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-lg font-bold text-purple-600">+12.3%</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">质量问题增长</div>
          </div>
        </div>
      </div>
    </div>
  )
}
