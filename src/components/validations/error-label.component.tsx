import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

import styled from 'styled-components';

import { BodyText, InputLabel, TextColor, TextSize, TextWeight } from '../../ui/text';

export interface FieldLabelProps {
    fieldError?: FieldError;
    children?: ReactNode;
}

export const ErrorLabel: React.FC<FieldLabelProps> = React.memo(function ErrorLabel({ fieldError }: FieldLabelProps) {
    return fieldError ? (
        <BodyText size={TextSize.EXTRA_SMALL} color={TextColor.ERROR} weight={TextWeight.DEFAULT}>
            {fieldError.message}
        </BodyText>
    ) : null;
});

export const FieldLabel = styled(InputLabel).attrs((props: FieldLabelProps) => ({
    colour: props.fieldError ? TextColor.ERROR : TextColor.MEDIUM,
    children: props.fieldError ? props.fieldError.message : props.children,
}))<FieldLabelProps>`
    margin-bottom: 0;
    text-transform: ${(props) => (props.colour === TextColor.ERROR ? 'none' : 'uppercase')};
`;
