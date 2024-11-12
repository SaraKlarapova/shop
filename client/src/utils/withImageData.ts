export const withImageData = (data: any): FormData => {
    const formData = new FormData();

    const appendFormData = (key: string, value: any) => {
        const isFile = key.startsWith('file');

        if (isFile && data?.[key]?.[0]) {
            if (data[key].length) {
                for (let i = 0; i < data[key].length; i++) {
                    formData.append(key, data[key][i]);
                }
            } else {
                formData.append(key, data[key][0]);
            }
        } else {
            if (isFile) return;

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === 'object' && item !== null) {
                        if (item.__proto__ === null) {
                            console.warn("Object with null prototype detected.");
                        }

                        for (const subKey in item) {
                            if (subKey !== 'undefined' && item[subKey] !== undefined) {

                                const isSubkeyFile = subKey.startsWith('file');

                                if (isSubkeyFile && item?.[subKey]?.[0]) {
                                    formData.append(`${subKey}_${key}_${index}`, item?.[subKey]?.[0]);
                                } else {
                                    appendFormData(`${key}[${index}][${subKey}]`, item[subKey]);
                                }
                            } else {
                                console.warn(`Skipping undefined key or value. Key: ${subKey}, Value: ${item[subKey]}`);
                            }
                        }
                    } else {
                        if (item !== undefined) {
                            formData.append(`${key}[]`, item);
                        } else {
                            console.warn(`Skipping undefined array item for key: ${key}`);
                        }
                    }
                });
            } else if (typeof value === 'object' && value !== null) {
                if (value.__proto__ === null) {
                    console.warn("Object with null prototype detected.");
                }

                for (const subKey in value) {
                    if (subKey !== 'undefined' && value[subKey] !== undefined) {
                        appendFormData(`${key}[${subKey}]`, value[subKey]);
                    } else {
                        console.warn(`Skipping undefined key or value. Key: ${subKey}, Value: ${value[subKey]}`);
                    }
                }
            } else {
                if (key !== 'undefined' && value !== undefined) {
                    formData.append(key, value);
                } else {
                    console.warn(`Skipping undefined key or value. Key: ${key}, Value: ${value}`);
                }
            }
        }
    }

    for (const key in data) {
        if (key !== 'undefined' && data[key] !== undefined) {
            appendFormData(key, data[key]);
        } else {
            console.warn(`Skipping undefined main key or value. Key: ${key}, Value: ${data[key]}`);
        }
    }
    return formData;
};