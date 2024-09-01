import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newQuestions = [
    { question: "12 x 8 = ?", answer: 96 },
    { question: "15 x 7 = ?", answer: 105 },
    // ... add more questions here ...
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