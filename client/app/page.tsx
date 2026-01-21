"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  School,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2
} from "lucide-react";
import { BACKEND_URL } from "./lib";
import { useRouter } from "next/navigation";


export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      })

      if (res.status === 200) {
        router.push("/dashboard")
      }

    } catch (error) {
      console.log(error)
      alert("Invalid Credentials")
    }
    finally {
      setIsLoading(false)
    }


  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-black">

      {/* --- LEFT SIDE: Visual/Branding (Hidden on mobile) --- */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 relative p-10 border-r border-zinc-800">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2 font-bold text-xl text-indigo-500">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <School size={20} />
          </div>
          <span>School<span className="text-zinc-100">CMS</span></span>
        </div>

        {/* Testimonial / Hero Text */}
        <div className="relative z-10 space-y-4 max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium text-zinc-100">
              &ldquo;This platform has completely transformed how we manage our department. The automated grading and attendance tracking saves us hours every week.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">
              — Dr. Sarah Connor, Head of Computer Science
            </footer>
          </blockquote>
        </div>
      </div>

      {/* --- RIGHT SIDE: Login Form --- */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[400px]">

          {/* Mobile Logo (Visible only on small screens) */}
          <div className="flex lg:hidden items-center gap-2 font-bold text-xl text-indigo-500 mb-6">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <School size={20} />
            </div>
            <span>School<span className="text-zinc-100">CMS</span></span>
          </div>

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-400">
              Enter your email to sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@school.com"
                  required
                  disabled={isLoading}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300" htmlFor="password">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-10 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="px-8 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-zinc-300">
              Contact Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}