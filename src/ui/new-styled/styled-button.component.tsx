import React from 'react';
import styled from 'styled-components';

const PrimaryButton = styled.button`
    background: #000;
    cursor: pointer;
    color: #fff;
    border: 2px solid #000;
    text-transform: uppercase;
    font-family: 'Manrope';
    padding: 14px;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;

    :disabled {
        background: #5e5e5e;
        border-color: #5e5e5e;
        color: #b5b3b3;
        cursor: auto;
    }

    :active {
        background: #3d3d3d;
    }

    @media (max-width: 850px) {
        font-size: 12px;
        text-transform: inherit;
        max-width: 150px;
    }
`;

const SecondaryButton = styled(PrimaryButton)`
    background: #ffff;
    color: #000;
`;

export interface StyledButtonProps {
    onClick: () => void;
    label: string;
    additionalStyles?: React.CSSProperties;
    isSecondary?: boolean;
    disabled?: boolean;
}

export const StyledButton: React.FC<StyledButtonProps> = React.memo(function StyledButton({
    onClick,
    label,
    additionalStyles,
    isSecondary,
    disabled,
}: StyledButtonProps) {
    if (isSecondary) {
        return (
            <SecondaryButton style={additionalStyles} onClick={onClick} disabled={disabled}>
                {label}
            </SecondaryButton>
        );
    }

    return (
        <PrimaryButton style={additionalStyles} onClick={onClick} disabled={disabled}>
            {label}
        </PrimaryButton>
    );
});
