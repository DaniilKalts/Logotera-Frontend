"use client";

import React, { useState } from "react";
import DefaultLayout from "../(default)/layout";
import { motion, AnimatePresence } from "framer-motion";

export default function TestPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);

    const questions = [
        {
            question: "Does the child respond to their name?",
            options: ["Yes", "No"],

        },
        {
            question: "Does the child maintain eye contact?",
            options: ["Yes", "No"],
        },
        {
            question: "Does the child engage in pretend play?",
            options: ["Yes", "No"],
        },
        {
            question: "Is the child sensitive to loud sounds?",
            options: ["Yes", "No"],
        },
    ];

    const handleAnswer = (answerIndex: number) => {
        setAnswers([...answers, answerIndex]);
        setStep(step + 1);
    };

    const calculateResult = () => {
        const score = answers.reduce((acc, curr) => acc + curr, 0);
        return score <= 2
            ? "⚠️ Possible signs of developmental delay detected. Please consult a specialist."
            : "✅ No concerning signs detected. Keep monitoring development.";
    };

    return (
        <DefaultLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-16 px-4">
                <div className="max-w-2xl mx-auto mt-25">
                    <AnimatePresence mode="wait">
                        {step < questions.length ? (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-2xl p-10"
                            >
                                <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
                                    Early Development Test
                                </h1>
                                <p className="text-2xl font-medium text-gray-800 mb-6 text-center">
                                    {questions[step].question}
                                </p>
                                <div className="flex flex-col gap-6 items-center">
                                    {questions[step].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(index)}
                                            className="w-full max-w-sm py-4 px-6 bg-blue-500 text-white text-xl rounded-xl hover:bg-blue-600 transition duration-300 shadow-md"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 text-center text-gray-500 text-sm">
                                    Question {step + 1} of {questions.length}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl shadow-2xl p-10 text-center"
                            >
                                <h2 className="text-3xl font-bold mb-6 text-green-600">
                                    Test Completed
                                </h2>
                                <p className="text-lg text-gray-700">{calculateResult()}</p>
                                <button
                                    onClick={() => {
                                        setStep(0);
                                        setAnswers([]);
                                    }}
                                    className="mt-8 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300"
                                >
                                    Retake Test
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DefaultLayout>
    );
}
