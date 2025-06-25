"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const problemDistribution = [
  { name: "安全问题", value: 35.2, count: 1247, color: "#EF4444" },
  { name: "续航问题", value: 25.1, count: 892, color: "#F97316" },
  { name: "车机故障", value: 17.9, count: 634, color: "#3B82F6" },
  { name: "质量问题", value: 12.8, count: 456, color: "#8B5CF6" },
  { name: "服务问题", value: 9.7, count: 345, color: "#10B981" },
  { name: "外观问题", value: 6.6, count: 234, color: "#6B7280" },
]

export default function ProblemStats() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">问题分布统计</h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={problemDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {problemDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value}%`, "占比"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          {problemDistribution.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{item.count}</div>
                <div className="text-xs text-gray-500">{item.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
