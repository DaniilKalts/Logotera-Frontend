"use client";

import { useEffect, useState } from "react";

interface User {
    id: string;
    userName?: string;
    email: string;
}

export default function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Token not found. Please log in.");
            setLoading(false);
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5117/api/User/users", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data: User[] = await response.json();
                    setUsers(data);
                } else {
                    alert("Failed to fetch users.");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Error connecting to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token not found. Please log in.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5117/api/User/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                alert("User deleted successfully.");
            } else {
                alert("Failed to delete user.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Error connecting to server.");
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="mt-10 space-y-4">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">User List</h2>
            {users.length === 0 ? (
                <p className="text-center text-gray-600">No users found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                                <h3 className="text-lg font-semibold text-gray-800">{user.userName || user.email}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
