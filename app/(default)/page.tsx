// app/page.tsx или app/default/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero-home";
import Header from "@/components/ui/header";
import AdminDashboard from "@/app/admin/page";

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        setIsAuthenticated(!!token);
        setIsAdmin(role?.toLowerCase() === "admin");
    }, []);

    return (
        <>
            <Header />
            <div className="pt-20 px-4">
                {!isAuthenticated && <Hero />}

                {isAuthenticated && isAdmin && <AdminDashboard />}

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
