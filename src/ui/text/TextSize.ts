export enum TextSize {
    EXTRA_EXTRA_SMALL = 'XXS',
    EXTRA_SMALL = 'XS',
    SMALL = 'S',
    MEDIUM = 'M',
    LARGE = 'L',
    TITLE = 'XL',
}

export interface TextSizeMapping<T> {
    [TextSize.EXTRA_EXTRA_SMALL]: T;
    [TextSize.EXTRA_SMALL]: T;
    [TextSize.SMALL]: T;
    [TextSize.MEDIUM]: T;
    [TextSize.LARGE]: T;
    [TextSize.TITLE]: T;
}
