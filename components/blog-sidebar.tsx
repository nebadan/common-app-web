"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight } from "lucide-react"
import { blogCategories } from "@/data/blog-data"
import { useState } from "react"

export function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 border-gray-300 focus:border-primary"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Other Blog Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">OTHER BLOG</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {blogCategories.map((category, index) => (
              <div
                key={category.id}
                className={`p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index === 1 ? "bg-primary text-white hover:bg-primary/90" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${index === 1 ? "text-white" : "text-gray-700"}`}>{category.name}</span>
                  <ChevronRight className={`w-4 h-4 ${index === 1 ? "text-white" : "text-gray-400"}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
