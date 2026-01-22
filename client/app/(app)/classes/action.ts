"use server"

import { BACKEND_URL } from "@/app/lib"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const toggleClassStatus = async (formData: FormData) => {
    const cookieStore = await cookies()

    const token = cookieStore.get("access_token")

    const id = formData.get("id")

    const res = await fetch(`${BACKEND_URL}/class/toggle-active/${id}`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token?.value}`
        }
    })


    if (!res.ok) {
        throw new Error("Unable to change the status")
    }

    revalidatePath('/classes')
}

export const addClass = async (formData: FormData) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")

    if (!token) {
        return {
            success: false,
            message: "Unauthorized"
        }
    }

    const res = await fetch(`${BACKEND_URL}/class/create`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token.value}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            subject_id: formData.get("subject_id"),
            faculty_id: formData.get("faculty_id"),
            academic_year: formData.get("academic_year"),
            semester: formData.get("semester"),
            capacity: formData.get("capacity")
        })
    })

    if (!res.ok) {
        const message = (await res.json()).detail
        const error = message || "Failed to add student"

        return {
            success: false,
            message: error
        }
    }

    revalidatePath('/classes')

    return {
        success: true
    }

}