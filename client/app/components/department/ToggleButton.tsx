import { toggleDepartmentStatus } from "@/app/(app)/department/actions";
import clsx from "clsx";
import { Power } from "lucide-react";


const ToggleButton = ({
    id,
    isActive,
}: {
    id: string;
    isActive: boolean;
}) => {
    return (
        <form action={toggleDepartmentStatus}>
            <input type="hidden" name="id" value={id} />

            <button
                type="submit"
                title={isActive ? "Deactivate" : "Activate"}
                className={clsx(
                    "rounded-md p-2 transition-colors",
                    isActive
                        ? "text-zinc-400 hover:bg-zinc-800 hover:text-red-400"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-emerald-400"
                )}
            >
                <Power size={18} />
            </button>
        </form>
    );
};

export default ToggleButton;
