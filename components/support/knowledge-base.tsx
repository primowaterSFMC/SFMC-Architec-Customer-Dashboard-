"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, ArrowRight, Star } from "lucide-react"

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      title: "Getting Started",
      description: "Basic setup and configuration guides",
      articles: 12,
      icon: "🚀",
    },
    {
      title: "Token Management",
      description: "Managing API tokens and authentication",
      articles: 8,
      icon: "🔑",
    },
    {
      title: "SFMC Tools",
      description: "Using Salesforce Marketing Cloud tools",
      articles: 25,
      icon: "🛠️",
    },
    {
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: 15,
      icon: "🔧",
    },
  ]

  const popularArticles = [
    {
      title: "How to set up your first API token",
      category: "Getting Started",
      views: 1250,
      rating: 4.8,
      readTime: "5 min",
    },
    {
      title: "Understanding SFMC tool categories",
      category: "SFMC Tools",
      views: 980,
      rating: 4.6,
      readTime: "8 min",
    },
    {
      title: "Troubleshooting authentication errors",
      category: "Troubleshooting",
      views: 756,
      rating: 4.7,
      readTime: "6 min",
    },
    {
      title: "Best practices for API usage",
      category: "SFMC Tools",
      views: 642,
      rating: 4.9,
      readTime: "12 min",
    },
  ]

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{category.articles} articles</Badge>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Popular Articles
          </CardTitle>
          <CardDescription>Most viewed and helpful articles from our knowledge base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="font-medium mb-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge variant="outline">{article.category}</Badge>
                    <span>{article.views} views</span>
                    <span>{article.readTime} read</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{article.rating}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
