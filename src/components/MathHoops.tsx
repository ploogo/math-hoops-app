'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CircleDot, Book, Trophy, Settings, User } from 'lucide-react'

interface GameHistoryItem {
  date: Date;
  score: number;
  fouls: number;
  completed: boolean;
}

interface Question {
  question: string;
  answer: string;
  difficulty: string;
  explanation: string;
  type: 'multiplication' | 'division' | 'geometry' | 'fractions';
}

const questions: Question[] = [
  { question: "What is 7 × 8?", answer: "56", difficulty: "easy", explanation: "7 × 8 = 56", type: "multiplication" },
  { question: "If a basketball team scores 9 points in each quarter, how many points do they score in a full game?", answer: "36", difficulty: "medium", explanation: "There are 4 quarters in a game, so 9 × 4 = 36 points", type: "multiplication" },
  { question: "If a team scores 48 points and each player scores 6 points, how many players scored?", answer: "8", difficulty: "medium", explanation: "48 ÷ 6 = 8 players", type: "division" },
  { question: "A basketball court is 94 feet long. If you divide it into 5 equal sections, how long is each section?", answer: "18.8", difficulty: "hard", explanation: "94 ÷ 5 = 18.8 feet", type: "division" },
  { question: "What is the area of a rectangular basketball court that is 94 feet long and 50 feet wide?", answer: "4700", difficulty: "medium", explanation: "Area = length × width, so 94 × 50 = 4,700 square feet", type: "geometry" },
  { question: "If a basketball hoop is 10 feet high and a player can jump 3 feet, how much higher does the ball need to go?", answer: "7", difficulty: "easy", explanation: "10 - 3 = 7 feet", type: "geometry" },
  { question: "If a player makes 3 out of 4 free throws, what fraction of the free throws did they make?", answer: "3/4", difficulty: "easy", explanation: "They made 3 out of 4, which is represented as the fraction 3/4", type: "fractions" },
  { question: "If a team wins 5/8 of their games and they've played 40 games, how many games have they won?", answer: "25", difficulty: "hard", explanation: "5/8 of 40 is (5 × 40) ÷ 8 = 200 ÷ 8 = 25 games", type: "fractions" },
];

const basketballFunFacts = [
  "The NBA three-point line is 23 feet 9 inches from the center of the hoop.",
  "Wilt Chamberlain holds the record for most points scored in a single NBA game with 100 points in 1962.",
  "The basketball used in the NBA must be inflated to between 7.5 and 8.5 pounds per square inch.",
  "The first basketball game was played with a soccer ball and two peach baskets.",
  "The Boston Celtics have won the most NBA championships with 17 titles.",
];

const nbaHighlights = [
  { player: "LeBron James", videoId: "b5r1GtBOANc" },
  { player: "Stephen Curry", videoId: "rb9QvBPuInA" },
  { player: "Kevin Durant", videoId: "uk1TrP6Sj0U" },
  { player: "Giannis Antetokounmpo", videoId: "RLmRDZPL1VQ" },
  { player: "Kawhi Leonard", videoId: "6yW7Tg9VVSw" },
];

export function MathHoops() {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [fouls, setFouls] = useState(0)
  const [streak, setStreak] = useState(0)
  const [dailyCompletion, setDailyCompletion] = useState(0)
  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([])
  const [currentDay, setCurrentDay] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState<'multiplication' | 'division' | 'geometry' | 'fractions' | null>(null)
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (selectedTopic) {
      const topicQuestions = questions.filter(q => q.type === selectedTopic)
      const shuffled = [...topicQuestions].sort(() => 0.5 - Math.random())
      setDailyQuestions(shuffled.slice(0, 20))
      setCurrentQuestionIndex(0)
      setQuizCompleted(false)
      setMessage('')
      setDailyCompletion(0)
      setFouls(0)
    }
  }, [selectedTopic])

  const checkAnswer = () => {
    if (dailyQuestions.length === 0 || currentQuestionIndex >= dailyQuestions.length) return;

    const currentQuestion = dailyQuestions[currentQuestionIndex]
    const formattedUserAnswer = userAnswer.replace(/\s/g, '').toLowerCase()
    const formattedCorrectAnswer = currentQuestion.answer.replace(/\s/g, '').toLowerCase()

    if (formattedUserAnswer === formattedCorrectAnswer) {
      setScore(prevScore => prevScore + 10)
      setMessage("Swish! Perfect shot!")
      setStreak(prevStreak => prevStreak + 1)
      if (score + 10 >= level * 50) {
        setLevel(prevLevel => prevLevel + 1)
      }
    } else {
      setFouls(prevFouls => prevFouls + 1)
      setStreak(0)
      setMessage(`Foul! The correct answer is ${currentQuestion.answer}. ${currentQuestion.explanation}`)
    }
    setUserAnswer('')
    setDailyCompletion(prevCompletion => prevCompletion + 1)

    if (dailyCompletion + 1 >= 20) {
      setQuizCompleted(true)
      setShowVideo(true)
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1)
    }
  }

  const renderFouls = () => {
    return (
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full mr-1 ${i < fouls ? 'bg-raptors-red' : 'bg-raptors-gray-light'}`} aria-hidden="true"></div>
        ))}
        <span className="ml-2 text-raptors-black">{5 - fouls} fouls left</span>
      </div>
    )
  }

  const renderParentDashboard = () => {
    return (
      <Card className="bg-raptors-black text-raptors-white">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-4 text-raptors-red">Parent Dashboard</h3>
          <p>Current Streak: {streak} days</p>
          <p>Total Score: {score}</p>
          <p>Questions Completed Today: {dailyCompletion}/20</p>
          <h4 className="text-xl font-bold mt-4 mb-2 text-raptors-red">Game History</h4>
          {gameHistory.map((game, index) => (
            <div key={index} className="mb-2 border-b border-raptors-gray-dark pb-2">
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

  const renderTopicSelection = () => {
    return (
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4 text-raptors-red">Choose Your Practice Topic</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setSelectedTopic('multiplication')} className="bg-raptors-red text-raptors-white hover:bg-raptors-red-dark">Multiplication</Button>
          <Button onClick={() => setSelectedTopic('division')} className="bg-raptors-red text-raptors-white hover:bg-raptors-red-dark">Division</Button>
          <Button onClick={() => setSelectedTopic('geometry')} className="bg-raptors-red text-raptors-white hover:bg-raptors-red-dark">Geometry</Button>
          <Button onClick={() => setSelectedTopic('fractions')} className="bg-raptors-red text-raptors-white hover:bg-raptors-red-dark">Fractions</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-raptors-black p-8">
      <Card className="max-w-4xl mx-auto bg-raptors-white">
        <CardHeader className="bg-raptors-red">
          <CardTitle className="text-4xl font-bold text-center text-raptors-white">Math Hoops</CardTitle>
        </CardHeader>
        <CardContent className="bg-raptors-white">
          <Tabs defaultValue="practice" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4 bg-raptors-gray-light">
              <TabsTrigger value="learn" className="text-raptors-black hover:bg-raptors-red hover:text-raptors-white"><Book className="mr-2" />Learn</TabsTrigger>
              <TabsTrigger value="practice" className="text-raptors-black hover:bg-raptors-red hover:text-raptors-white"><CircleDot className="mr-2" />Practice</TabsTrigger>
              <TabsTrigger value="achievements" className="text-raptors-black hover:bg-raptors-red hover:text-raptors-white"><Trophy className="mr-2" />Achievements</TabsTrigger>
              <TabsTrigger value="settings" className="text-raptors-black hover:bg-raptors-red hover:text-raptors-white"><Settings className="mr-2" />Settings</TabsTrigger>
              <TabsTrigger value="parent" className="text-raptors-black hover:bg-raptors-red hover:text-raptors-white"><User className="mr-2" />Parent</TabsTrigger>
            </TabsList>
            <TabsContent value="learn">
              <Card className="bg-raptors-white">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-raptors-red">Today&apos;s Lesson: Area</h3>
                  <p className="text-raptors-black">Area is the space inside a 2D shape. To find the area of a rectangle, multiply its length by its width.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="practice">
              <Card className="bg-raptors-white">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-raptors-red">Daily Math Challenge</h3>
                  {!selectedTopic ? (
                    renderTopicSelection()
                  ) : !quizCompleted ? (
                    <>
                      <p className="mb-2 text-raptors-black">Question {currentQuestionIndex + 1} of {dailyQuestions.length}</p>
                      <p className="mb-1 text-raptors-black">Difficulty: {dailyQuestions[currentQuestionIndex]?.difficulty}</p>
                      <p className="mb-4 text-raptors-black">{dailyQuestions[currentQuestionIndex]?.question}</p>
                      <div className="flex space-x-4 mb-4">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-raptors-gray-light bg-raptors-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-raptors-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raptors-red focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your answer"
                          aria-label="Your answer"
                        />
                        <Button onClick={checkAnswer} className="bg-raptors-red text-raptors-white hover:bg-raptors-red-dark">Submit</Button>
                      </div>
                      {message && (
                        <div className="mb-4">
                          <p className="text-raptors-black">{message}</p>
                        </div>
                      )}
                      {renderFouls()}
                    </>
                  ) : (
                    <div>
                      <p className="text-raptors-black mb-4">Great job! You've completed today's practice.</p>
                      <Button onClick={() => setSelectedTopic(null)} className="bg-raptors-red text-raptors-white hover:bg-raptors-red-dark">Start New Topic</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements">
              <Card className="bg-raptors-white">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-raptors-red">Your Achievements</h3>
                  <p className="text-raptors-black">Current Streak: {streak} days</p>
                  <p className="text-raptors-black">Total Score: {score}</p>
                  <p className="text-raptors-black">Questions Completed Today: {dailyCompletion}/20</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card className="bg-raptors-white">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-raptors-red">Game Settings</h3>
                  <p className="text-raptors-black">Customize your Math Hoops experience here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parent">
              {renderParentDashboard()}
            </TabsContent>
          </Tabs>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-raptors-black">Score: {score}</span>
              <span className="text-lg font-semibold text-raptors-black">Level: {level}</span>
            </div>
            <Progress value={(score % (level * 50)) / (level * 50) * 100} className="w-full bg-raptors-gray-light">
              <div className="h-full bg-raptors-red" style={{ width: `${(score % (level * 50)) / (level * 50) * 100}%` }}></div>
            </Progress>
          </div>
          <Card className="mt-6 bg-raptors-black">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2 text-raptors-red">Basketball Fun Fact</h3>
              <p className="text-raptors-white">{basketballFunFacts[currentDay % basketballFunFacts.length]}</p>
            </CardContent>
          </Card>
          {showVideo && (
            <Card className="mt-6 bg-raptors-black">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-raptors-red">NBA Highlight of the Day</h3>
                <p className="text-raptors-white mb-2">Watch highlights of {nbaHighlights[currentVideoIndex].player}</p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${nbaHighlights[currentVideoIndex].videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${nbaHighlights[currentVideoIndex].player} highlights`}
                  ></iframe>
                </div>
              </Card>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}