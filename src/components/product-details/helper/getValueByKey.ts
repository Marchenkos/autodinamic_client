export const getValueByKey = (obj: any, value: string) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(value) && prop === value) {
            return obj[prop];
        }
    }
};
