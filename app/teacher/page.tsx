"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Тип предмета
type Subject = {
    id: number;
    name: string;
    lecturerName: string;
    practiceTeacher?: string;
};

export default function TeacherDashboard() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchSubjects = async () => {
            try {
                const res = await fetch("http://localhost:5117/api/User/teacher/subjectList",{
                    method: "GET",
                        headers: {
                        Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                    }
                });
                const data = await res.json();

                const fixedData = data.map((subject: any) => ({
                    id: subject.id,
                    name: subject.name,
                    lecturerName: subject.lecturerTeacher?.user?.userName + " " + subject.lecturerTeacher?.user?.surname,
                    practiceTeacher: subject.practiceTeacher?.user?.userName || "",
                }));

                setSubjects(fixedData);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        fetchSubjects();
    }, []);

    return (
        <div className="py-10 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
                Welcome, Teacher
            </h2>

            {subjects.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                    {subjects.map((subj) => (
                        <div
                            key={subj.id}
                            onClick={() => router.push(`/teacher/subject/${subj.id}`)}
                            className="cursor-pointer border border-gray-200 rounded-2xl p-6 bg-white shadow hover:shadow-md transition text-center"
                        >
                            <h3 className="text-xl font-medium text-gray-800">{subj.name}</h3>
                            <p className="text-sm text-gray-500 mt-2">Lecturer: {subj.lecturerName}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No subjects found.</p>
            )}
        </div>
    );
}
