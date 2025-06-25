"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, AlertTriangle, Users, Car, MessageSquare } from "lucide-react"

interface RegionDetail {
  region: string
  totalMentions: number
  negativeMentions: number
  negativeRate: number
  trend: "up" | "down" | "stable"
  trendValue: number
  topProblems: Array<{
    problem: string
    count: number
    percentage: number
  }>
  carBrands: Array<{
    brand: string
    mentions: number
    negativeRate: number
  }>
  demographics: {
    ageGroups: Array<{ age: string; percentage: number }>
    userTypes: Array<{ type: string; percentage: number }>
  }
}

export default function RegionalAnalysis() {
  const [selectedRegion, setSelectedRegion] = useState<string>("北京")

  const [regionDetails, setRegionDetails] = useState<Record<string, RegionDetail>>({
    北京: {
      region: "北京",
      totalMentions: 4521,
      negativeMentions: 1247,
      negativeRate: 27.6,
      trend: "up",
      trendValue: 5.2,
      topProblems: [
        { problem: "发动机异响", count: 423, percentage: 33.9 },
        { problem: "仪表盘故障", count: 312, percentage: 25.0 },
        { problem: "刹车问题", count: 198, percentage: 15.9 },
        { problem: "空调异响", count: 156, percentage: 12.5 },
        { problem: "内饰异味", count: 158, percentage: 12.7 },
      ],
      carBrands: [
        { brand: "某品牌A", mentions: 1234, negativeRate: 32.1 },
        { brand: "某品牌B", mentions: 987, negativeRate: 24.8 },
        { brand: "某品牌C", mentions: 876, negativeRate: 28.3 },
        { brand: "某品牌D", mentions: 654, negativeRate: 19.7 },
      ],
      demographics: {
        ageGroups: [
          { age: "25-35岁", percentage: 45.2 },
          { age: "35-45岁", percentage: 32.1 },
          { age: "25岁以下", percentage: 12.8 },
          { age: "45岁以上", percentage: 9.9 },
        ],
        userTypes: [
          { type: "普通车主", percentage: 68.5 },
          { type: "意见领袖", percentage: 18.2 },
          { type: "维修技师", percentage: 8.7 },
          { type: "汽车媒体", percentage: 4.6 },
        ],
      },
    },
  })

  const currentRegion = regionDetails[selectedRegion]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">区域深度分析</h3>
        <select
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="北京">北京市</option>
          <option value="上海">上海市</option>
          <option value="深圳">深圳市</option>
          <option value="杭州">杭州市</option>
        </select>
      </div>

      {currentRegion && (
        <div className="space-y-6">
          {/* 区域概览 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{currentRegion.totalMentions}</div>
              <div className="text-xs text-blue-600">总提及数</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <div className="text-lg font-bold text-red-900 dark:text-red-100">{currentRegion.negativeMentions}</div>
              <div className="text-xs text-red-600">负面提及</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center justify-center mb-2">{getTrendIcon(currentRegion.trend)}</div>
              <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
                {currentRegion.negativeRate}%
              </div>
              <div className="text-xs text-yellow-600">负面占比</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Car className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-lg font-bold text-green-900 dark:text-green-100">
                {currentRegion.carBrands.length}
              </div>
              <div className="text-xs text-green-600">涉及品牌</div>
            </div>
          </div>

          {/* 主要问题分布 */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">主要问题分布</h4>
            <div className="space-y-2">
              {currentRegion.topProblems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{problem.problem}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{problem.count}</div>
                      <div className="text-xs text-gray-500">{problem.percentage}%</div>
                    </div>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${problem.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 品牌表现 */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">品牌负面表现</h4>
            <div className="space-y-2">
              {currentRegion.carBrands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{brand.brand}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-gray-500">提及: {brand.mentions}</div>
                    <div
                      className={`text-sm font-bold ${
                        brand.negativeRate > 25
                          ? "text-red-600"
                          : brand.negativeRate > 20
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {brand.negativeRate}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 用户画像 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">年龄分布</h4>
              <div className="space-y-2">
                {currentRegion.demographics.ageGroups.map((group, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{group.age}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${group.percentage}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{group.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">用户类型</h4>
              <div className="space-y-2">
                {currentRegion.demographics.userTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-purple-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{type.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${type.percentage}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{type.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
