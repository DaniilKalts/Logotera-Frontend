"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

// Types
interface Group {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
    lecturerName?: string;
    practiceTeacher?: string;
    groups: Group[];
    syllabusFilePath?: string | null;
}

export default function SubjectDetailsClient() {
    const params = useParams();
    const subjectId = params?.id as string;
    const [subject, setSubject] = useState<Subject | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchSubject() {
            try {
                const res = await fetch(
                    `http://localhost:5117/api/User/teacher/subject?subjectId=${subjectId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await res.json();

                const subjectData: Subject = {
                    id: data.id,
                    name: data.name,
                    syllabusFilePath: data.syllabusFilePath,
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
        }

        if (subjectId) fetchSubject();
    }, [subjectId]);

    const handleUploadSyllabus = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file || !subject) {
            alert("Please select a file first.");
            return;
        }

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(
                `http://localhost:5117/api/User/teacher/upload-syllabus?subjectId=${subject.id}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                }
            );
            if (!res.ok) throw new Error("Upload failed.");
            alert("Syllabus uploaded successfully.");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading syllabus.");
        }
    };

    const handleDownloadSyllabus = async () => {
        if (!subject) return;
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `http://localhost:5117/api/User/user/download-syllabus?subjectId=${subject.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) throw new Error("Download failed.");
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "syllabus.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Error downloading syllabus.");
        }
    };

    if (!subject) {
        return (
            <div className="text-center text-gray-500 mt-20 text-lg">
                Loading subject data...
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 md:px-8 py-10 mt-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
                    {subject.name}
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
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

                    {/* Sidebar */}
                    <div className="w-full md:w-64 p-4 border rounded-xl bg-gray-50 text-sm text-gray-700">
                        <h3 className="font-semibold text-lg mb-3">Tools</h3>
                        <ul className="space-y-3">
                            <li>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleUploadSyllabus}
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="block w-full text-blue-600 hover:underline"
                                >
                                    {subject.syllabusFilePath ? "Update Syllabus" : "Add Syllabus"}
                                </button>
                            </li>
                            {subject.syllabusFilePath && (
                                <li>
                                    <button
                                        onClick={handleDownloadSyllabus}
                                        className="block w-full text-green-600 hover:underline"
                                    >
                                        Download Syllabus
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
