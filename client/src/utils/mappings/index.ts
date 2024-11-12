import { SelectOption } from "enum";

export const mapToOptions = <T>(
    arr: T[] | Record<string, string>,
    labelKey?: keyof T | string,
    valueKey?: keyof T | string,
): SelectOption[] => {
    if (Array.isArray(arr)) {
        return arr.map((item) => ({
            label: String(item[labelKey as keyof T]),
            value: valueKey ? String(item[valueKey as keyof T]) : String(item[labelKey as keyof T]),
        }));
    } else {
        return Object.entries(arr).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    }
};
