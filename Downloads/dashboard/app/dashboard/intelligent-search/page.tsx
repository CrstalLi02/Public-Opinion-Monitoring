import { Suspense } from "react"
import { IntelligentSearchEngine } from "@/components/kokonutui/intelligent-search-engine"
import { SearchFilters } from "@/components/kokonutui/search-filters"
import { SearchResults } from "@/components/kokonutui/search-results"

export default function IntelligentSearchPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">智能检索</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SearchFilters />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <IntelligentSearchEngine />
          <Suspense fallback={<div className="text-center py-10">加载中...</div>}>
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
