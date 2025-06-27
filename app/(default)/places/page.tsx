"use client";

import React from "react";
import dynamic from "next/dynamic";

import type { ReactNode } from "react";
import type { Location } from "../../ui/CityMap";
import Header from "@/components/ui/header";

const CityMap = dynamic(() => import("../../ui/CityMap"), {
    ssr: false,
});

type Clinic = {
    name: string;
    position: [number, number];
    phone: string;
    address: string;
};

export default function PlacesPage() {
    const clinics: Clinic[] = [
        {
            name: "Центр коррекции речи «Логомед»",
            position: [43.238949, 76.889709],
            phone: "+7 777 123 4567",
            address: "пр. Абая 52, Алматы",
        },
        {
            name: "Центр развития ребенка «Болашак»",
            position: [43.222015, 76.851248],
            phone: "+7 701 765 4321",
            address: "ул. Толе би 85, Алматы",
        },
        {
            name: "Республиканский центр раннего вмешательства",
            position: [43.238293, 76.945465],
            phone: "+7 702 999 0000",
            address: "ул. Гагарина 154, Алматы",
        },
    ];

    const locations: Location[] = clinics.map((c, idx) => ({
        id: `clinic-${idx + 1}`,
        position: c.position,
        label: (
            <>
                <strong>{c.name}</strong>
                <br />
                {c.address}
                <br />
                📞 {c.phone}
            </>
        ) as unknown as ReactNode,
    }));

    return (
        <>
            <Header />
            <div className="mt-32">
                <h1 className="text-2xl mb-4 font-bold">Логопедические Центры</h1>
                <div className="grid grid-cols-5 gap-12">
                    <div className="col-span-3">
                        <CityMap locations={locations} zoom={13} />
                    </div>
                    <div className="col-span-2 flex justify-between flex-col">
                        <ul className="space-y-6">
                            {clinics.map((clinic) => (
                                <li key={clinic.name} className="border-b pb-4">
                                    <h4 className="text-lg font-semibold">{clinic.name}</h4>
                                    <p className="text-sm">{clinic.address}</p>
                                    <p className="text-sm">📞 {clinic.phone}</p>
                                </li>
                            ))}
                        </ul>
                        <a
                            className="btn-sm bg-blue-700 py-2 text-base text-white shadow-sm hover:bg-blue-600"
                            href="https://t.me/+ENhYKnzzOC8xNTky"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Родительский Чат
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
