"use client"

import type React from "react"

import {
  Database,
  Search,
  Menu,
  TimerIcon as Timeline,
  Bell,
  Car,
  BarChart3,
  Heart,
  Brain,
  FileText,
  Wrench,
  Globe,
} from "lucide-react" // Gauge removed

import Link from "next/link"
import { useState } from "react"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    badge,
  }: {
    href: string
    icon: any
    children: React.ReactNode
    badge?: string
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <div className="flex items-center">
          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
          {children}
        </div>
        {badge && <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">{badge}</span>}
      </Link>
    )
  }

  function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div>
        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {title}
        </div>
        <div className="space-y-1">{children}</div>
      </div>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">车辆舆情监控系统</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              {/* 1️⃣ 舆情总览 */}
              <NavSection title="1️⃣ 舆情总览">
                <NavItem href="/dashboard" icon={BarChart3}>
                  📊 总览大屏
                </NavItem>
                <NavItem href="/dashboard/heatmap" icon={Globe}>
                  🌍 地图热力图
                </NavItem>
                <NavItem href="/dashboard/timeline" icon={Timeline}>
                  🧵 实时动态流
                </NavItem>
                <NavItem href="/dashboard/alerts" icon={Bell} badge="3">
                  🚨 预警中心
                </NavItem>
              </NavSection>

              {/* 2️⃣ 舆情数据中心 */}
              <NavSection title="2️⃣ 舆情数据中心">
                <NavItem href="/dashboard/data-pool" icon={Database}>
                  📁 原始数据列表
                </NavItem>
                <NavItem href="/dashboard/intelligent-search" icon={Search}>
                  🔍 智能检索
                </NavItem>
              </NavSection>

              {/* 3️⃣ 情感分析与归因 */}
              <NavSection title="3️⃣ 情感分析与归因">
                <NavItem href="/dashboard/sentiment-stats" icon={Heart}>
                  😊 情感分类统计
                </NavItem>
                <NavItem href="/dashboard/problem-classification" icon={Brain}>
                  🧠 问题归类聚合
                </NavItem>
                <NavItem href="/dashboard/content-summary" icon={FileText}>
                  🧾 用户摘要提取
                </NavItem>
                <NavItem href="/dashboard/component-risk" icon={Wrench}>
                  ⚙️ 零部件风险面板
                </NavItem>
              </NavSection>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
