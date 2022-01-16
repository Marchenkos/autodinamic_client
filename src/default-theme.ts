import { DefaultTheme } from 'styled-components';
import { TextColor, TextSize, TextWeight } from './ui/text';

const LIGHT_MODE_CONTRAST = {
    MAX: '#474747',
    HIGH: '#272727',
    LOW: '#d6d6d6',
    LOWER: '#e8e8e8',
    MIN: '#EFF0F2',
};

const LIGHT_MODE_BLOCKS = {
    FOREGROUND: '#141414',
    BACKGROUND: 'white',
};

const DEFAULT_FONT_SIZINGS = {
    fontSize: {
        [TextSize.EXTRA_EXTRA_SMALL]: 12,
        [TextSize.EXTRA_SMALL]: 14,
        [TextSize.SMALL]: 16,
        [TextSize.MEDIUM]: 18,
        [TextSize.LARGE]: 20,
        [TextSize.TITLE]: 25,
    },
    lineHeight: {
        [TextSize.EXTRA_EXTRA_SMALL]: 18,
        [TextSize.EXTRA_SMALL]: 21,
        [TextSize.SMALL]: 24,
        [TextSize.MEDIUM]: 27,
        [TextSize.LARGE]: 30,
        [TextSize.TITLE]: 35,
    },
};

export const DEFAULT_THEME: DefaultTheme = {
    colors: {
        text: {
            default: LIGHT_MODE_BLOCKS.FOREGROUND,
            disabled: LIGHT_MODE_CONTRAST.MIN,
            light: LIGHT_MODE_CONTRAST.LOW,
            highContrast: LIGHT_MODE_CONTRAST.HIGH,
            error: '#ff0000',
        },
        background: {
            default: LIGHT_MODE_BLOCKS.BACKGROUND,
            success: 'green',
            grey: LIGHT_MODE_CONTRAST.MIN,
            dark: LIGHT_MODE_CONTRAST.HIGH,
            blue: TextColor.BLUE,
        },
        selector: {
            black: LIGHT_MODE_BLOCKS.FOREGROUND,
            highlight: LIGHT_MODE_CONTRAST.MAX,
        },
        underline: {
            default: LIGHT_MODE_BLOCKS.FOREGROUND,
        },
    },
    text: {
        transform: {
            upper: 'uppercase',
            lower: 'lowercase',
        },
        colours: {
            [TextColor.EXTRA_LIGHT]: '#f2f2f2',
            [TextColor.LIGHT]: '#C8C8C8',
            [TextColor.MEDIUM]: '#808080',
            [TextColor.DARK]: '#333333',
            [TextColor.BLACK]: '#000000',
            [TextColor.BLUE]: '#60BDBF',
            [TextColor.WHITE]: '#FFFF',
            [TextColor.ERROR]: '#A60000',
        },
        fonts: {
            default: 'Manrope',
        },
        fontWeight: {
            [TextWeight.THIN]: 300,
            [TextWeight.DEFAULT]: 400,
            [TextWeight.MEDIUM]: 500,
            [TextWeight.BOLD]: 700,
            [TextWeight.EXTRA_BOLD]: 800,
        },
        fontSize: {
            ...DEFAULT_FONT_SIZINGS.fontSize,
        },
    },
    headers: {
        main: {
            fontSize: '24px',
        },
        h2: {
            fontSize: '22px',
            lineHeight: '34px',
        },
        h3: {
            fontSize: '20px',
            lineHeight: '30px',
        },
        h4: {
            fontSize: '18px',
            lineHeight: '27px',
        },
        h5: {
            fontSize: '16px',
            lineHeight: '24px',
        },
        h6: {
            fontSize: '14px',
            lineHeight: '21px',
        },
        promo: {
            fontSize: '30px',
            lineHeight: '35px',
        },
        placeholder: {
            fontSize: '12px',
            lineHeight: '18px',
        },
    },
    icons: {
        menuIcon: {
            height: 25,
            width: 20,
        },
        circleIcon: {
            height: 7,
            width: 7,
        },
        logoIcon: {
            height: 65,
            width: 90,
        },
        searchIcon: {
            height: 20,
            width: 18,
        },
        subMenuIcon: {
            height: 25,
            width: 25,
            mobile: {
                height: 17,
                width: 17,
            },
        },
    },
    buttons: {
        default: {
            primary: {
                background: LIGHT_MODE_BLOCKS.FOREGROUND,
                border: LIGHT_MODE_BLOCKS.FOREGROUND,
                text: LIGHT_MODE_BLOCKS.BACKGROUND,
                size: 18,
            },
            secondary: {
                background: 'transparent',
                border: LIGHT_MODE_BLOCKS.FOREGROUND,
                text: LIGHT_MODE_BLOCKS.FOREGROUND,
                size: 18,
            },
            minimal: {
                background: 'transparent',
                border: LIGHT_MODE_CONTRAST.MIN,
                text: LIGHT_MODE_BLOCKS.FOREGROUND,
                size: 12,
            },
        },
        disabled: {
            primary: {
                background: LIGHT_MODE_CONTRAST.LOW,
                border: LIGHT_MODE_CONTRAST.LOW,
                text: LIGHT_MODE_BLOCKS.BACKGROUND,
                size: 18,
            },
            secondary: {
                background: 'transparent',
                border: LIGHT_MODE_CONTRAST.LOW,
                text: LIGHT_MODE_CONTRAST.LOW,
                size: 18,
            },
            minimal: {
                background: 'transparent',
                border: LIGHT_MODE_CONTRAST.LOW,
                text: LIGHT_MODE_CONTRAST.LOW,
                size: 12,
            },
        },
    },
};
