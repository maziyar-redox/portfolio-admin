import { GoCheckCircle } from "react-icons/go";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface FormProps {
    message?: string;
};

export function FormSuccess({
    message
}: FormProps) {
    if (!message) return null;
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center justify-start gap-x-2 text-sm text-emerald-500">
            <GoCheckCircle className="h-4 w-4" />
            <p className="font-medium">
                {message}
            </p>
        </div>
    );
};

export function FormError({
    message
}: FormProps) {
    if (!message) return null;
    return (
        <div className="bg-red-600/20 p-3 rounded-md flex items-center justify-start gap-x-2 text-sm text-red-600">
            <HiOutlineExclamationTriangle className="h-4 w-4" />
            <p className="font-medium">
                {message}
            </p>
        </div>
    );
};