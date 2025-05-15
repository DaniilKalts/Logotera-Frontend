"use client";

import React, { useState, useEffect } from "react";

export default function GroupManager() {
    const [groupName, setGroupName] = useState("");
    const [users, setUsers] = useState<{ id: number; firstName: string; lastName: string }[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [groups, setGroups] = useState<
        { id: number; name: string; members: { id: number; firstName: string; lastName: string }[] }[]
    >([]);
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:5117/api/User/all");
        const data = await res.json();
        setUsers(data);
    };

    const fetchGroups = async () => {
        const res = await fetch("http://localhost:5117/api/Group/all");
        const data = await res.json();
        setGroups(data);
    };

    const handleCreateGroup = async () => {
        if (!groupName || selectedUserIds.length === 0) return;

        const res = await fetch("http://localhost:5117/api/Group/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: groupName,
                userIds: selectedUserIds,
            }),
        });

        if (res.ok) {
            setGroupName("");
            setSelectedUserIds([]);
            await fetchGroups();
        }
    };

    const toggleUserSelection = (userId: number) => {
        setSelectedUserIds((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Group</h2>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Group Name</label>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <button
                    onClick={() => setShowUserModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Select Users
                </button>
                <div className="mt-2 text-sm text-gray-700">
                    Selected: {selectedUserIds.length} user(s)
                </div>
            </div>

            <button
                onClick={handleCreateGroup}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Create Group
            </button>

            {/* Modal for selecting users */}
            {showUserModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Select Users</h3>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => toggleUserSelection(user.id)}
                                    className={`p-2 border rounded cursor-pointer ${
                                        selectedUserIds.includes(user.id)
                                            ? "bg-blue-100 border-blue-400"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    {user.firstName} {user.lastName}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowUserModal(false)}
                            className="mt-4 text-sm text-gray-600 hover:underline"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Created Groups</h2>
                {groups.length === 0 ? (
                    <p className="text-gray-600">No groups created yet.</p>
                ) : (
                    groups.map((group) => (
                        <div key={group.id} className="mb-6 p-4 border rounded shadow">
                            <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
                            <ul className="list-disc list-inside text-sm">
                                {group.members.map((member) => (
                                    <li key={member.id}>
                                        {member.firstName} {member.lastName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
