'use client'

import { useEffect, useState } from "react";
import DefaultLayout from "../(default)/layout";

export default function CreateSubjectPage() {
    const [subjectName, setSubjectName] = useState("");
    const [subjects, setSubjects] = useState<
        {
            id: number;
            name: string;
            lecturers: {id: number,firstName: string; lastName: string }[];
            practiceTeachers: {id: number,firstName: string; lastName: string }[];
            groups: {id:number, name: string }[];
        }[]
    >([]);
    const [lecturers, setLecturers] = useState<{ id: string; name: string ; surname: string }[]>([]);
    const [practiceTeachers, setPracticeTeachers] = useState<{ id: string; name: string ; surname: string}[]>([]);
    const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
    const [showLecturerModal, setShowLecturerModal] = useState(false);
    const [showPracticeModal, setShowPracticeModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);

    useEffect(() => {
        fetchLecturers();
        fetchPracticeTeachers();
        fetchGroups();
        fetchSubjects();
    }, []);

    const fetchLecturers = async () => {
        const res = await fetch("http://localhost:5117/api/User/subject/list/teachers");
        const data = await res.json();
        const mapped = data.map((d: any) => ({
            id: d.id,
            name: `${d.userName} ${d.surname}`
        }));
        setLecturers(mapped);
        console.log(data);
    };

    const fetchPracticeTeachers = async () => {
        const res = await fetch("http://localhost:5117/api/User/subject/list/teachers");
        const data = await res.json();
        const mapped = data.map((d: any) => ({
            id: d.id,
            name: `${d.userName} ${d.surname}`
        }));
        setPracticeTeachers(mapped);
    };

    const fetchGroups = async () => {
        const res = await fetch("http://localhost:5117/api/User/list/groups");
        const data = await res.json();
        console.log("groups", data);
        setGroups(data);
    };

    const fetchSubjects = async () => {
        try {
            const res = await fetch("http://localhost:5117/api/User/subject/list");
            const data = await res.json();

            // Приводим данные к нужной структуре
            const fixedData = data.map((subj: any) => ({
                ...subj,
                lecturers: subj.lecturerTeacher ? [subj.lecturerTeacher] : [],
                practiceTeachers: subj.practiceTeacher ? [subj.practiceTeacher] : [],
                groups: subj.groups || [],
            }));

            setSubjects(fixedData);
            console.log("subjects", fixedData);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleAddSubject = async () => {
        if (!subjectName.trim()) return;
        const res = await fetch("http://localhost:5117/api/User/subject", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({SubjectName: subjectName}),
        });
        if (res.ok) {
            await fetchSubjects();
            setSubjectName("");
        }
    };

    const deleteSubject = async (id: number) => {
        await fetch(`http://localhost:5117/api/User/subject/delete${id}`, {method: "DELETE"});
        await fetchSubjects();
        setSelectedSubject(null);
    };

    const addTeacherToSubject = async (teacherId: string, subjectRole: "Lecturer" | "Practitioner") => {
        if (selectedSubject === null) return;

        const subject = subjects[selectedSubject];

        const res = await fetch("http://localhost:5117/api/User/subject/addTeacher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId : teacherId,
                subjectId: subject.id,
                subjectRole: subjectRole
            })
        });
        console.log(teacherId, subject.id, subjectRole);

        if (res.ok) {
            await fetchSubjects();
        }

        setShowLecturerModal(false);
        setShowPracticeModal(false);
    };

    const addGroupToSubject = async (groupId: number) => {
        if (selectedSubject === null) return;

        const subject = subjects[selectedSubject];

        const res = await fetch("http://localhost:5117/api/User/subject/addGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                groupId: groupId,
                subjectId: subject.id,
            })
        });

        if (res.ok) {
            await fetchSubjects();
        }

        setShowGroupModal(false);
    };

    const removeTeacherFromSubject = async (
        userId: number,
        subjectRole: "Lecturer" | "Practitioner"
    ) => {
        if (selectedSubject === null) return;
        const subject = subjects[selectedSubject];

        const res = await fetch("http://localhost:5117/api/User/subject/deleteTeacher", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teacherId: userId,
                subjectId: subject.id,
                subjectRole: subjectRole,
            }),

        });
        console.log(userId, subject.id, subjectRole );
        if (res.ok) {
            await fetchSubjects();
        }
    };

    const removeGroupFromSubject = async (groupId: number) => {
        if (selectedSubject === null) return;
        const subject = subjects[selectedSubject];

        const res = await fetch("http://localhost:5117/api/User/subject/deleteGroup", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                groupId: groupId,
                subjectId: subject.id,
            }),
        });
        console.log(groupId, subject.id)

        if (res.ok) {
            await fetchSubjects();
        }
    };


    return (
        <DefaultLayout>
            <div className="max-w-4xl mx-auto pt-32 px-4">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Create a Subject</h1>

                <div className="bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <input
                            type="text"
                            placeholder="Enter subject name"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <button
                            onClick={handleAddSubject}
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Add Subject
                        </button>
                    </div>
                </div>

                {subjects.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                        {subjects.map((subj, index) => (
                            <div
                                key={subj.id}
                                onClick={() => setSelectedSubject(index)}
                                className="cursor-pointer border border-gray-200 rounded-2xl p-6 bg-white shadow hover:shadow-md transition text-center"
                            >
                                <h3 className="text-xl font-medium text-gray-800">{subj.name}</h3>
                            </div>
                        ))}
                    </div>
                )}

                {selectedSubject !== null && subjects[selectedSubject] && (
                    <div className="mt-10 p-8 border border-gray-200 rounded-2xl bg-gray-50 shadow-inner relative">
                        <button
                            onClick={() => setSelectedSubject(null)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            {subjects[selectedSubject].name}
                        </h2>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Lecturer:</h3>
                            <ul className="list-disc list-inside">
                                {subjects[selectedSubject].lecturers.map((lec) => (
                                    <li key={lec.id} className="flex justify-between items-center">
                                        {lec.firstName} {lec.lastName}
                                        <button
                                            onClick={() => removeTeacherFromSubject(lec.id, "Lecturer")}
                                            className="ml-4 text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {subjects[selectedSubject].lecturers.length === 0 && (
                                <button
                                    onClick={() => setShowLecturerModal(true)}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                >
                                    + Add Lecturer
                                </button>
                            )}
                        </div>



                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Practice Teachers:</h3>
                            <ul className="list-disc list-inside">
                                {subjects[selectedSubject].practiceTeachers.map((pt, idx) => (
                                    <li key={idx} className="flex justify-between items-center">
                                        {pt.firstName} {pt.lastName}
                                        <button
                                            onClick={() => removeTeacherFromSubject(pt.id, "Practitioner")}
                                            className="ml-4 text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {subjects[selectedSubject].practiceTeachers.length === 0 && (
                                <button
                                    onClick={() => setShowPracticeModal(true)}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                >
                                    + Add Practice Teacher
                                </button>
                            )}
                        </div>




                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Groups:</h3>
                            <ul className="list-disc list-inside">
                                {subjects[selectedSubject].groups.map((pt, idx) => (
                                    <li key={idx} className="flex justify-between items-center">
                                        {pt.name}
                                        <button
                                            onClick={() => removeGroupFromSubject(pt.id)}
                                            className="ml-4 text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}

                            </ul>
                            <button
                                onClick={() => setShowGroupModal(true)}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                + Add Group
                            </button>
                        </div>

                        <button
                            onClick={() => deleteSubject(subjects[selectedSubject].id)}
                            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete Subject
                        </button>
                    </div>
                )}

                {/* Lecturer Modal */}
                {showLecturerModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Select Lecturer</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {lecturers.map((lec) => (
                                    <button
                                        key={lec.id}
                                        onClick={() => addTeacherToSubject(lec.id,"Lecturer")}
                                        className="p-2 border border-gray-300 rounded hover:bg-gray-100 text-left"
                                    >
                                        {lec.name}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowLecturerModal(false)}
                                className="mt-4 text-sm text-gray-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Practice Modal */}
                {showPracticeModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Select Practice Teacher</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {practiceTeachers.map((pt) => (
                                    <button
                                        key={pt.id}
                                        onClick={() => addTeacherToSubject(pt.id, "Practitioner")}
                                        className="p-2 border border-gray-300 rounded hover:bg-gray-100 text-left"
                                    >
                                        {pt.name}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowPracticeModal(false)}
                                className="mt-4 text-sm text-gray-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Group Modal */}
                {showGroupModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Select Group</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {groups.map((gr) => (
                                    <button
                                        key={gr.id}
                                        onClick={() => addGroupToSubject(gr.id)}
                                        className="p-2 border border-gray-300 rounded hover:bg-gray-100 text-left"
                                    >
                                        {gr.name}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowGroupModal(false)}
                                className="mt-4 text-sm text-gray-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
