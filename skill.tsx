"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp } from "lucide-react"

interface Task {
  id: string
  title: string
  category: string
  completed: boolean
}

interface SkillPredictorProps {
  tasks: Task[]
}

export function SkillPredictor({ tasks }: SkillPredictorProps) {
  const completedTasks = tasks.filter((task) => task.completed)

  const skillCategories = completedTasks.reduce(
    (acc, task) => {
      const category = task.category.toLowerCase()
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const skillMapping: Record<string, { skills: string[]; icon: string }> = {
    programming: { skills: ["Problem Solving", "Logic", "Debugging"], icon: "💻" },
    design: { skills: ["Creativity", "Visual Design", "UX/UI"], icon: "🎨" },
    learning: { skills: ["Research", "Knowledge Acquisition", "Study Skills"], icon: "📚" },
    fitness: { skills: ["Discipline", "Physical Health", "Consistency"], icon: "💪" },
    work: { skills: ["Productivity", "Time Management", "Professional Skills"], icon: "💼" },
    personal: { skills: ["Self-Improvement", "Life Skills", "Organization"], icon: "🌱" },
  }

  const predictedSkills = Object.entries(skillCategories).flatMap(([category, count]) => {
    const mapping = skillMapping[category] || { skills: ["General Skills"], icon: "⭐" }
    return mapping.skills.map((skill) => ({
      skill,
      level: Math.min(100, (count / completedTasks.length) * 100 + Math.random() * 20),
      icon: mapping.icon,
      category,
    }))
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Skill Predictor
        </CardTitle>
        <CardDescription>Based on your completed tasks, here are the skills you're developing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictedSkills.length > 0 ? (
          predictedSkills.slice(0, 6).map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.skill}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {Math.round(item.level)}%
                </Badge>
              </div>
              <Progress value={item.level} className="h-2" />
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Complete some tasks to see your skill predictions!</p>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">
                You're building skills across {Object.keys(skillCategories).length} categories!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
