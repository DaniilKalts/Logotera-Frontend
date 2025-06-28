"use client";

import { useState, useEffect } from "react";
import {
    startOfWeek,
    addDays,
    format,
    isSameDay,
} from "date-fns";

type Task = {
    id: number;
    text: string;
    isCompleted: boolean;
    date: string;
};

export default function Home() {
    const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [newTaskText, setNewTaskText] = useState("");
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportText, setReportText] = useState("");
    const [submittedReports, setSubmittedReports] = useState<Record<string, string>>({});

    const weekKey = format(weekStart, "yyyy-MM-dd");
    const days = [...Array(7)].map((_, i) => addDays(weekStart, i));

    // Загрузим задачи и отчёт при смене недели
    useEffect(() => {
        const loadData = async () => {
            // Загружаем задачи для каждого дня недели
            let loadedTasks: Task[] = [];
            for (let day of days) {
                const dateStr = format(day, "yyyy-MM-dd");
                const tasksForDay = await loadTasks(dateStr);
                loadedTasks = [...loadedTasks, ...tasksForDay];
            }
            setTasks(loadedTasks);

            // Загружаем недельный отчёт
            const report = await loadWeeklyReport(weekKey);
            if (report && report.text) {
                setSubmittedReports(prev => ({
                    ...prev,
                    [weekKey]: report.text
                }));
            }
        };

        loadData();
    }, [weekStart]);

    const loadWeeklyReport = async (weekStart: string) => {
        const response = await fetch(`http://localhost:5117/api/reports/${weekStart}`);
        const data = await response.json();
        return data;
    };

    const loadTasks = async (date: string) => {
        const response = await fetch(`http://localhost:5117/api/tasks/${date}`);
        const data = await response.json();
        return data;
    };

    const toggleTask = async (id: number) => {
        await fetch(`http://localhost:5117/api/tasks/${id}/toggle`, {
            method: "PUT"
        });

        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const submitReport = async () => {
        const form = JSON.stringify({
            weekStart: weekKey,
            text: reportText.trim()
        });

        await fetch("http://localhost:5117/api/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: form
        });

        setSubmittedReports(prev => ({
            ...prev,
            [weekKey]: reportText.trim(),
        }));
        setReportText("");
        setShowReportModal(false);
    };

    const addTask = async () => {
        if (!newTaskText.trim()) return;

        const form = JSON.stringify({
            text: newTaskText.trim(),
            isCompleted: false,
            date: selectedDate,
        });

        const response = await fetch("http://localhost:5117/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: form
        });

        const savedTask = await response.json();

        setTasks(prev => [...prev, savedTask]);
        setNewTaskText("");
        setShowTaskModal(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4 sm:px-6 lg:px-20 xl:px-40">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 select-none drop-shadow-sm">
                    🗓 Weekly Task Calendar
                </h1>

                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => setWeekStart(addDays(weekStart, -7))}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                    >
                        ← Previous
                    </button>
                    <h2 className="text-2xl font-semibold text-indigo-900">
                        {format(weekStart, "MMMM yyyy")}
                    </h2>
                    <button
                        onClick={() => setWeekStart(addDays(weekStart, 7))}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                    >
                        Next →
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">                    {days.map(day => (
                        <div
                            key={day.toDateString()}
                            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
                        >
                            <div>
                                <p className="text-sm text-indigo-600 font-medium">
                                    {format(day, "EEEE")}
                                </p>
                                <p className="text-3xl font-bold text-gray-800">{format(day, "dd")}</p>
                                <p className="text-xs text-gray-400">{format(day, "MMM")}</p>
                            </div>

                            <ul className="mt-4 space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300">
                                {tasks
                                    .filter(task => isSameDay(new Date(task.date), day))
                                    .map(task => (
                                        <li key={task.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={task.isCompleted}
                                                onChange={() => toggleTask(task.id)}
                                                className="h-5 w-5"
                                            />
                                            <span className={task.isCompleted ? "line-through text-gray-400" : "text-sm"}>
                                                {task.text}
                                            </span>
                                        </li>
                                    ))}
                                {tasks.filter(task => isSameDay(new Date(task.date), day)).length === 0 && (
                                    <li className="text-gray-300 italic text-sm">No tasks</li>
                                )}
                            </ul>

                            <button
                                onClick={() => {
                                    setSelectedDate(format(day, "yyyy-MM-dd"));
                                    setShowTaskModal(true);
                                }}
                                className="mt-4 w-full text-indigo-600 font-semibold hover:text-indigo-800"
                            >
                                + Add Task
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mb-6 text-center">
                    <button
                        onClick={() => {
                            setReportText(submittedReports[weekKey] || "");
                            setShowReportModal(true);
                        }}
                        className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
                    >
                        📝 Write Weekly Report
                    </button>
                </div>

                {submittedReports[weekKey] && (
                    <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold mb-2 text-indigo-900">📌 Weekly Summary</h3>
                        <p className="text-gray-800 whitespace-pre-wrap">{submittedReports[weekKey]}</p>
                    </div>
                )}
            </div>

            {showTaskModal && (
                <div className="fixed inset-0 bg-gray-400 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-3">Add Task</h3>
                        <p className="text-sm text-gray-500 mb-2">
                            For {format(new Date(selectedDate), "EEEE, MMMM do")}
                        </p>
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={e => setNewTaskText(e.target.value)}
                            placeholder="Task description"
                            className="w-full border border-indigo-300 rounded-md px-4 py-2 mb-4 focus:outline-none"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowTaskModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addTask}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Save Task
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showReportModal && (
                <div className="fixed inset-0 bg-gray-400 bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-2xl">
                        <h3 className="text-xl font-bold mb-3">Weekly Report</h3>
                        <textarea
                            value={reportText}
                            onChange={e => setReportText(e.target.value)}
                            placeholder="What happened this week?"
                            className="w-full min-h-[120px] border border-indigo-300 rounded-md px-4 py-2 mb-4"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitReport}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
