import { cookies } from 'next/headers';
import Sidebar from '../components/SIdebar'
import { redirect } from 'next/navigation';

const layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")

    if (!token) {
        redirect('/')
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Right Main Content */}
            <main className="flex-1 overflow-y-auto md:ml-64 bg-black">
                {/* Optional Top Header for Mobile Menu Trigger & Page Title */}

                {/* Page Content Container */}
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default layout