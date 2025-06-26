"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from '../(default)/layout';
import { useSearchParams } from "next/navigation";

export default function UserPage() {

    const [formData, setFormData] = useState({
        id: '',
        userName: '',
        surname: '',
        email: '',
        description: '',
        imageUrl: ''
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        console.log(token);
        try {
            const response = await fetch(`http://localhost:5117/api/User/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log(token);
                const data = await response.json();
                setFormData({
                    id: data.id,
                    userName: data.userName,
                    surname: data.surname,
                    email: data.email,
                    description: data.description,
                    imageUrl: data.imageUrl || ''
                });
            } else {
                alert("Failed to fetch user data");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }

    };

    const handleSaveChanges = async () => {
        try {
            const form = new FormData();
            form.append("id", formData.id);
            form.append("userName", formData.userName);
            form.append("surname", formData.surname);
            form.append("email", formData.email);
            form.append("description", formData.description || '');
            if (imageFile) {
                form.append("image", imageFile);
            }

            const response = await fetch("http://localhost:5117/api/User", {
                method: "PUT",
                body: form
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({
                    ...formData,
                    imageUrl: data.imageUrl || formData.imageUrl
                });
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <DefaultLayout>
            <div className="relative">
                <div className="h-64 w-full bg-cover bg-center" />

                <div className="max-w-5xl mx-auto px-4 -mt-20">
                    <div className="bg-white shadow-lg rounded-xl p-6 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                                {isEditing && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        title="Change Avatar"
                                    />
                                )}
                            </div>
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
                                        readOnly
                                        className="w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed"
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
                    <div className=" mt-8 card w-96 bg-white shadow-xl p-6">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold mb-4">Progress</h2>
                            <div
                                className="radial-progress text-blue-600"
                                style={
                                    {
                                        "--value": 70,
                                        "--size": "12rem",
                                        "--thickness": "2rem"
                                    } as React.CSSProperties
                                }
                                role="progressbar"
                                aria-valuenow={70}
                            >
                                70%
                            </div>
                            <p className="mt-4 text-gray-600">You’ve completed 70% of your goal!</p>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
