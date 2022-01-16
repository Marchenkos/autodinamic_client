export const deviceSize = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560
};

export const device = {
    mobileS: `(max-width: ${deviceSize.mobileS}px)`,
    mobileM: `(max-width: ${deviceSize.mobileM}px)`,
    mobileL: `(max-width: ${deviceSize.mobileL}px)`,
    tablet: `(max-width: ${deviceSize.tablet}px)`,
    laptop: `(max-width: ${deviceSize.laptop}px)`,
    laptopL: `(max-width: ${deviceSize.laptopL}px)`,
    desktop: `(max-width: ${deviceSize.desktop}px)`,
    desktopL: `(max-width: ${deviceSize.desktop}px)`
};
