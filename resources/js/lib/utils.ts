import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const clean = digits.startsWith("992") ? digits.slice(3) : digits
    return "+992" + clean.slice(0, 9)
}
export function formatDate(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0"); // месяц от 0 → +1
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

