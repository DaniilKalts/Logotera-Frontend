"use client";

import Link from "next/link";
import AdminUserlist from "@/components/ui/admin-userlist";

export default function AdminDashboard() {
    return (
        <div className="py-10 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
                Добро пожаловать, Администратор
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <Link
                    href="/group"
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-700 transition text-center"
                >
                    + Создать группу
                </Link>
                <Link
                    href="/subject"
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-700 transition text-center"
                >
                    + Создать предмет
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
                <AdminUserlist />
            </div>
        </div>
    );
}
