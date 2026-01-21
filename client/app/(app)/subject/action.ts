"use server"

import { BACKEND_URL } from "@/app/lib"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const toggleSubjectStatus = async (formData: FormData) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")

    const id = formData.get("id")

    const res = await fetch(`${BACKEND_URL}/subject/toggle-active/${id}`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token?.value}`
        }
    })

    if (!res.ok) {
        throw new Error("Unable to change the status")
    }

    revalidatePath('/subject')
}

export const createSubject = async (formData: FormData) => {
    const token = (await cookies()).get("access_token")?.value

    if (!token) {
        return {
            success: false,
            message: "Unauthorized"
        }
    }

    const res = await fetch(`${BACKEND_URL}/subject/create`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: formData.get("name"),
            code: formData.get("code"),
            credits: formData.get("credits"),
            department_id: formData.get("department_id"),
        })
    })

    if (!res.ok) {
        const message = (await res.json()).detail
        const error = message || "Failed to add subject";

        return {
            success: false,
            message: error
        }
    }

    revalidatePath('/subject')

    return { success: true }

}