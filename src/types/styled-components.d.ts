import 'styled-components';

import { TextColorMapping, TextSizeMapping, TextWeightMapping } from '../ui/text';

// module augmentation of styled-components types so we can define the
// structure of our theme and properly type it for components to use

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            text: {
                default: string;
                disabled: string;
                highContrast: string;
                light: string;
                error: string;
            };
            background: {
                default: string;
                success: string;
                grey: string;
                dark: string;
                blue: string;
            };
            selector: {
                black: string;
                highlight: string;
            };
            underline: {
                default: string;
            };
        };
        text: {
            transform: {
                upper: string;
                lower: string;
            };
            fonts: {
                default: string;
            };
            fontWeight: TextWeightMapping<number>;
            fontSize: TextSizeMapping<number>;
            colours: TextColorMapping<string>;
        };
        headers: {
            main: {
                fontSize: string;
            };
            h2: {
                fontSize: string;
                lineHeight: string;
            };
            h3: {
                fontSize: string;
                lineHeight: string;
            };
            h4: {
                fontSize: string;
                lineHeight: string;
            };
            h5: {
                fontSize: string;
                lineHeight: string;
            };
            h6: {
                fontSize: string;
                lineHeight: string;
            };
            promo: {
                fontSize: string;
                lineHeight: string;
            };
            placeholder: {
                fontSize: string;
                lineHeight: string;
            };
        };
        icons: {
            menuIcon: {
                height: number;
                width: number;
            };
            circleIcon: {
                height: number;
                width: number;
            };
            logoIcon: {
                height: number;
                width: number;
            };
            searchIcon: {
                height: number;
                width: number;
            };
            subMenuIcon: {
                height: number;
                width: number;
                mobile: {
                    height: number;
                    width: number;
                };
            };
        };
        buttons: {
            default: {
                primary: {
                    background: string;
                    border: string;
                    text: string;
                    size: number;
                };
                secondary: {
                    background: string;
                    border: string;
                    text: string;
                    size: number;
                };
                minimal: {
                    background: string;
                    border: string;
                    text: string;
                    size: number;
                };
            };
            disabled: {
                primary: {
                    background: string;
                    border: string;
                    text: string;
                    size: number;
                };
                secondary: {
                    background: string;
                    border: string;
                    text: string;
                    size: number;
                };
                minimal: {
                    background: string;
                    border: string;
                    text: string;
                    size: number;
                };
            };
        };
    }
}
