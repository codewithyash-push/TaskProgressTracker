"use client"

import { useState, useEffect } from "react"
import { TaskManager } from "@/components/task-manager"
import { MonthlyMonitor } from "@/components/monthly-monitor"
import { SkillPredictor } from "@/components/skill-predictor"
import { Celebration } from "@/components/celebration"

interface Task {
  id: string
  title: string
  category: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

export default function ProgressTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("progress-tracker-tasks")
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }))
      setTasks(parsedTasks)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("progress-tracker-tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleTaskComplete = () => {
    setShowCelebration(true)
  }

  const handleCelebrationComplete = () => {
    setShowCelebration(false)
  }

  return (
    <div
      className="min-h-screen p-4 bg-gray-50"
      style={{
        backgroundImage: `url('https://unsplash.com/photos/a-black-and-white-photo-of-a-body-of-water-GS4PpCgsd-o')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎯 Progress Tracker</h1>
          <p className="text-gray-600">Track your tasks, celebrate achievements, and discover your growing skills</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Manager */}
          <div className="lg:col-span-1">
            <TaskManager tasks={tasks} onTasksChange={setTasks} onTaskComplete={handleTaskComplete} />
          </div>

          {/* Monthly Monitor */}
          <div className="lg:col-span-1">
            <MonthlyMonitor tasks={tasks} />
          </div>

          {/* Skill Predictor - Full Width */}
          <div className="lg:col-span-2">
            <SkillPredictor tasks={tasks} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">🌟 Keep going! Every completed task is a step towards your goals.</p>
        </div>
      </div>

      {/* Celebration Component */}
      <Celebration show={showCelebration} onComplete={handleCelebrationComplete} />
    </div>
  )
}
