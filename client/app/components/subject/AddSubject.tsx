"use client"
import { addDepartment } from '@/app/(app)/department/actions';
import { DepartmentProps } from '@/app/interface';
import { Plus, X } from 'lucide-react';
import { useState } from 'react'
import { toast } from 'sonner';
import { createSubject } from '../../(app)/subject/action';

const AddSubject = ({ departments }: { departments: DepartmentProps[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const action = async (formData: FormData) => {
        const res = await createSubject(formData);

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success("Subject added successfully");

        setIsModalOpen(false)
    };
    // console.log(departments)
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
                <Plus size={16} />
                Add Subject
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                            <h3 className="text-lg font-semibold text-zinc-100">Add New Subject</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-500 hover:text-zinc-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form action={action} className="p-6 space-y-4">

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Subject Name</label>
                                <input
                                    type="text"
                                    required
                                    name='name'
                                    placeholder="e.g. Advanced Calculus"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Code & Credits Row */}
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Subject Code</label>
                                    <input
                                        type="text"
                                        required
                                        name='code'
                                        placeholder="e.g. MATH-302"
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="w-24 space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Credits</label>
                                    <input
                                        type="number"
                                        required
                                        name='credits'
                                        min={1}
                                        max={10}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Department Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Department</label>
                                <select
                                    required
                                    defaultValue=""
                                    name="department_id"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
                                >
                                    <option value="" disabled hidden>
                                        Select Department
                                    </option>

                                    {departments
                                        .filter(dept => dept.is_active)
                                        .map(dept => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}   {/* ✅ string */}
                                            </option>
                                        ))}
                                </select>


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
                                    Add Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddSubject