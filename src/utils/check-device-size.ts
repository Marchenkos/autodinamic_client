export enum DEVICE_TYPE {
    DESKTOP = 'DESKTOP',
    LARGE_DESKTOP = 'LARGE_DESKTOP',
    LAPTOP = 'LAPTOP',
    TABLET = 'TABLET',
    MOBILE = 'MOBILE',
}

export const getDeviceSize = () => {
    return document.documentElement.scrollWidth;
};

export const checkDeviceSize = () => {
    const pageWidth = getDeviceSize();

    if (pageWidth >= 1025) {
        return DEVICE_TYPE.DESKTOP;
    }

    if (pageWidth >= 1300) {
        return DEVICE_TYPE.LARGE_DESKTOP;
    }

    if (pageWidth >= 769 && pageWidth < 1025) {
        return DEVICE_TYPE.LAPTOP;
    }

    if (pageWidth >= 425 && pageWidth < 769) {
        return DEVICE_TYPE.TABLET;
    }

    return DEVICE_TYPE.MOBILE;
};

export const isSmallDevice = () => {
    const deviceType = checkDeviceSize();

    return deviceType !== DEVICE_TYPE.DESKTOP && deviceType !== DEVICE_TYPE.LARGE_DESKTOP;
};

export const isMobileDevice = () => {
    const deviceType = checkDeviceSize();

    return deviceType === DEVICE_TYPE.TABLET || deviceType === DEVICE_TYPE.MOBILE;
};
