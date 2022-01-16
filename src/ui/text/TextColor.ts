export enum TextColor {
    EXTRA_LIGHT = 'XS',
    LIGHT = 'S',
    MEDIUM = 'M',
    DARK = 'L',
    BLACK = 'BLACK',
    BLUE = 'BLUE',
    WHITE = 'WHITE',
    ERROR = 'ERROR',
}

export interface TextColorMapping<T> {
    [TextColor.EXTRA_LIGHT]: T;
    [TextColor.LIGHT]: T;
    [TextColor.MEDIUM]: T;
    [TextColor.DARK]: T;
    [TextColor.BLUE]: T;
    [TextColor.BLACK]: T;
    [TextColor.WHITE]: T;
    [TextColor.ERROR]: T;
}
