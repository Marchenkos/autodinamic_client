import React from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { BodyText, TextColor, TextWeight, TextSize } from '../../../ui/text';

const InStockWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

const InStockText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })``;

interface IsInStockProps {
    isStock: boolean;
}

export const IsInStock: React.FC<IsInStockProps> = React.memo(function ProductDescription({ isStock }: IsInStockProps) {
    if (isStock) {
        return (
            <InStockWrapper>
                <CheckCircleIcon />
                <InStockText weight={TextWeight.DEFAULT}>в наличие</InStockText>
            </InStockWrapper>
        );
    }

    return (
        <InStockWrapper>
            <CancelIcon style={{ color: '#b53e3e', marginRight: '10px' }} />
            <InStockText weight={TextWeight.DEFAULT}>нет в наличие</InStockText>
        </InStockWrapper>
    );
});
