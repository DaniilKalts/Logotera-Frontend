"use client";

import React, {useEffect, useState} from "react";
import DefaultLayout from '../(default)/layout';
import {useSearchParams} from "next/navigation";

export default function UserPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id'); // Получаем ID из query

    const [formData, setFormData] = useState({
        id: '',
        userName: '',
        surname: '',
        email: '',
        description: ''
    });

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
                    console.log("Fetched data:", data);
                    setFormData({
                        id: data.id,
                        userName: data.userName,
                        surname: data.surname,
                        email: data.email,
                        description: data.description,
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

    const handleUpdateDescription = async () => {
        try {
            const response = await fetch(`http://localhost:5117/api/User/${userId}?description=${formData.description}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: formData.description
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert("Description updated!");
                setFormData(prev => ({ ...prev, description: data.description }));
            } else {
                alert("Failed to update description");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating description");
        }
    };


    return (
        <DefaultLayout>
            <div className="relative">
                <div className="h-64 w-full bg-cover bg-center"/>

                <div className="max-w-5xl mx-auto px-4 -mt-20">
                    <div className="bg-white shadow-lg rounded-xl p-6 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                                {/*<img src="/default-avatar.png" alt="Avatar" className="w-full h-full object-cover" />*/}
                            </div>

                            <div className="mt-4 md:mt-0">
                                <h1 className="text-2xl font-bold">{formData.userName} {formData.surname}</h1>
                                <p className="text-gray-600">{formData.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{formData.userName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Surname</p>
                                <p className="font-medium">{formData.surname}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{formData.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Description</p>
                                <p className="font-medium">{formData.description || "No description yet"}</p>
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-2">Introduction</h2>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Write something about yourself..."
                                className="w-full h-32 border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <button
                            onClick={handleUpdateDescription}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            Save Description
                        </button>
                        <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
                            <h2 className="text-lg font-semibold mb-2">Tools & Projects</h2>
                            <p className="text-gray-500 text-sm">Add your current stack or link to project
                                calculator/tools.</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                Open Tool
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
