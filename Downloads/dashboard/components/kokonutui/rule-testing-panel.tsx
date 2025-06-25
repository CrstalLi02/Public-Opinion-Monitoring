"use client"

import { useState } from "react"
import { Play, Loader2 } from "lucide-react"

export default function RuleTestingPanel() {
  const [payload, setPayload] = useState(
    JSON.stringify(
      {
        car_brand: "某品牌A",
        sentiment: { negative_rate: 0.31 },
        duration: "45min",
        region_negative_rate: 0.18,
      },
      null,
      2,
    ),
  )
  const [log, setLog] = useState<string | null>(null)
  const [running, setRunning] = useState(false)

  const runTest = () => {
    setRunning(true)
    setLog(null)

    setTimeout(() => {
      // 真正项目里应调用后端 DSL 引擎，这里模拟返回
      const mockResult = Math.random() > 0.4
      setLog(mockResult ? "✅ 规则触发：满足告警条件" : "ℹ️ 规则未触发")
      setRunning(false)
    }, 1200)
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">规则快速测试</h3>

      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        className="w-full h-40 resize-none rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
        spellCheck={false}
      />

      <button
        onClick={runTest}
        disabled={running}
        className="mt-4 flex items-center gap-2 px-4 py-2 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
      >
        {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
        {running ? "测试中…" : "运行测试"}
      </button>

      {log && <p className="mt-3 text-sm text-gray-800 dark:text-gray-200">{log}</p>}
    </div>
  )
}
