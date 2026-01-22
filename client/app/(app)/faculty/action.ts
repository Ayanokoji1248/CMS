"use server"

import { BACKEND_URL } from "@/app/lib"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const toggleFacultyStatus = async (formData: FormData) => {
    const cookieStore = await cookies()

    const token = cookieStore.get("access_token")

    const id = formData.get("id")

    const res = await fetch(`${BACKEND_URL}/faculty/toggle-active/${id}`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token?.value}`
        }
    })

    if (!res.ok) {
        throw new Error("Unable to change the status")
    }

    revalidatePath('/faculty')
}

export const addFaculty = async (formData: FormData) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")

    if (!token) {
        return {
            success: false,
            message: "Unauthorized"
        }
    }

    const res = await fetch(`${BACKEND_URL}/faculty/create`, {
        method: "POST",
        headers: {
            Cookie: `access_token=${token.value}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            full_name: formData.get("full_name"),
            email: formData.get("email"),
            department_id: formData.get("department_id"),
            designation: formData.get("designation")
        })
    })

    if (!res.ok) {
        const message = (await res.json()).detail
        const error = message || "Failed to add faculty"

        return {
            success: false,
            message: error
        }
    }

    revalidatePath('/faculty')

    return {
        success: true
    }

}