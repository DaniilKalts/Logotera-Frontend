"use client";

import React, { useState } from "react";
import DefaultLayout from "../(default)/layout"; // путь к DefaultLayout

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
    ];

    const handleAnswer = (answerIndex: number) => {
        setAnswers([...answers, answerIndex]);
        setStep(step + 1);
    };

    const calculateResult = () => {
        const score = answers.reduce((acc, curr) => acc + curr, 0);
        return score <= 1
            ? "⚠️ Possible signs of developmental delay detected. Please consult a specialist."
            : "✅ No concerning signs detected. Keep monitoring development.";
    };

    return (
        <DefaultLayout>
            <div className="max-w-xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Early Development Test</h1>
                {step < questions.length ? (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-xl font-semibold mb-4">{questions[step].question}</p>
                        <div className="flex flex-col space-y-2">
                            {questions[step].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Your Result:</h2>
                        <p className="text-gray-700">{calculateResult()}</p>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
