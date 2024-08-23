import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CircleDot, Book, Trophy, Settings, User } from 'lucide-react'

const questions = [
  { 
    question: "If a basketball court is 94 feet long and 50 feet wide, what is its area?", 
    answer: "4700",
    difficulty: "easy",
    explanation: "To find the area of a rectangle, multiply its length by its width. So, 94 feet × 50 feet = 4,700 square feet."
  },
  { 
    question: "A player scores 24 points in the first half and 18 in the second. What fraction of their total points were scored in the first half?", 
    answer: "4/7",
    difficulty: "medium",
    explanation: "Total points = 24 + 18 = 42. Fraction of points in first half = 24/42, which simplifies to 4/7."
  },
  { 
    question: "If a team's win percentage is 0.65 and they've played 80 games, how many games have they won?", 
    answer: "52",
    difficulty: "hard",
    explanation: "Win percentage of 0.65 means they've won 65% of their games. 65% of 80 is 0.65 × 80 = 52 games."
  },
  // ... add more questions with varying difficulties
]

export default function Component() {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [fouls, setFouls] = useState(0)
  const [streak, setStreak] = useState(0)
  const [dailyCompletion, setDailyCompletion] = useState(0)
  const [showParentDashboard, setShowParentDashboard] = useState(false)
  const [gameHistory, setGameHistory] = useState([])

  useEffect(() => {
    // Reset quiz and update streak at midnight
    const now = new Date()
    const night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
    const msToMidnight = night.getTime() - now.getTime()

    const timer = setTimeout(() => {
      setCurrentQuestionIndex(0)
      setQuizCompleted(false)
      setMessage('')
      setFouls(0)
      setDailyCompletion(0)
      if (dailyCompletion === 10) {
        setStreak(streak + 1)
      } else {
        setStreak(0)
      }
      setGameHistory([...gameHistory, { date: new Date(), score, fouls, completed: dailyCompletion === 10 }])
    }, msToMidnight)

    return () => clearTimeout(timer)
  }, [dailyCompletion, streak, gameHistory, score, fouls])

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex]
    const formattedUserAnswer = userAnswer.replace(/\s/g, '').toLowerCase()
    const formattedCorrectAnswer = currentQuestion.answer.replace(/\s/g, '').toLowerCase()

    if (formattedUserAnswer === formattedCorrectAnswer) {
      setScore(score + 10)
      setMessage("Swish! Perfect shot!")
      setStreak(streak + 1)
      if (score + 10 >= level * 50) {
        setLevel(level + 1)
      }
    } else {
      setFouls(fouls + 1)
      setStreak(0)
      setMessage(`Foul! The correct answer is ${currentQuestion.answer}. ${currentQuestion.explanation}`)
    }
    setUserAnswer('')
    setDailyCompletion(dailyCompletion + 1)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setMessage('')
    } else {
      setQuizCompleted(true)
      setMessage("Game over! Great job on today's practice.")
    }
  }

  const renderFouls = () => {
    return (
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full mr-1 ${i < fouls ? 'bg-red-500' : 'bg-gray-300'}`}></div>
        ))}
        <span className="ml-2">{5 - fouls} fouls left</span>
      </div>
    )
  }

  const renderParentDashboard = () => {
    return (
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-4">Parent Dashboard</h3>
          <p>Current Streak: {streak} days</p>
          <p>Total Score: {score}</p>
          <p>Questions Completed Today: {dailyCompletion}/10</p>
          <h4 className="text-xl font-bold mt-4 mb-2">Game History</h4>
          {gameHistory.map((game, index) => (
            <div key={index} className="mb-2">
              <p>Date: {game.date.toLocaleDateString()}</p>
              <p>Score: {game.score}</p>
              <p>Fouls: {game.fouls}</p>
              <p>Completed: {game.completed ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center p-8">
      <Card className="max-w-4xl mx-auto bg-background/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-primary">Math Hoops</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="practice" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="learn"><Book className="mr-2" />Learn</TabsTrigger>
              <TabsTrigger value="practice"><CircleDot className="mr-2" />Practice</TabsTrigger>
              <TabsTrigger value="achievements"><Trophy className="mr-2" />Achievements</TabsTrigger>
              <TabsTrigger value="settings"><Settings className="mr-2" />Settings</TabsTrigger>
              <TabsTrigger value="parent"><User className="mr-2" />Parent</TabsTrigger>
            </TabsList>
            <TabsContent value="learn">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Today's Lesson: Area</h3>
                  <p>Area is the space inside a 2D shape. To find the area of a rectangle, multiply its length by its width.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="practice">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Daily Math Challenge</h3>
                  {!quizCompleted ? (
                    <>
                      <p className="mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
                      <p className="mb-1">Difficulty: {questions[currentQuestionIndex].difficulty}</p>
                      <p className="mb-4">{questions[currentQuestionIndex].question}</p>
                      <div className="flex space-x-4 mb-4">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your answer"
                        />
                        <Button onClick={checkAnswer}>Submit</Button>
                      </div>
                      {message && (
                        <div className="mb-4">
                          <p className="text-accent-foreground">{message}</p>
                          <Button onClick={nextQuestion} className="mt-2">Next Question</Button>
                        </div>
                      )}
                      {renderFouls()}
                    </>
                  ) : (
                    <p className="text-accent-foreground">{message}</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Your Achievements</h3>
                  <p>Current Streak: {streak} days</p>
                  <p>Total Score: {score}</p>
                  <p>Questions Completed Today: {dailyCompletion}/10</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Game Settings</h3>
                  <p>Customize your Math Hoops experience here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parent">
              {renderParentDashboard()}
            </TabsContent>
          </Tabs>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Score: {score}</span>
              <span className="text-lg font-semibold">Level: {level}</span>
            </div>
            <Progress value={(score % (level * 50)) / (level * 50) * 100} className="w-full" />
          </div>
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Basketball Fun Fact</h3>
              <p>Did you know? The first basketball game was played with a soccer ball and two peach baskets nailed to balcony railings.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}