import Link from "next/link";
import {
    Eye,
    Power,
    Mail,
    GraduationCap
} from "lucide-react";
import clsx from "clsx";
import AddFaculty from "@/app/components/faculty/AddFaculty";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/app/lib";
import { redirect } from "next/navigation";
import { FacultyProps } from "@/app/interface";
import { toggleFacultyStatus } from "./action";







export default async function FacultyPage() {

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")

    if (!token) {
        redirect('/')
    }

    const facultyRes = await fetch(`${BACKEND_URL}/faculty`, {
        method: "GET",
        headers: {
            Cookie: `access_token=${token.value}`
        },
        cache: "no-store"
    })

    const departmentRes = await fetch(`${BACKEND_URL}/department`, {
        method: "GET",
        headers: {
            Cookie: `access_token=${token?.value}`
        },
        cache: "no-store"
    })

    const faculty = await facultyRes.json()
    const departments = await departmentRes.json()


    // Helper to get initials for Avatar
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };


    return (
        <div className="space-y-6 relative">
            {/* --- Page Header --- */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-100">Faculty Members</h2>
                    <p className="text-sm text-zinc-400">Manage teaching staff and designations.</p>
                </div>
                <AddFaculty departments={departments} />
            </div>

            {/* --- Search Bar --- */}
            {/* <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
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
                            <th className="px-6 py-4">Faculty Name</th>
                            <th className="px-6 py-4 hidden md:table-cell">Email</th>
                            <th className="px-6 py-4 hidden md:table-cell">Department</th>
                            <th className="px-6 py-4 hidden lg:table-cell">Designation</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {faculty.map((fac: FacultyProps) => (
                            <tr
                                key={fac.id}
                                className="group hover:bg-zinc-800/30 transition-colors duration-200"
                            >
                                {/* Name + Avatar */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300 ring-2 ring-zinc-900">
                                            {getInitials(fac.full_name)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-zinc-200">{fac.full_name}</span>
                                            {/* Show email under name on mobile */}
                                            <span className="md:hidden text-xs text-zinc-500">{fac.email}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-6 py-4 hidden md:table-cell text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-zinc-600" />
                                        {fac.email}
                                    </div>
                                </td>

                                {/* Department */}
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="inline-flex items-center rounded bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-zinc-700">
                                        {fac.department.name}
                                    </span>
                                </td>

                                {/* Designation */}
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <GraduationCap size={14} className="text-zinc-600" />
                                        {fac.designation}
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={clsx(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                            fac.is_active ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}
                                    >
                                        {fac.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/faculty/${fac.id}`}
                                            title="View Profile"
                                            className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-indigo-400 transition-colors"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <form action={toggleFacultyStatus}>
                                            <input type="hidden" name="id" value={fac.id} />
                                            <button
                                                type="submit"
                                                title={fac.is_active ? "Deactivate Account" : "Activate Account"}
                                                className={clsx(
                                                    "rounded-md p-2 transition-colors",
                                                    fac.is_active
                                                        ? "text-zinc-400 hover:bg-zinc-800 hover:text-red-400"
                                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-emerald-400"
                                                )}
                                            >
                                                <Power size={18} />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {faculty.length === 0 && (
                    <div className="flex h-40 flex-col items-center justify-center text-zinc-500">
                        <p>No faculty members found.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {/* <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                <p className="text-xs text-zinc-500">Showing {filteredFaculty.length} of {facultyList.length}</p>
                <div className="flex gap-2">
                    <button disabled className="rounded-md border border-zinc-800 px-3 py-1 text-xs text-zinc-600 cursor-not-allowed">Previous</button>
                    <button className="rounded-md border border-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-800">Next</button>
                </div>
            </div> */}

            {/* --- ADD FACULTY MODAL --- */}


        </div>
    );
}