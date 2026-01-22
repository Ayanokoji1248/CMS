"use client"
import { addFaculty } from "@/app/(app)/faculty/action";
import { DepartmentProps } from "@/app/interface";
import clsx from "clsx";
import { Mail, Plus, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const designationsList = [
    "Head of Department",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Visiting Faculty",
    "Lab Assistant"
];

const AddFaculty = (
    { departments }: {
        departments: DepartmentProps[]
    }
) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const action = async (formData: FormData) => {
        const res = await addFaculty(formData)

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success("Faculty added successfully");

        setIsModalOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                <Plus size={16} />
                Add Faculty
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                            <h3 className="text-lg font-semibold text-zinc-100">Add Faculty Member</h3>
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
                                        placeholder="e.g. Dr. Jane Doe"
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
                                        type="email"
                                        required
                                        name="email"
                                        placeholder="e.g. jane.doe@school.edu"
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Department Dropdown */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Department</label>
                                <div className="relative">
                                    <select
                                        required
                                        defaultValue=""
                                        name="department_id"
                                        className={clsx(
                                            "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none",
                                        )}
                                    >
                                        <option value="" disabled hidden>Select Department</option>

                                        {departments
                                            .filter(dept => dept.is_active)
                                            .map(dept => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Designation Dropdown */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Designation</label>
                                <div className="relative">
                                    <select
                                        required
                                        name="designation"
                                        className={clsx(
                                            "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none",
                                        )}
                                    >
                                        <option defaultValue="" disabled hidden>Select Designation</option>
                                        {designationsList.map(desig => (
                                            <option key={desig} value={desig} className="bg-zinc-950 text-zinc-200">{desig}</option>
                                        ))}
                                    </select>
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
                                    Create Faculty
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddFaculty