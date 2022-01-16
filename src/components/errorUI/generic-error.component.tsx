import React from 'react';
import styled from 'styled-components';

import { StyledButton } from '../../ui/new-styled';
import { BodyText, TextSize, TextColor, TitleText } from '../../ui/text';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 220px;
    box-sizing: border-box;
    background: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ErrorTitle = styled(TitleText)`
    font-size: 30px;
    margin-bottom: 15px;
`;

const DescriptioText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })`
    margin-bottom: 20px;
`;

interface GenericErrorProps {
    title?: string;
    handleTryAgain: () => void;
}

export const GenericError: React.FC<GenericErrorProps> = React.memo(function GenericError({
    title,
    handleTryAgain,
}: GenericErrorProps) {
    return (
        <Wrapper>
            <ErrorTitle>Уупc...</ErrorTitle>
            <DescriptioText>{title ? title : 'Не удалось загрузить страницу'}</DescriptioText>

            <StyledButton additionalStyles={{ width: '30%' }} onClick={handleTryAgain} label="Попробовать снова" />
        </Wrapper>
    );
});
