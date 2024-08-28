"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const questions = [
    {
        id: 1,
        question: "What is 7 × 8?",
        answer: "56",
        difficulty: "easy",
        type: "multiplication"
    },
    {
        id: 2,
        question: "Calculate 12 × 15.",
        answer: "180",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 3,
        question: "What is the product of 24 and 13?",
        answer: "312",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 4,
        question: "Solve 18 × 16.",
        answer: "288",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 5,
        question: "What is 32 × 25?",
        answer: "800",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 6,
        question: "Calculate 45 × 11.",
        answer: "495",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 7,
        question: "What is 17 × 23?",
        answer: "391",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 8,
        question: "Solve 36 × 14.",
        answer: "504",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 9,
        question: "What is 125 × 8?",
        answer: "1000",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 10,
        question: "Calculate 19 × 21.",
        answer: "399",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 11,
        question: "What is 64 × 15?",
        answer: "960",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 12,
        question: "Solve 28 × 35.",
        answer: "980",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 13,
        question: "What is 42 × 19?",
        answer: "798",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 14,
        question: "Calculate 56 × 24.",
        answer: "1344",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 15,
        question: "What is 72 × 15?",
        answer: "1080",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 16,
        question: "Solve 39 × 27.",
        answer: "1053",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 17,
        question: "What is 84 × 12?",
        answer: "1008",
        difficulty: "medium",
        type: "multiplication"
    },
    {
        id: 18,
        question: "Calculate 63 × 18.",
        answer: "1134",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 19,
        question: "What is 95 × 16?",
        answer: "1520",
        difficulty: "hard",
        type: "multiplication"
    },
    {
        id: 20,
        question: "Solve 78 × 22.",
        answer: "1716",
        difficulty: "hard",
        type: "multiplication"
    }
];
app.get('/api/questions', (req, res) => {
    const { type, difficulty, count } = req.query;
    let filteredQuestions = [...questions];
    if (type) {
        filteredQuestions = filteredQuestions.filter(q => q.type === type);
    }
    if (difficulty) {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Number(count) || 10);
    res.json(selected);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
