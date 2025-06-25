"use client"

import { useState } from "react"
import { Copy, Save, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RuleDSLEditor({
  initialDsl = "sentiment.negative_rate > 0.25 AND duration > 30min",
}: {
  initialDsl?: string
}) {
  const [dsl, setDsl] = useState(initialDsl)
  const [savedDsl, setSavedDsl] = useState(initialDsl)
  const [isRunning, setIsRunning] = useState(false)

  const handleCopy = () => navigator.clipboard.writeText(dsl)
  const handleSave = () => {
    setSavedDsl(dsl)
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23] h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">规则 DSL 编辑器</h3>

      <textarea
        className={cn(
          "flex-1 resize-none rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3",
          "font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
        )}
        value={dsl}
        onChange={(e) => setDsl(e.target.value)}
        spellCheck={false}
      />

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-2 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300"
        >
          <Copy className="w-3 h-3" />
          复制
        </button>
        <button
          onClick={handleSave}
          disabled={dsl === savedDsl}
          className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-500 text-white rounded enabled:hover:bg-blue-600 disabled:opacity-50"
        >
          <Save className="w-3 h-3" />
          保存
        </button>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-1 px-3 py-2 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          <Play className="w-3 h-3" />
          {isRunning ? "停止测试" : "测试规则"}
        </button>
      </div>

      {isRunning && (
        <p className="mt-3 text-xs text-blue-600 dark:text-blue-400">正在使用当前 DSL 进行实时模拟测试&hellip;</p>
      )}
    </div>
  )
}
