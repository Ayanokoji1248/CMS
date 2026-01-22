import Link from "next/link";
import {
    Eye,
    Power,
    Mail,
} from "lucide-react";
import clsx from "clsx";
import AddStudent from "@/app/components/student/AddStudent";
import { BACKEND_URL } from "@/app/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentProps } from "@/app/interface";

export default async function StudentPage() {

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token");

    if (!token) {
        redirect('/')
    }

    const studentRes = await fetch(`${BACKEND_URL}/student`, {
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

    const departments = await departmentRes.json()
    const students = await studentRes.json();

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    const getSemesterInitial = (enr: number) => {
        if (enr === 1) {
            return "st"
        }
        if (enr === 2) {
            return "nd"
        }
        if (enr === 3) {
            return "rd"
        }
        return "th"

    }


    return (
        <div className="space-y-6 relative">
            {/* --- Page Header --- */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-100">Students</h2>
                    <p className="text-sm text-zinc-400">Manage student enrollments and records.</p>
                </div>

                <AddStudent departments={departments} />
            </div>

            {/* --- Search Bar --- */}
            {/* <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or enrollment no..."
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
                            <th className="px-6 py-4">Student Name</th>
                            <th className="px-6 py-4 hidden md:table-cell">Email</th>
                            <th className="px-6 py-4">Enrollment No</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Sem</th>
                            <th className="px-6 py-4 hidden lg:table-cell">Department</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {students.map((student: StudentProps) => (
                            <tr
                                key={student.id}
                                className="group hover:bg-zinc-800/30 transition-colors duration-200"
                            >
                                {/* Name + Avatar */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300 ring-2 ring-zinc-900">
                                            {getInitials(student.full_name)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-zinc-200">{student.full_name}</span>
                                            <span className="md:hidden text-xs text-zinc-500">{student.email}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Email (Desktop) */}
                                <td className="px-6 py-4 hidden md:table-cell text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-zinc-600" />
                                        {student.email}
                                    </div>
                                </td>

                                {/* Enrollment No */}
                                <td className="px-6 py-4 font-mono text-zinc-300">
                                    {student.enrollment_no}
                                </td>

                                {/* Semester */}
                                <td className="px-6 py-4 hidden sm:table-cell">
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium text-zinc-200">{student.semester}{getSemesterInitial(student.semester)}</span>
                                    </div>
                                </td>

                                {/* Department */}
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <span className="inline-flex items-center rounded bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-zinc-700">
                                        {student.department.name}
                                    </span>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-4">
                                    <span
                                        className={clsx(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                            student.is_active
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}
                                    >
                                        {student.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/students/${student.id}`}
                                            title="View Details"
                                            className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-indigo-400 transition-colors"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <button
                                            title={student.is_active ? "Deactivate" : "Activate"}
                                            className={clsx(
                                                "rounded-md p-2 transition-colors",
                                                student.is_active
                                                    ? "text-zinc-400 hover:bg-zinc-800 hover:text-red-400"
                                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-emerald-400"
                                            )}
                                        >
                                            <Power size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {students.length === 0 && (
                    <div className="flex h-40 flex-col items-center justify-center text-zinc-500">
                        <p>No students found.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {/* <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                <p className="text-xs text-zinc-500">Showing {filteredStudents.length} of {students.length}</p>
                <div className="flex gap-2">
                    <button disabled className="rounded-md border border-zinc-800 px-3 py-1 text-xs text-zinc-600 cursor-not-allowed">Previous</button>
                    <button className="rounded-md border border-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-800">Next</button>
                </div>
            </div> */}


        </div>
    );
}