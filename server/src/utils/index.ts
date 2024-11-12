export const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function convertToStandardObject(obj: any): any {
    // If it's not an object, return it as is
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // If it's an array, apply the function to each element
    if (Array.isArray(obj)) {
        return obj.map(convertToStandardObject);
    }

    // Create a new object with standard prototype
    const standardObject: Record<string, any> = {};

    // Copy properties to the new object, recursively applying the function
    for (const [key, value] of Object.entries(obj)) {
        standardObject[key] = convertToStandardObject(value);
    }

    return standardObject;
}
