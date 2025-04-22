"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from '../(default)/layout';
import { useSearchParams } from "next/navigation";

export default function UserPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');

    const [formData, setFormData] = useState({
        id: '',
        userName: '',
        surname: '',
        email: '',
        description: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5117/api/User/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        id: data.id,
                        userName: data.userName,
                        surname: data.surname,
                        email: data.email,
                        description: data.descripton,
                    });
                } else {
                    alert("Failed to fetch user data");
                }
            } catch (err) {
                console.error(err);
                alert("Error connecting to server");
            }
        };

        fetchUser();
    }, [userId]);

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('http://localhost:5117/api/User', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: formData.id,
                    userName: formData.userName,
                    surname: formData.surname,
                    email: formData.email,
                    description: formData.description
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert("Changes saved!");
                setFormData(data); // обновим всё сразу
                setIsEditing(false);
            } else {
                const errorData = await response.json();
                alert(`Failed to update: ${errorData.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error updating user");
        }
    };

    return (
        <DefaultLayout>
            <div className="relative">
                <div className="h-64 w-full bg-cover bg-center" />

                <div className="max-w-5xl mx-auto px-4 -mt-20">
                    <div className="bg-white shadow-lg rounded-xl p-6 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md" />
                            <div className="mt-4 md:mt-0">
                                <h1 className="text-2xl font-bold">{formData.userName} {formData.surname}</h1>
                                <p className="text-gray-600">{formData.email}</p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.userName}
                                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                ) : (
                                    <p className="font-medium">{formData.userName}</p>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Surname</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.surname}
                                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                ) : (
                                    <p className="font-medium">{formData.surname}</p>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                ) : (
                                    <p className="font-medium">{formData.email}</p>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Description</p>
                                {isEditing ? (
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full h-24 border border-gray-300 p-2 rounded-md"
                                    />
                                ) : (
                                    <p className="font-medium">{formData.description || "No description yet"}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
