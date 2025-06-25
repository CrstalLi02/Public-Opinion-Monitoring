"use client"

import { useState } from "react"
import Image from "next/image"
import { PlayCircle, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MediaItem {
  id: string
  url: string
  type: "image" | "video"
  platform: string
  carBrand?: string
  tags: string[]
}

const SAMPLE_MEDIA: MediaItem[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=200&width=350",
    type: "image",
    platform: "微博",
    carBrand: "某品牌A",
    tags: ["发动机", "异响"],
  },
  {
    id: "2",
    url: "/placeholder.svg?height=200&width=350",
    type: "video",
    platform: "抖音",
    carBrand: "某品牌B",
    tags: ["驾驶体验"],
  },
  {
    id: "3",
    url: "/placeholder.svg?height=200&width=350",
    type: "image",
    platform: "小红书",
    tags: ["仪表盘"],
  },
]

export default function MediaGallery({
  items = SAMPLE_MEDIA,
}: {
  items?: MediaItem[]
}) {
  const [selected, setSelected] = useState<MediaItem | null>(null)

  return (
    <div className="space-y-4">
      {/* 选中详情（移动端优先） */}
      {selected && (
        <div className="lg:hidden p-4 border rounded-lg space-y-2">
          <h4 className="text-sm font-medium">
            {selected.platform} · {selected.carBrand ?? "未知品牌"}
          </h4>
          <div className="flex gap-1 flex-wrap">
            {selected.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className={cn(
              "relative group border rounded-lg overflow-hidden focus:outline-none",
              selected?.id === item.id && "ring-2 ring-blue-500",
            )}
          >
            {item.type === "image" ? (
              <Image
                src={item.url || "/placeholder.svg"}
                alt="media"
                width={400}
                height={240}
                className="object-cover w-full aspect-video"
              />
            ) : (
              <>
                <Image
                  src={item.url || "/placeholder.svg"}
                  alt="video thumbnail"
                  width={400}
                  height={240}
                  className="object-cover w-full aspect-video opacity-70 group-hover:opacity-60"
                />
                <PlayCircle className="absolute inset-0 m-auto w-10 h-10 text-white" />
              </>
            )}
            {/* 简要标签 */}
            <div className="absolute bottom-1 left-1 flex gap-1">
              <span className="px-1 py-0.5 bg-black/60 text-white text-[10px] rounded">{item.platform}</span>
              {item.type === "image" ? (
                <ImageIcon className="w-3 h-3 text-white" />
              ) : (
                <PlayCircle className="w-3 h-3 text-white" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
