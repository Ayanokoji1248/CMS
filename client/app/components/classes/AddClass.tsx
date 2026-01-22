"use client"
import { addClass } from '@/app/(app)/classes/action';
import { FacultyProps, SubjectProps } from '@/app/interface';
import clsx from 'clsx';
import { Plus, X } from 'lucide-react';
import { useState } from 'react'
import { toast } from 'sonner';

const academicYears = ["2022-2023", "2023-2024", "2024-2025"];
const AddClass = ({
    subjects,
    faculty
}: {
    subjects: SubjectProps[],
    faculty: FacultyProps[]
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const action = async (formData: FormData) => {
        const res = await addClass(formData);

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success("Class created successfully");

        setIsModalOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                <Plus size={16} />
                Create Class
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                            <h3 className="text-lg font-semibold text-zinc-100">Create New Class</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-500 hover:text-zinc-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form action={action} className="p-6 space-y-4">

                            {/* Subject Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Subject</label>
                                <div className="relative">
                                    <select
                                        required
                                        name="subject_id" // Added name for form submission
                                        defaultValue=""   // Moved defaultValue here
                                        className={clsx(
                                            "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none",
                                            "text-zinc-200" // <--- ADDED THIS CLASS
                                        )}
                                    >
                                        <option value="" disabled className="text-zinc-500">Select Subject</option>
                                        {subjects
                                            .filter(sub => sub.is_active)
                                            .map(sub => (
                                                <option key={sub.id} value={sub.id} className="bg-zinc-950 text-zinc-200">
                                                    {sub.name}
                                                </option>
                                            ))}
                                    </select>
                                    {/* Arrow Icon */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Faculty Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Faculty</label>
                                <div className="relative">
                                    <select
                                        required
                                        name="faculty_id" // Added name
                                        defaultValue=""
                                        className={clsx(
                                            "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none",
                                            "text-zinc-200" // <--- ADDED THIS CLASS
                                        )}
                                    >
                                        <option value="" disabled className="text-zinc-500">Assign Faculty</option>
                                        {faculty
                                            .filter(fac => fac.is_active)
                                            .map(fac => (
                                                <option key={fac.id} value={fac.id} className="bg-zinc-950 text-zinc-200">
                                                    {fac.full_name}
                                                </option>
                                            ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Row: Academic Year, Semester, Capacity */}
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Academic Year</label>
                                    <div className="relative">
                                        <select
                                            required
                                            name="academic_year" // Added name
                                            defaultValue=""
                                            className={clsx(
                                                "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none",
                                                "text-zinc-200"
                                            )}
                                        >
                                            <option value="" disabled className="text-zinc-500">Select Year</option>
                                            {academicYears.map(item => (
                                                <option key={item} value={item} className="bg-zinc-950 text-zinc-200">
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-24 space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Sem</label>
                                    <input
                                        type="number"
                                        name="semester" // Added name
                                        min={1}
                                        max={8}
                                        required
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="w-24 space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Capacity</label>
                                    <input
                                        type="number"
                                        name="capacity" // Added name
                                        min={1}
                                        required
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
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
                                    Create Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    )
}

export default AddClass