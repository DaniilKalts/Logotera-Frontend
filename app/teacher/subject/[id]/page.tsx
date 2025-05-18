"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/app/(default)/layout";

type Group = {
    id: number;
    name: string;
};

type Subject = {
    id: number;
    name: string;
    lecturerName?: string;
    practiceTeacher?: string;
    groups: Group[];
};

export default function SubjectDetailsPage({ params }: { params: { id: string } }) {
    const [subject, setSubject] = useState<Subject | null>(null);
    const subjectId = params.id;

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchSubject = async () => {
            try {
                const res = await fetch(`http://localhost:5117/api/User/teacher/subject?subjectId=${subjectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                const subjectData: Subject = {
                    id: data.id,
                    name: data.name,
                    lecturerName: data.lecturerTeacher
                        ? `${data.lecturerTeacher.firstName} ${data.lecturerTeacher.lastName}`
                        : "Not assigned",
                    practiceTeacher: data.practiceTeacher
                        ? `${data.practiceTeacher.firstName} ${data.practiceTeacher.lastName}`
                        : "Not assigned",
                    groups: data.groups || [],
                };

                setSubject(subjectData);
            } catch (error) {
                console.error("Error fetching subject:", error);
            }
        };

        if (subjectId) fetchSubject();
    }, [subjectId]);

    if (!subject) {
        return (
            <div className="text-center text-gray-500 mt-20 text-lg">
                Loading subject data...
            </div>
        );
    }

    return (
        <DefaultLayout>
            <div className="px-4 sm:px-6 md:px-8 py-10 mt-16">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
                        {subject.name}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Main info (left) */}
                        <div className="flex-1 space-y-4 text-gray-800 text-base">
                            <p>
                                <span className="font-semibold">Lecturer:</span> {subject.lecturerName}
                            </p>
                            <p>
                                <span className="font-semibold">Practice Teacher:</span> {subject.practiceTeacher}
                            </p>
                            <div>
                                <p className="font-semibold">Groups:</p>
                                {subject.groups.length > 0 ? (
                                    <ul className="list-disc list-inside mt-1">
                                        {subject.groups.map((group) => (
                                            <li key={group.id}>{group.name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No groups assigned.</p>
                                )}
                            </div>
                        </div>

                        {/* Sidebar (right) */}
                        <div className="w-full md:w-64 p-4 border rounded-xl bg-gray-50 text-sm text-gray-700">
                            <h3 className="font-semibold text-lg mb-3">Tools</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        // onClick={openAddStudentModal}
                                        className="mt-2 text-sm text-blue-600 hover:underline"
                                    >
                                        + Add Syllabus
                                    </button>
                                </li>
                                <li>
                                    <button
                                        // onClick={openAddStudentModal}
                                        className="mt-2 text-sm text-blue-600 hover:underline"
                                    >
                                        + Add Module
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>

    );
}
