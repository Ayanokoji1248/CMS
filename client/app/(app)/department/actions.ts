"use server"

import { BACKEND_URL } from "@/app/lib"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const toggleDepartmentStatus = async (formData: FormData) => {
    const cookieStore = await cookies()
    const token = await cookieStore.get('access_token')
    const id = formData.get('id');
    const res = await fetch(`${BACKEND_URL}/department/toggle-active/${id}`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token?.value}`
        }
    })

    if (!res.ok) {
        throw new Error("Unable to change the status")
    }
    revalidatePath('/department')
}

export const addDepartment = async (formData: FormData) => {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
        return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`${BACKEND_URL}/department/create`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: formData.get("name"),
            code: formData.get("code"),
        }),
    });

    if (!res.ok) {
        const message = (await res.json()).detail
        const error = message || "Failed to add department";

        return { success: false, message: error };
    }

    revalidatePath("/department");

    return { success: true };
};