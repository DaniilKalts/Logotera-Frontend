// components/admin/AdminDashboard.tsx
"use client";

import { useRouter } from "next/navigation";
import AdminUserlist from "@/app/admin/admin-userlist";

export default function AdminDashboard() {
    const router = useRouter();

    const handleCreateGroup = () => {
        router.push("/admin/create-group");
    };

    const handleCreateSubject = () => {
        router.push("/admin/create-subject");
    };

    return (
        <div className="py-10 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
                Welcome, Admin
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <button
                    onClick={handleCreateGroup}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-700 transition"
                >
                    + Create Group
                </button>
                <button
                    onClick={handleCreateSubject}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-700 transition"
                >
                    + Create Subject
                </button>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
                <AdminUserlist />
            </div>
        </div>
    );
}
