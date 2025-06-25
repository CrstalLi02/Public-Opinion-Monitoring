import { Activity, Car, MessageSquare, TrendingUp, AlertTriangle, Database } from "lucide-react"
import SentimentAnalysis from "./sentiment-analysis"
import VehicleDetection from "./vehicle-detection"
import DataCollection from "./data-collection"
import RealTimeMonitor from "./real-time-monitor"
import ProblemClassification from "./problem-classification"
import SystemStatus from "./system-status"
import GlobalMonitorScreen from "./global-monitor-screen"
import SentimentHeatMap from "./sentiment-heat-map"
import TimelineFeed from "./timeline-feed"
import AlertCenter from "./alert-center"

export default function Content() {
  return (
    <div className="space-y-6">
      {/* NOC风格全局监控大屏 */}
      <GlobalMonitorScreen />

      {/* 关键指标概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">今日采集数据</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12,847</p>
              <p className="text-xs text-green-600 dark:text-green-400">+15.3% 较昨日</p>
            </div>
            <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">车辆识别成功</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8,234</p>
              <p className="text-xs text-green-600 dark:text-green-400">识别率 64.1%</p>
            </div>
            <Car className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">负面情感占比</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">23.5%</p>
              <p className="text-xs text-red-600 dark:text-red-400">+2.1% 较昨日</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">实时处理速度</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156/min</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">系统正常</p>
            </div>
            <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* 主要功能区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            情感分析实时监控
          </h2>
          <SentimentAnalysis />
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-green-600 dark:text-green-400" />
            车辆信息提取
          </h2>
          <VehicleDetection />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            数据采集状态
          </h2>
          <DataCollection />
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            问题分类统计
          </h2>
          <ProblemClassification />
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-600 dark:text-red-400" />
            系统状态监控
          </h2>
          <SystemStatus />
        </div>
      </div>

      {/* 舆情热力图和时间轴流 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentHeatMap />
        <TimelineFeed />
      </div>

      {/* 实时数据流 */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
          实时数据处理流
        </h2>
        <RealTimeMonitor />
      </div>

      {/* 智能报警中心 */}
      <AlertCenter />
    </div>
  )
}
