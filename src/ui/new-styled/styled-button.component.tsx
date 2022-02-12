import React from 'react';
import styled from 'styled-components';

const PrimaryButton = styled.button`
    background: #000;
    cursor: pointer;
    color: #fff;
    border: 2px solid #000;
    padding: 10px;
    text-transform: uppercase;
    width: 100%;
    font-family: 'Manrope';

    :disabled {
        background: #5e5e5e;
        border-color: #5e5e5e;
        color: #b5b3b3;
        cursor: auto;
    }

	:active {
		background: #3d3d3d;
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
