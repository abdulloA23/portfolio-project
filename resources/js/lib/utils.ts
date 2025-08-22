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
