export enum TextWeight {
    THIN = 'XS',
    DEFAULT = 'S',
    MEDIUM = 'M',
    BOLD = 'L',
    EXTRA_BOLD = 'XL',
}

export interface TextWeightMapping<T> {
    [TextWeight.THIN]: T;
    [TextWeight.DEFAULT]: T;
    [TextWeight.MEDIUM]: T;
    [TextWeight.BOLD]: T;
    [TextWeight.EXTRA_BOLD]: T;
}
