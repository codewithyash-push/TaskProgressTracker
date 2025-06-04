"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Target, Trophy } from "lucide-react"

interface Task {
  id: string
  title: string
  category: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

interface MonthlyMonitorProps {
  tasks: Task[]
}

export function MonthlyMonitor({ tasks }: MonthlyMonitorProps) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const thisMonthTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt)
    return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear
  })

  const completedThisMonth = thisMonthTasks.filter((task) => task.completed)
  const completionRate = thisMonthTasks.length > 0 ? (completedThisMonth.length / thisMonthTasks.length) * 100 : 0

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getStreakDays = () => {
    const today = new Date()
    let streak = 0
    const currentDate = new Date(today)

    while (currentDate >= new Date(currentYear, currentMonth, 1)) {
      const dayTasks = tasks.filter((task) => {
        if (!task.completedAt) return false
        const completedDate = new Date(task.completedAt)
        return completedDate.toDateString() === currentDate.toDateString()
      })

      if (dayTasks.length > 0) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          {monthNames[currentMonth]} {currentYear} Monitor
        </CardTitle>
        <CardDescription>Your monthly progress and achievements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{thisMonthTasks.length}</div>
            <div className="text-sm text-blue-700 flex items-center justify-center gap-1">
              <Target className="h-3 w-3" />
              Tasks Enlisted
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedThisMonth.length}</div>
            <div className="text-sm text-green-700 flex items-center justify-center gap-1">
              <Trophy className="h-3 w-3" />
              Tasks Completed
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Monthly Completion Rate</span>
            <Badge variant={completionRate >= 80 ? "default" : completionRate >= 60 ? "secondary" : "outline"}>
              {Math.round(completionRate)}%
            </Badge>
          </div>
          <Progress value={completionRate} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <div>
              <div className="font-medium">{getStreakDays()} Day Streak</div>
              <div className="text-gray-500">Current streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <div>
              <div className="font-medium">
                {Math.round(completedThisMonth.length / Math.max(1, new Date().getDate()))} per day
              </div>
              <div className="text-gray-500">Average completion</div>
            </div>
          </div>
        </div>

        {completionRate >= 80 && (
          <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 text-orange-700">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-medium">🎉 Excellent month! You're crushing your goals!</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
