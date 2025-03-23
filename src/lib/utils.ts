import { IFilesWithPreview } from "@/components/widgets/UploadMediaTrigger";
import { clsx, type ClassValue } from "clsx";
import { eachMonthOfInterval, endOfYear, format, parseISO, startOfYear } from "date-fns";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TokenManagerConfig {
    accessTokenKey: string;
    cookieOptions?: Cookies.CookieAttributes;
}

const TOKEN_CONFIG: TokenManagerConfig = {
    accessTokenKey: "token",
    cookieOptions: {
        secure: import.meta.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: 1, // 1 day
    },
};

export const tokenManager = {
    clearToken: (): void => {
        Cookies.remove(TOKEN_CONFIG.accessTokenKey, TOKEN_CONFIG.cookieOptions);
    },

    setToken: (token: string): void => {
        if (!token) {
            throw new Error("Invalid token provided");
        }
        Cookies.set(TOKEN_CONFIG.accessTokenKey, token, TOKEN_CONFIG.cookieOptions);
    },

    getToken: () => Cookies.get(TOKEN_CONFIG.accessTokenKey),
};

export const convertArrayToString = (value: unknown) => {
    return Array.isArray(value) ? value.join(", ") : value;
};

interface MonthData {
    month: string;
    [key: string]: number | string;
}

export function processDataByMonth<T extends { createdAt: string }>(
    data: T[],
    // property to keep the count for each month
    dataKey: string,
    year: number = new Date().getFullYear(), // Optional year parameter, defaults to current year
) {
    // Create array of all months in the specified year
    const monthsInYear = eachMonthOfInterval({
        start: startOfYear(new Date(year, 0)),
        end: endOfYear(new Date(year, 0)),
    });

    // Initialize data structure with all months set to 0
    const baseData = monthsInYear.map((date) => ({
        month: format(date, "MMMM"),
        [dataKey]: 0,
    })) as MonthData[];

    // If no data, return the base structure
    if (!data.length) return baseData;

    // Only count items from the specified year
    data.forEach((item) => {
        const date = parseISO(item.createdAt);

        // Only process items from the specified year
        if (date.getFullYear() === year) {
            const monthName = format(date, "MMMM");
            const monthIndex = baseData.findIndex((item) => item.month === monthName);
            if (monthIndex !== -1) {
                baseData[monthIndex][dataKey] = (baseData[monthIndex][dataKey] as number) + 1;
            }
        }
    });

    return baseData;
}

export function getDirtyValues(
    dirtyFields: object | boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allValues: Record<string, any>,
): object {
    if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;
    return Object.fromEntries(
        Object.keys(dirtyFields as object).map((key) => [
            key,
            getDirtyValues(dirtyFields[key as keyof typeof dirtyFields], allValues[key]),
        ]),
    );
}

export function buildQueryParams(searchParams: URLSearchParams) {
    return Object.fromEntries(searchParams.entries());
}

export function toSentenceCase(str: string) {
    return str
        .replace(/_/g, " ")
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();
}

export function transformToOptions<K extends string>(input: Record<K, string>) {
    return (Object.keys(input) as K[]).map((key) => ({ key, name: input[key] })) as { key: K; name: string }[];
}

export function isFileWithPreview(file: IFilesWithPreview[number]) {
    return "preview" in file && typeof file.preview === "string";
}

export const isDataUrlPdf = (dataUrl: string) => {
    return dataUrl.startsWith("data:application/pdf");
};

export const convertFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const convertDataUrlToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(",");
    const match = arr[0].match(/:(.*?);/);

    if (!match) {
        throw new Error("Invalid data URL format");
    }

    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};
