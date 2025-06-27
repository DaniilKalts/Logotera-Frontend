// app/page.tsx или app/default/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero-home";
import Header from "@/components/ui/header";
import AdminDashboard from "@/app/admin/page";
import TeacherDashboard from "@/app/teacher/page";

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        setIsAuthenticated(!!token);
        setIsAdmin(role?.toLowerCase() === "admin");
        setIsTeacher(role?.toLowerCase() === "teacher");
    }, []);

    return (
        <>
            <Header />
            <div className="pt-20 px-12">
                {!isAuthenticated && <Hero />}

                {isAuthenticated && isAdmin && <AdminDashboard />}
                {isAuthenticated && isTeacher && <TeacherDashboard/>}

            </div>
        </>
    );
}
