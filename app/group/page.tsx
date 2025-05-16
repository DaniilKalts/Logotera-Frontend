"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "../(default)/layout";

type Student = {
    studentId: number;
    name: string;
    surname: string;
};

type StudentForModal = {
    id: number;
    name: string;
    surname: string;
};



type Group = {
    id: number;
    name: string;
    students: Student[];
};

export default function CreateSubjectPage() {
    const [groupName, setGroupName] = useState("");
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [allStudents, setAllStudents] = useState<StudentForModal[]>([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    // Получаем список групп с сервера
    const fetchGroups = async () => {
        try {
            const res = await fetch("http://localhost:5117/api/User/list/groups");
            const data = await res.json();

            const fixedData: Group[] = data.map((group: any) => ({
                id: group.id,
                name: group.name,
                students: group.students || [],
            }));

            setGroups(fixedData);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    // Получаем всех студентов для модалки добавления
    const fetchAllStudents = async () => {
        try {
            const res = await fetch("http://localhost:5117/api/User/group/list/students");
            const data = await res.json();

            // Преобразуем studentId в id
            const students = data.map((student: any) => ({
                id: student.studentId,
                name: student.name,
                surname: student.surname,
            }));

            setAllStudents(students);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };


    // Добавление группы
    const handleAddGroup = async () => {
        if (!groupName.trim()) return;

        const res = await fetch("http://localhost:5117/api/User/group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: groupName }),
        });

        if (res.ok) {
            await fetchGroups();
            setGroupName("");
        }
    };

    // Удаление группы
    const deleteGroup = async (id: number) => {
        await fetch(`http://localhost:5117/api/User/group/delete?groupId=${id}`, {
            method: "DELETE",
        });

        await fetchGroups();
        setSelectedGroup(null);
    };

    const removeStudentFromGroup = async (groupId: number, studentId: number) => {
        await fetch(`http://localhost:5117/api/User/groups/assign-students/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                groupId: groupId,
                studentIds: [studentId],
            }),
        });
        console.log(groupId, studentId);
        await fetchGroups();
    };

    // Добавление студента в группу (по одному)
    const addStudentToGroup = async (groupId: number, studentId: number) => {
        try {
            const res = await fetch("http://localhost:5117/api/User/groups/assign-students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    groupId: groupId,
                    studentIds: [studentId],
                }),
            });
            console.log(groupId, studentId)

            if (!res.ok) {
                throw new Error("Failed to add student");
            }

            await fetchGroups();
            setShowAddStudentModal(false);
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    // Открываем модалку и загружаем всех студентов
    const openAddStudentModal = () => {
        if (selectedGroup === null) return;
        fetchAllStudents();
        setShowAddStudentModal(true);
    };

    return (
        <DefaultLayout>
            <div className="max-w-4xl mx-auto pt-32 px-4">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Create a Group</h1>

                {/* Input to add group */}
                <div className="bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <input
                            type="text"
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <button
                            onClick={handleAddGroup}
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Add Group
                        </button>
                    </div>
                </div>

                {/* List of groups */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            onClick={() => setSelectedGroup(group.id)}
                            className="cursor-pointer border border-gray-200 rounded-2xl p-6 bg-white shadow hover:shadow-md transition text-center"
                        >
                            <h3 className="text-xl font-medium text-gray-800">{group.name}</h3>
                        </div>
                    ))}
                </div>

                {/* Group details */}
                {selectedGroup !== null && (
                    <div className="mt-10 p-8 border border-gray-200 rounded-2xl bg-gray-50 shadow-inner relative">
                        <button
                            onClick={() => setSelectedGroup(null)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            {groups.find((g) => g.id === selectedGroup)?.name}
                        </h2>

                        <div>
                            <h3 className="font-semibold mb-2">Students:</h3>
                            <ul className="list-disc list-inside">
                                {groups
                                    .find((g) => g.id === selectedGroup)
                                    ?.students.map((student) => (
                                        <li key={student.studentId} className="flex justify-between items-center">
                                            {student.name} {student.surname}
                                            <button
                                                onClick={() => removeStudentFromGroup(selectedGroup, student.studentId)}
                                                className="ml-4 text-red-500 text-sm hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                            </ul>

                            {groups.find((g) => g.id === selectedGroup)?.students.length === 0 && (
                                <p className="text-sm text-gray-500">No students in this group.</p>
                            )}

                            {/* Кнопка открытия модалки добавления студента */}
                            <button
                                onClick={openAddStudentModal}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                + Add Student
                            </button>
                        </div>

                        {/* Удалить группу */}
                        <button
                            onClick={() => deleteGroup(selectedGroup)}
                            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete Group
                        </button>
                    </div>
                )}

                {/* Модалка выбора студента */}
                {showAddStudentModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg max-h-[80vh] overflow-auto">
                            <h3 className="text-xl font-semibold mb-4">Select Student</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {allStudents.map((student) => (
                                    <button
                                        key={student.id}
                                        onClick={() => {
                                            if (selectedGroup === null) return;
                                            addStudentToGroup(selectedGroup, student.id);
                                        }}
                                        className="p-2 border border-gray-300 rounded hover:bg-gray-100 text-left"
                                    >
                                        {student.name} {student.surname}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowAddStudentModal(false)}
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
