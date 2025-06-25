"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Users,
  FileText,
  Video,
  Activity,
  Database,
  Cpu,
  Zap,
  Car,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"

// Mock data (replace with actual data fetching)
const kpiData = [
  {
    title: "今日舆情总量",
    value: "1,284",
    trend: "+12.5%",
    trendDirection: "up" as "up" | "down",
    icon: TrendingUp,
    iconColor: "text-red-500",
  },
  {
    title: "负面情感占比",
    value: "24.3%",
    trend: "-3.2%",
    trendDirection: "down" as "up" | "down",
    icon: TrendingUp, // Icon can be same, color/direction indicates meaning
    iconColor: "text-green-500",
  },
  {
    title: "热点车型",
    value: "Model X",
    subValue: "提及量: 428",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
  },
  {
    title: "系统状态",
    value: "正常",
    subValue: "最近更新: 10分钟前",
    icon: CheckCircle2,
    iconColor: "text-green-500",
  },
]

const sentimentTrendData = {
  daily: [
    { date: "6/17", positive: 28, neutral: 22, negative: 15 },
    { date: "6/18", positive: 30, neutral: 25, negative: 18 },
    { date: "6/19", positive: 35, neutral: 20, negative: 22 },
    { date: "6/20", positive: 32, neutral: 28, negative: 20 },
    { date: "6/21", positive: 28, neutral: 25, negative: 25 },
    { date: "6/22", positive: 30, neutral: 22, negative: 23 },
    { date: "6/23", positive: 40, neutral: 20, negative: 18 },
  ],
  weekly: [
    // Sample data for weekly, structure matches screenshot
    { date: "6/17", positive: 70, neutral: 30, negative: 25 },
    { date: "6/18", positive: 65, neutral: 28, negative: 22 },
    { date: "6/19", positive: 75, neutral: 25, negative: 20 },
    { date: "6/20", positive: 60, neutral: 32, negative: 28 },
    { date: "6/21", positive: 55, neutral: 26, negative: 30 },
    { date: "6/22", positive: 62, neutral: 24, negative: 25 },
    { date: "6/23", positive: 72, neutral: 22, negative: 20 },
  ],
  monthly: [
    { date: "Week 1", positive: 120, neutral: 80, negative: 60 },
    { date: "Week 2", positive: 130, neutral: 85, negative: 65 },
    { date: "Week 3", positive: 110, neutral: 75, negative: 70 },
    { date: "Week 4", positive: 140, neutral: 90, negative: 55 },
  ],
}

const hotIssuesData = [
  { category: "动力系统", count: 68 },
  { category: "内饰质量", count: 62 },
  { category: "驾驶体验", count: 78 },
  { category: "电池续航", count: 80 },
  { category: "智能系统", count: 58 },
]

const latestAlertsData = [
  {
    id: "1",
    sourceIcon: MessageSquare, // Placeholder, ideally specific icons
    sourceName: "微",
    user: "车评达人",
    content: "新款Model X的自动驾驶系统在高速公路上出现异常, 方向盘突然失控...",
    time: "10分钟前",
    sentiment: "负面",
    tags: ["微博", "Model X"],
  },
  {
    id: "2",
    sourceIcon: Users,
    sourceName: "小",
    user: "汽车生活家",
    content: "入手新车一周体验: 内饰做工精细, 但中控屏偶尔会出现卡顿现象...",
    time: "30分钟前",
    sentiment: "中性",
    tags: ["小红书", "比亚迪汉"],
  },
  {
    id: "3",
    sourceIcon: FileText,
    sourceName: "抖",
    user: "科技说车",
    content: "实测新能源车型续航能力, 在-10°C环境下续航直接腰斩, 厂家宣传严重虚标...",
    time: "1小时前",
    sentiment: "负面",
    tags: ["抖音", "蔚来ES6"],
  },
  {
    id: "4",
    sourceIcon: Video,
    sourceName: "快",
    user: "玩车达人",
    content: "新车提车当天就出现异响, 4S店态度敷衍, 打算直接投诉到总部...",
    time: "2小时前",
    sentiment: "负面",
    tags: ["快手", "理想L9"],
  },
]

const dataSourceDistributionData = [
  { name: "微博", value: 45, color: "bg-blue-500" }, // Assuming blue is Weibo
  { name: "小红书", value: 25, color: "bg-pink-500" },
  { name: "抖音", value: 20, color: "bg-green-500" },
  { name: "快手", value: 10, color: "bg-orange-500" },
]

// Helper to get sentiment badge color
const getSentimentBadgeClass = (sentiment: string) => {
  switch (sentiment.toLowerCase()) {
    case "正面":
      return "bg-green-100 text-green-700 border-green-300"
    case "负面":
      return "bg-red-100 text-red-700 border-red-300"
    case "中性":
      return "bg-yellow-100 text-yellow-700 border-yellow-300"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

interface KPIMetric {
  title: string
  value: string
  unit: string
  trend: "up" | "down" | "stable"
  trendValue: string
  status: "normal" | "warning" | "critical"
  icon: any
}

interface SystemAlert {
  id: string
  type: "critical" | "warning" | "info"
  message: string
  timestamp: string
  module: string
}

export default function GlobalMonitorScreenRedesign() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>([
    {
      title: "数据采集速率",
      value: "1,247",
      unit: "/min",
      trend: "up",
      trendValue: "+12.3%",
      status: "normal",
      icon: Database,
    },
    {
      title: "模型推理QPS",
      value: "856",
      unit: "QPS",
      trend: "stable",
      trendValue: "+2.1%",
      status: "normal",
      icon: Cpu,
    },
    {
      title: "负面情感热度",
      value: "23.5",
      unit: "%",
      trend: "up",
      trendValue: "+5.7%",
      status: "warning",
      icon: AlertTriangle,
    },
    {
      title: "车辆识别成功率",
      value: "94.2",
      unit: "%",
      trend: "down",
      trendValue: "-1.2%",
      status: "normal",
      icon: Car,
    },
    {
      title: "YOLO检测延迟",
      value: "45",
      unit: "ms",
      trend: "stable",
      trendValue: "+0.8%",
      status: "normal",
      icon: Zap,
    },
    {
      title: "OCR识别准确率",
      value: "97.8",
      unit: "%",
      trend: "up",
      trendValue: "+2.3%",
      status: "normal",
      icon: Activity,
    },
  ])

  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: "1",
      type: "critical",
      message: "抖音API调用频率超限，采集速率下降60%",
      timestamp: "2分钟前",
      module: "数据采集",
    },
    {
      id: "2",
      type: "warning",
      message: "负面情感检测阈值触发，建议关注某品牌A车型",
      timestamp: "5分钟前",
      module: "情感分析",
    },
    {
      id: "3",
      type: "info",
      message: "YOLO模型v2.1部署完成，识别精度提升3.2%",
      timestamp: "10分钟前",
      module: "模型工厂",
    },
  ])

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 模拟异常闪烁效果
  const [blinkingAlerts, setBlinkingAlerts] = useState<Set<string>>(new Set())
  useEffect(() => {
    const interval = setInterval(() => {
      const criticalAlerts = systemAlerts.filter((alert) => alert.type === "critical").map((alert) => alert.id)
      setBlinkingAlerts(new Set(criticalAlerts))

      setTimeout(() => {
        setBlinkingAlerts(new Set())
      }, 500)
    }, 1500)

    return () => clearInterval(interval)
  }, [systemAlerts])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500 border-red-600"
      case "warning":
        return "bg-yellow-500 border-yellow-600"
      case "normal":
        return "bg-green-500 border-green-600"
      default:
        return "bg-gray-500 border-gray-600"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-900/50 border-red-500 text-red-100"
      case "warning":
        return "bg-yellow-900/50 border-yellow-500 text-yellow-100"
      default:
        return "bg-blue-900/50 border-blue-500 text-blue-100"
    }
  }

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">舆情监控总览</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{kpi.value}</div>
              {kpi.subValue ? (
                <p className="text-xs text-gray-500">{kpi.subValue}</p>
              ) : kpi.trend ? (
                <p className={`text-xs ${kpi.trendDirection === "up" ? "text-red-500" : "text-green-500"}`}>
                  {kpi.trendDirection === "up" ? "较昨日 " : "较昨日 "}
                  {kpi.trend}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Row: Sentiment Trends and Hot Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Sentiment Trend Analysis */}
        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">情感趋势分析</CardTitle>
            <CardDescription className="text-sm text-gray-500">过去7天的情感分布趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-[240px] mb-4">
                <TabsTrigger value="daily">今日</TabsTrigger>
                <TabsTrigger value="weekly">本周</TabsTrigger>
                <TabsTrigger value="monthly">本月</TabsTrigger>
              </TabsList>
              <TabsContent value="daily">
                <SentimentLineChart data={sentimentTrendData.daily} />
              </TabsContent>
              <TabsContent value="weekly">
                <SentimentLineChart data={sentimentTrendData.weekly} />
              </TabsContent>
              <TabsContent value="monthly">
                <SentimentLineChart data={sentimentTrendData.monthly} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Hot Issue Classification */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">热点问题分类</CardTitle>
            <CardDescription className="text-sm text-gray-500">用户反馈最多的车辆问题类别</CardDescription>
          </CardHeader>
          <CardContent>
            <HotIssuesBarChart data={hotIssuesData} />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Latest Alerts and Data Source Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Latest Sentiment Alerts */}
        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">最新舆情预警</CardTitle>
            <CardDescription className="text-sm text-gray-500">系统检测到的重要关注的舆情信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestAlertsData.map((alert, index) => (
              <div key={alert.id}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                    <alert.sourceIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-700">{alert.user}</p>
                      <p className="text-xs text-gray-400">{alert.time}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5 mb-1.5">{alert.content}</p>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className={getSentimentBadgeClass(alert.sentiment)}>
                        {alert.sentiment}
                      </Badge>
                      {alert.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {index < latestAlertsData.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Source Distribution */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">数据来源分布</CardTitle>
            <CardDescription className="text-sm text-gray-500">各平台数据占比</CardDescription>
          </CardHeader>
          <CardContent>
            <DataSourceDonutChart data={dataSourceDistributionData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Placeholder components for charts
// You would replace these with actual chart implementations (e.g., using Recharts, Chart.js, or Nivo)

interface SentimentDataPoint {
  date: string
  positive: number
  neutral: number
  negative: number
}
const SentimentLineChart = ({ data }: { data: SentimentDataPoint[] }) => {
  const maxValue = Math.max(...data.flatMap((d) => [d.positive, d.neutral, d.negative]), 0) * 1.1 || 100

  return (
    <div className="w-full h-64 bg-gray-50 p-4 rounded-md border border-gray-200 relative">
      <svg width="100%" height="100%" viewBox={`0 0 500 ${maxValue / 0.4}`}>
        {" "}
        {/* Adjusted viewBox for better scaling */}
        {/* Y-axis labels and lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const yPos = ((maxValue - val) / maxValue) * (maxValue / 0.45) // Scale y position
          if (val > maxValue / 1.1) return null // Don't draw labels outside chart max
          return (
            <g key={`y-label-${val}`}>
              <text x="0" y={yPos + 5} fontSize="10" fill="gray">
                {val}
              </text>
              <line x1="25" y1={yPos} x2="500" y2={yPos} stroke="#e5e7eb" strokeDasharray="2,2" />
            </g>
          )
        })}
        {/* Data lines and points */}
        {["positive", "neutral", "negative"].map((type, typeIndex) => {
          const color = type === "positive" ? "#22c55e" : type === "neutral" ? "#6b7280" : "#ef4444"
          const points = data
            .map((d, i) => {
              const x = 25 + i * (475 / (data.length - 1 || 1))
              const y = ((maxValue - d[type as keyof SentimentDataPoint]) / maxValue) * (maxValue / 0.45)
              return `${x},${y}`
            })
            .join(" ")

          return (
            <g key={type}>
              <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
              {data.map((d, i) => {
                const x = 25 + i * (475 / (data.length - 1 || 1))
                const y = ((maxValue - d[type as keyof SentimentDataPoint]) / maxValue) * (maxValue / 0.45)
                return <circle key={`${type}-point-${i}`} cx={x} cy={y} r="3" fill={color} />
              })}
            </g>
          )
        })}
        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = 25 + i * (475 / (data.length - 1 || 1))
          return (
            <text key={`x-label-${i}`} x={x} y={maxValue / 0.45 + 15} fontSize="10" fill="gray" textAnchor="middle">
              {d.date}
            </text>
          )
        })}
      </svg>
      <div className="flex justify-center space-x-4 mt-3 text-xs">
        <span className="flex items-center">
          <div className="w-3 h-3 bg-green-500 mr-1 rounded-sm"></div>正面
        </span>
        <span className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 mr-1 rounded-sm"></div>中性
        </span>
        <span className="flex items-center">
          <div className="w-3 h-3 bg-red-500 mr-1 rounded-sm"></div>负面
        </span>
      </div>
    </div>
  )
}

interface HotIssueDataPoint {
  category: string
  count: number
}
const HotIssuesBarChart = ({ data }: { data: HotIssueDataPoint[] }) => {
  const maxValue = Math.max(...data.map((d) => d.count), 0) * 1.1 || 100
  const barWidth = 50
  const barSpacing = 20
  const chartWidth = data.length * (barWidth + barSpacing) + barSpacing // Adjusted width calculation

  return (
    <div className="w-full h-64 bg-gray-50 p-4 rounded-md border border-gray-200 overflow-x-auto">
      <svg width={chartWidth} height="100%" viewBox={`0 0 ${chartWidth} 120`}>
        {" "}
        {/* Adjusted viewBox */}
        {/* Y-axis labels and lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const yPos = 100 - val // Y position based on 0-100 scale
          if (val > maxValue / 1.1) return null
          return (
            <g key={`y-bar-label-${val}`}>
              <text x="0" y={yPos + 3} fontSize="8" fill="gray">
                {val}
              </text>
              <line x1="20" y1={yPos} x2={chartWidth} y2={yPos} stroke="#e5e7eb" strokeDasharray="2,2" />
            </g>
          )
        })}
        {data.map((item, index) => {
          const barHeight = (item.count / maxValue) * 100
          const x = barSpacing + index * (barWidth + barSpacing)
          const y = 100 - barHeight
          return (
            <g key={item.category}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#3b82f6" // Blue color for bars
                rx="2"
              />
              <text x={x + barWidth / 2} y={110} fontSize="8" textAnchor="middle" fill="gray">
                {item.category}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="flex justify-center space-x-4 mt-3 text-xs">
        <span className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 mr-1 rounded-sm"></div>数量
        </span>
      </div>
    </div>
  )
}

interface DataSourcePoint {
  name: string
  value: number
  color: string
}
const DataSourceDonutChart = ({ data }: { data: DataSourcePoint[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let accumulatedPercentage = 0
  const radius = 40
  const circumference = 2 * Math.PI * radius

  return (
    <div className="w-full h-64 bg-gray-50 p-4 rounded-md border border-gray-200 flex flex-col items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 100 100" className="mb-4">
        {data.map((item) => {
          const percentage = (item.value / total) * 100
          const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
          const strokeDashoffset = -(accumulatedPercentage / 100) * circumference
          accumulatedPercentage += percentage

          // Determine Tailwind color class from item.color
          // This is a bit of a hack for SVG, direct fill would be better if not using Tailwind classes
          let fillClass = item.color.replace("bg-", "text-") // trying to map bg to text for SVG fill
          if (item.color === "bg-blue-500") fillClass = "fill-blue-500"
          else if (item.color === "bg-pink-500") fillClass = "fill-pink-500"
          else if (item.color === "bg-green-500") fillClass = "fill-green-500"
          else if (item.color === "bg-orange-500") fillClass = "fill-orange-500"

          return (
            <circle
              key={item.name}
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              strokeWidth="20" // This creates the donut thickness
              className={item.color.replace("bg-", "stroke-")} // Use stroke- for Tailwind
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
            />
          )
        })}
      </svg>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
        {data.map((item) => (
          <div key={item.name} className="flex items-center">
            <span className={`w-3 h-3 rounded-sm mr-2 ${item.color}`}></span>
            <span>
              {item.name} {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
