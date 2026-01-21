import Link from "next/link";
import {
    Eye,
    Power,
} from "lucide-react";
import clsx from "clsx";
import ToggleButton from "@/app/components/department/ToggleButton";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/app/lib";
import AddDepartment from "@/app/components/department/AddDepartment";
import { DepartmentProps } from "@/app/interface";
import { toggleDepartmentStatus } from "./actions";


export default async function DepartmentPage() {


    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")


    const departmentRes = await fetch(`${BACKEND_URL}/department`, {
        method: "GET",
        headers: {
            Cookie: `access_token=${token?.value}`
        },
        cache: "no-store"
    })

    const departments = (await departmentRes.json()) ?? []


    return (
        <div className="space-y-6 relative">
            {/* --- Page Header --- */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-100">Departments</h2>
                    <p className="text-sm text-zinc-400">Manage school departments and faculties.</p>
                </div>

                <AddDepartment />

            </div>

            {/* --- Filters & Search Bar --- */}
            {/* <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or code..."
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
                            <th className="px-6 py-4">Department Name</th>
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {departments.map((dept: DepartmentProps) => (
                            <tr
                                key={dept.id}
                                className="group hover:bg-zinc-800/30 transition-colors duration-200"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-medium text-zinc-200">{dept.name}</div>
                                </td>
                                <td className="px-6 py-4 font-mono text-zinc-500">{dept.code}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={clsx(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                            dept.is_active
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}
                                    >
                                        {dept.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/departments/${dept.id}`}
                                            title="View Details"
                                            className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-indigo-400 transition-colors"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <form action={toggleDepartmentStatus}>
                                            <input type="hidden" name="id" value={dept.id} />

                                            <button
                                                type="submit"
                                                title={dept.is_active ? "Deactivate" : "Activate"}
                                                className={clsx(
                                                    "rounded-md p-2 transition-colors",
                                                    dept.is_active
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

                {departments.length === 0 && (
                    <div className="flex h-40 flex-col items-center justify-center text-zinc-500">
                        <p>No departments found.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {/* <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                <p className="text-xs text-zinc-500">Showing {filteredDepartments.length} of {departments.length}</p>
                <div className="flex gap-2">
                    <button disabled className="rounded-md border border-zinc-800 px-3 py-1 text-xs text-zinc-600 cursor-not-allowed">Previous</button>
                    <button className="rounded-md border border-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-800">Next</button>
                </div>
            </div> */}

            {/* --- ADD DEPARTMENT MODAL --- */}

        </div>
    );
}
