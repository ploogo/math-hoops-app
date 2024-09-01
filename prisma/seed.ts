import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newQuestions = [
    { question: "12 x 8 = ?", answer: 96 },
    { question: "15 x 7 = ?", answer: 105 },
    { question: "9 x 13 = ?", answer: 117 },
    { question: "16 x 6 = ?", answer: 96 },
    { question: "11 x 12 = ?", answer: 132 },
    { question: "14 x 9 = ?", answer: 126 },
    { question: "17 x 5 = ?", answer: 85 },
    { question: "18 x 4 = ?", answer: 72 },
    { question: "13 x 10 = ?", answer: 130 },
    { question: "19 x 3 = ?", answer: 57 },
    { question: "7 x 15 = ?", answer: 105 },
    { question: "8 x 14 = ?", answer: 112 },
    { question: "6 x 18 = ?", answer: 108 },
    { question: "12 x 11 = ?", answer: 132 },
    { question: "9 x 16 = ?", answer: 144 },
    { question: "13 x 7 = ?", answer: 91 },
    { question: "15 x 6 = ?", answer: 90 },
    { question: "14 x 8 = ?", answer: 112 },
    { question: "17 x 4 = ?", answer: 68 },
    { question: "10 x 19 = ?", answer: 190 }
  ]

  for (const q of newQuestions) {
    await prisma.mathQuestion.create({
      data: q
    })
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())