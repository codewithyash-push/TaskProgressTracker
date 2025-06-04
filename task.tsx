"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, CheckCircle2 } from "lucide-react"

interface Task {
  id: string
  title: string
  category: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

interface TaskManagerProps {
  tasks: Task[]
  onTasksChange: (tasks: Task[]) => void
  onTaskComplete: () => void
}

const categories = [
  { value: "programming", label: "Programming", emoji: "💻" },
  { value: "design", label: "Design", emoji: "🎨" },
  { value: "learning", label: "Learning", emoji: "📚" },
  { value: "fitness", label: "Fitness", emoji: "💪" },
  { value: "work", label: "Work", emoji: "💼" },
  { value: "personal", label: "Personal", emoji: "🌱" },
]

export function TaskManager({ tasks, onTasksChange, onTaskComplete }: TaskManagerProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskCategory, setNewTaskCategory] = useState("")

  const addTask = () => {
    if (newTaskTitle.trim() && newTaskCategory) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        category: newTaskCategory,
        completed: false,
        createdAt: new Date(),
      }
      onTasksChange([...tasks, newTask])
      setNewTaskTitle("")
      setNewTaskCategory("")
    }
  }

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const wasCompleted = task.completed
        const updatedTask = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined,
        }

        if (!wasCompleted && !task.completed) {
          onTaskComplete()
        }

        return updatedTask
      }
      return task
    })
    onTasksChange(updatedTasks)
  }

  const deleteTask = (taskId: string) => {
    onTasksChange(tasks.filter((task) => task.id !== taskId))
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const getCategoryEmoji = (category: string) => {
    return categories.find((cat) => cat.value === category)?.emoji || "📝"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Task Manager
        </CardTitle>
        <CardDescription>Add tasks and track your progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Task */}
        <div className="space-y-3">
          <Input
            placeholder="Enter a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <div className="flex gap-2">
            <Select value={newTaskCategory} onValueChange={setNewTaskCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <span className="flex items-center gap-2">
                      <span>{category.emoji}</span>
                      {category.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addTask} disabled={!newTaskTitle.trim() || !newTaskCategory}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <Badge variant={progressPercentage === 100 ? "default" : "secondary"}>
              {completedTasks}/{totalTasks} completed
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-xs text-gray-500 text-center">{Math.round(progressPercentage)}% complete</div>
        </div>

        {/* Task List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  task.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                <span className="text-lg">{getCategoryEmoji(task.category)}</span>
                <div className="flex-1">
                  <div className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {categories.find((cat) => cat.value === task.category)?.label}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
