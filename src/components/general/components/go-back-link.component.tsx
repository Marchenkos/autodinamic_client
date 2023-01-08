import * as React from 'react';
import styled from 'styled-components';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { BodyText, TextSize, TextColor, TextWeight } from '../../../ui/text';

const Wrapper = styled.div`
    align-items: center;
    margin-bottom: 20px;
    display: flex;
`;

const GoBackText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    &:hover {
        color: #48b3b3;
    }
`;

interface GoBackLinkProps {
    title?: string;
}

export const GoBackLink: React.FC<GoBackLinkProps> = React.memo(function GoBackLink({
    title = 'Назад',
}: GoBackLinkProps) {
    const history = useNavigate();

    const goBack = React.useCallback(() => {
        history(-1);
    }, [history]);

    return (
        <Wrapper>
            <ChevronLeftIcon style={{ color: '#808080' }} fontSize="small" />
            <GoBackText onClick={goBack}>{title}</GoBackText>
        </Wrapper>
    );
});
