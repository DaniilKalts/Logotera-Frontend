"use client";

import React, { useState } from "react";
import DefaultLayout from "../(default)/layout"; // путь к DefaultLayout

export default function TestPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);

    const questions = [
        {
            question: "Верно ли, что ваш ребенок не реагирует или не всегда реагирует на обращенную ему речь?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок не понимает и не делает попыток выполнять просьбы и инструкции взрсолого?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок не может сосредоточиться на задании, не умеет подражать, не выполняет задания по образцу?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок не смотрит вам в глаза, когда вы говорите с ним, зрительный контакт вызывает у него сильные затруднения?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок когда что-то хочет, не просит помощи, старается сделать это самостоятельно или тянет взрослого за руку?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок не включается в игру, которую предлагаете вы, и не дает вам подлкючаться к его занятиям?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок проявляет сильное недовольство, если вы хотите переключить его с одной деятельности на другую?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок не обращается к вам при помощи речи, взгляда и указательный жест у него отсутствует?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок не понимает и не делает попытой выполнять просьбы и инструкции взрослого?",
            options: ["Да", "Нет"],
        },
        {
            question: "Верно ли, что ваш ребенок не понимает и не делает попытой выполнять просьбы и инструкции взрослого?",
            options: ["Да", "Нет"],
        },

    ];

    const handleAnswer = (answerIndex: number) => {
        setAnswers([...answers, answerIndex]);
        setStep(step + 1);
    };

    const calculateResult = () => {
        const yesCount = answers.filter((a) => a === 0).length;
        if (yesCount >= 8) {
            return (
                <>
                    <div className="font-bold text-red-600 mb-4 text-2xl">Результаты теста:</div>
                    <div className="mb-2">Высокая вероятность признаков. Рекомендуется обратиться к специалисту.</div>
                    <div className="text-gray-500 text-sm">Этот тест не является медицинским диагнозом.</div>
                </>
            );
        } else if (yesCount >= 4) {
            return (
                <>
                    <div className="font-bold text-yellow-600 mb-4 text-2xl">Результаты теста:</div>
                    <div className="mb-2">Средняя вероятность признаков. Пожалуйста, проконсультируйтесь со специалистом.</div>
                    <div className="text-gray-500 text-sm">Этот тест не является медицинским диагнозом.</div>
                </>
            );
        } else {
            return (
                <>
                    <div className="font-bold text-green-600 mb-4 text-2xl">Результаты теста:</div>
                    <div className="mb-2">Низкая вероятность признаков. Продолжайте наблюдать за развитием.</div>
                    <div className="text-gray-500 text-sm">Этот тест не является медицинским диагнозом.</div>
                </>
            );
        }
    };

    return (
        <DefaultLayout>
            <div className="max-w-xl mx-auto py-10 px-4">
                <div className="mt-20"></div>
                <h1 className="text-3xl font-bold mb-6 text-center">Тест раннего развития</h1>
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
                        <p className="text-gray-700">{calculateResult()}</p>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
