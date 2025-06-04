"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Activity,
  Calendar,
  Code2,
  GitCommit,
  GitPullRequest,
  MessageSquare,
  Rocket,
  Server,
  Users,
} from "lucide-react"

export default function DeveloperProfileCard() {
  const [isAvailable, setIsAvailable] = useState(true)

  return (
    <Card
      className="w-full max-w-md shadow-lg bg-cover bg-center text-white"
      style={{ backgroundImage: `url("/bg-water.jpg")` }}
    >
      <div className="backdrop-brightness-75 p-4 rounded-lg"> {/* Overlay for readability */}

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Alex Chen" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">Alex Chen</CardTitle>
                <CardDescription className="flex items-center gap-1 text-white/80">
                  <Code2 className="h-3.5 w-3.5" />
                  Senior DevOps Engineer
                </CardDescription>
                <div className="flex gap-1 mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    <Server className="h-3 w-3 mr-1" />
                    Infrastructure
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                    <Rocket className="h-3 w-3 mr-1" />
                    CI/CD
                  </Badge>
                </div>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isAvailable ? "default" : "outline"}
                    size="sm"
                    className={isAvailable ? "bg-green-600 hover:bg-green-700" : "text-gray-500"}
                    onClick={() => setIsAvailable(!isAvailable)}
                  >
                    {isAvailable ? "Available" : "Busy"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle availability status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/20 text-white">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <Rocket className="h-3 w-3" />
                    Deployments
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <GitCommit className="h-3 w-3" />
                    Commits
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <GitPullRequest className="h-3 w-3" />
                    PRs
                  </div>
                </div>
              </div>

              <Separator className="bg-white/30" />

              <div>
                <h4 className="text-sm font-medium mb-2">Current Sprint Progress</h4>
                <div className="flex items-center gap-2">
                  <Progress value={68} className="h-2" />
                  <span className="text-xs font-medium">68%</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Terraform</Badge>
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Go</Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="flex gap-2 items-start">
                  <GitPullRequest className="h-4 w-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      Merged PR: <span className="font-medium">Fix Kubernetes deployment script</span>
                    </p>
                    <p className="text-xs text-white/70">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <GitCommit className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      Committed to <span className="font-medium">main</span>: Update CI pipeline
                    </p>
                    <p className="text-xs text-white/70">5 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <Rocket className="h-4 w-4 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      Deployed <span className="font-medium">api-service</span> to production
                    </p>
                    <p className="text-xs text-white/70">Yesterday</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <MessageSquare className="h-4 w-4 text-orange-400 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      Commented on issue <span className="font-medium">#234</span>
                    </p>
                    <p className="text-xs text-white/70">2 days ago</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4 pt-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Platform Team</h4>
                  <Badge variant="outline" className="text-xs">8 members</Badge>
                </div>
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background h-8 w-8">
                    <AvatarFallback>+4</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Current Projects</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-300" />
                      <span className="text-sm">Kubernetes Migration</span>
                    </div>
                    <Badge>Lead</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Monitoring Overhaul</span>
                    </div>
                    <Badge variant="outline">Contributor</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between pt-2">
          <div className="flex items-center text-xs text-white/80">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Last active: Today at 2:45 PM
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button size="sm">
              <Users className="h-4 w-4 mr-1" />
              View Team
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
