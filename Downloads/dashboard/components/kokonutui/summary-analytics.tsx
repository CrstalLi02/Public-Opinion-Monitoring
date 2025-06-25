"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const summaryStats = [
  { name: "负面摘要", value: 45, color: "#EF4444" },
  { name: "正面摘要", value: 35, color: "#10B981" },
  { name: "中性摘要", value: 20, color: "#F59E0B" },
]

export default function SummaryAnalytics() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">摘要分析统计</h3>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summaryStats}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {summaryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value}%`, "占比"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {summaryStats.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-xs text-gray-500">今日处理</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">92.5%</div>
              <div className="text-xs text-gray-500">准确率</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
