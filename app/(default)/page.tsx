"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero-home";
import AdminUserlist from "@/components/admin-userlist";
import Header from "@/components/ui/header"; // Убедитесь, что Header импортируется

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token) {
            setIsAuthenticated(true);  // Если токен есть, пользователь авторизован
        } else {
            setIsAuthenticated(false);
        }

        if (role === "Admin" || role === "admin") {
            setIsAdmin(true);  // Если роль Admin, то показываем админский интерфейс
        } else {
            setIsAdmin(false);
        }
    }, []);

    return (
        <>
            <Header /> {/* Добавлен Header компонент сверху */}

            <div className="pt-20 px-4"> {/* Добавлены отступы сверху для контента, чтобы не перекрывать хедер */}
                {!isAuthenticated && <Hero />} {/* Показываем Hero, если не авторизован */}

                {isAuthenticated && isAdmin && (
                    <div className="py-6">
                        <h2 className="text-3xl font-bold text-green-600 mb-4">
                            Welcome, Admin!
                        </h2>
                        <AdminUserlist />
                    </div>
                )}

                {isAuthenticated && !isAdmin && (
                    <div className="py-6">
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">
                            Welcome, User!
                        </h2>
                    </div>
                )}
            </div>
        </>
    );
}
