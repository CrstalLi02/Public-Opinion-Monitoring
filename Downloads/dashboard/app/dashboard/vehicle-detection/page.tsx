import VehicleDetectionScheduler from "@/components/kokonutui/vehicle-detection-scheduler"
import DetectionQueue from "@/components/kokonutui/detection-queue"
import ModelPerformance from "@/components/kokonutui/model-performance"

export default function VehicleDetectionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">车辆识别调度</h1>
        <div className="text-sm text-gray-500">YOLO检测 • OCR识别 • 任务调度</div>
      </div>

      <VehicleDetectionScheduler />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DetectionQueue />
        <ModelPerformance />
      </div>
    </div>
  )
}
