import Link from "next/link";
import {
    Eye,
    Calendar,
    Users,
    BookOpen,
    GraduationCap,
    Power
} from "lucide-react";
import clsx from "clsx";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "@/app/lib";
import AddClass from "@/app/components/classes/AddClass";
import { toggleClassStatus } from "./action";
import { ClassProps } from "@/app/interface";


export default async function ClassPage() {

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")

    if (!token) {
        redirect('/')
    }

    const classRes = await fetch(`${BACKEND_URL}/class`, {
        method: "GET",
        headers: {
            Cookie: `access_token=${token.value}`
        },
        cache: "no-store"
    })

    const classes = await classRes.json();

    const subjectRes = await fetch(`${BACKEND_URL}/subject`, {
        method: "GET",
        headers: {
            Cookie: `access_token=${token.value}`
        },
        cache: "no-store"
    })
    const subjects = await subjectRes.json()

    const facultyRes = await fetch(`${BACKEND_URL}/faculty`, {
        method: "GET",
        headers: {
            Cookie: `access_token=${token.value}`
        },
        cache: "no-store"
    })

    const faculty = await facultyRes.json();

    return (
        <div className="space-y-6 relative">
            {/* --- Page Header --- */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-100">Class Management</h2>
                    <p className="text-sm text-zinc-400">Schedule classes and monitor capacity.</p>
                </div>
                <AddClass subjects={subjects} faculty={faculty} />
            </div>

            {/* --- Search Bar --- */}
            {/* <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by subject or faculty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800">
                    <Filter size={16} />
                    Filter
                </button>
            </div> */}

            {/* --- Data Table --- */}
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="border-b border-zinc-800 bg-zinc-900/50 text-xs uppercase font-medium text-zinc-500">
                        <tr>
                            <th className="px-6 py-4">Subject Info</th>
                            <th className="px-6 py-4 hidden md:table-cell">Faculty</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Details</th>
                            <th className="px-6 py-4 min-w-[140px]">Capacity</th>
                            <th className="px-6 py-4 hidden lg:table-cell">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {classes.map((cls:ClassProps) => (
                            <tr
                                key={cls.id}
                                className="group hover:bg-zinc-800/30 transition-colors duration-200"
                            >
                                {/* Subject */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-indigo-400">
                                            <BookOpen size={18} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-zinc-200">{cls.subject.name}</div>
                                            <div className="text-xs text-zinc-500 font-mono">{cls.subject.code}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Faculty */}
                                <td className="px-6 py-4 hidden md:table-cell text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className="text-zinc-600" />
                                        {cls.faculty.full_name}
                                    </div>
                                </td>

                                {/* Details (Sem + Year) */}
                                <td className="px-6 py-4 hidden sm:table-cell">
                                    <div className="flex flex-col gap-1">
                                        <span className="flex items-center gap-1.5 text-xs text-zinc-300">
                                            <Calendar size={12} className="text-zinc-500" />
                                            {cls.academic_year}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                                            <GraduationCap size={12} />
                                            Sem {cls.semester}
                                        </span>
                                    </div>
                                </td>

                                {/* Capacity Progress Bar */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-medium text-zinc-300">{cls.capacity}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <span className={clsx(
                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                        cls.is_active ?
                                            "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                            :
                                            "bg-indigo-500/10 text-red-400 border-red-500/20"
                                    )}
                                    >
                                        {cls.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Actions */}
                                < td className="px-6 py-4 text-right" >
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/classes/${cls.id}`}
                                            className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-indigo-400 transition-colors"
                                        >
                                            <Eye size={18} />
                                        </Link>

                                        <form action={toggleClassStatus}>
                                            <input type="hidden" value={cls.id} name="id" />
                                            <button className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
                                                <Power size={18} />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {
                    classes.length === 0 && (
                        <div className="flex h-40 flex-col items-center justify-center text-zinc-500">
                            <p>No classes found.</p>
                        </div>
                    )
                }
            </div >

        </div >
    );
}
