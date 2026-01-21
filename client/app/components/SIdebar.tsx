"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    BookOpen,
    GraduationCap,
    Users,
    School,
    FileText,
    LogOut,
    Settings
} from "lucide-react";
import clsx from "clsx";
import { BACKEND_URL } from "../lib";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Departments", icon: Building2, href: "/department" },
    { name: "Subjects", icon: BookOpen, href: "/subject" },
    { name: "Faculty", icon: GraduationCap, href: "/faculty" },
    { name: "Students", icon: Users, href: "/student" },
    { name: "Classes", icon: School, href: "/classes" },
    { name: "Enrollments", icon: FileText, href: "/enrollments" },
];

export default function Sidebar() {
    const pathname = usePathname();

    const logout = async () => {
        const res = await fetch(`${BACKEND_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        })
        window.location.href = "/";
    }

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-800 bg-zinc-950 text-zinc-100 hidden md:flex flex-col">
            {/* CMS Heading / Logo Area */}
            <div className="flex h-16 items-center border-b border-zinc-800 px-6">
                <div className="flex items-center gap-2 font-bold text-xl text-indigo-500">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                        <School size={20} />
                    </div>
                    <span>School<span className="text-zinc-100">CMS</span></span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Management
                </p>

                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-indigo-600/10 text-indigo-400 shadow-[inset_3px_0_0_0_#6366f1]"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                            )}
                        >
                            <item.icon
                                size={18}
                                className={clsx(
                                    "transition-colors",
                                    isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-100"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="border-t border-zinc-800 p-4">
                <div className="flex">
                    <button onClick={logout} className="text-red-500 text-sm flex items-center gap-4 p-3 hover:bg-red-950/50 cursor-pointer rounded-md w-full transition-all duration-300">
                        <LogOut className={"w-4 text-red-500"} />
                        Logout
                    </button>

                </div>
                <div className="flex items-center gap-3 rounded-lg bg-zinc-900/50 p-3 hover:bg-zinc-900 transition-colors cursor-pointer">
                    <div className="h-9 w-9 rounded-full bg-zinc-700 flex items-center justify-center">
                        <span className="text-xs font-bold text-zinc-300">JD</span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium text-zinc-200 truncate">John Doe</span>
                        <span className="text-xs text-zinc-500 truncate">admin@school.com</span>
                    </div>
                    <Settings size={16} className="ml-auto text-zinc-500 hover:text-zinc-300" />
                </div>
            </div>
        </aside>
    );
}