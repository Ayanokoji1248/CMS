"use client"
import { addStudent } from "@/app/(app)/student/action";
import { DepartmentProps } from "@/app/interface";
import clsx from "clsx";
import { Plus, X, User, Mail, GraduationCap, Hash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddStudent = ({ departments }: {
    departments: DepartmentProps[]
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const action = async (formData: FormData) => {
        const res = await addStudent(formData)

        if (!res.success) {
            toast.error(res.message);
            return
        }

        toast.success("Student added successfully");

        setIsModalOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                <Plus size={16} />
                Add Student
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                            <h3 className="text-lg font-semibold text-zinc-100">Add New Student</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-500 hover:text-zinc-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form action={action} className="p-6 space-y-4">

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <input
                                        type="text"
                                        required
                                        name="full_name"
                                        placeholder="e.g. Michael Scott"
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="e.g. michael@student.edu"
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Enrollment & Semester Row */}
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Enrollment No</label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                        <input
                                            name="enrollment_no"
                                            type="text"
                                            required
                                            placeholder="e.g. 2024CS001"
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className="w-32 space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Semester</label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                        <input
                                            name="semester"
                                            type="number"
                                            required
                                            min={1}
                                            max={12}
                                            placeholder="1"
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Department Dropdown */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Department</label>
                                <div className="relative">
                                    <select
                                        required
                                        name="department_id"
                                        className={clsx(
                                            "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none",
                                        )}
                                    >
                                        <option defaultValue="" disabled>Select Department</option>

                                        {departments
                                            .filter(dept => dept.is_active)
                                            .map(dept => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                    </select>
                                    {/* Custom Arrow Icon */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 rounded-lg border border-zinc-800 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                                >
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddStudent