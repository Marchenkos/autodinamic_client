import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BodyText, TextColor, TextSize, TitleText, TextWeight, TitleLink } from '../../../../ui/text';
import CImage from '../../../../../public/assets/img/complete-order.png';
import { OrderDetailsResponse } from '../../../../graphql/interfaces';
import { StyledButton } from '../../../../ui/new-styled';

const Wrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 30% auto;

    @media (max-width: 850px) {
        width: 80%;
    }
`;

const COImage = styled.img`
    max-width: 20%;
    height: auto;
    resize-mode: contain;
    align-items: center;
    max-width: 17%;
    margin-bottom: 15px;
`;

interface OrderDeliveryInfoProps {
    order: OrderDetailsResponse;
}

const HighlitedSpan = styled.span`
    font-size: 20px;
    color: #60bdbf;
`;

const LabelText = styled(BodyText).attrs({ size: TextSize.SMALL, weight: TextWeight.MEDIUM })`
    margin-bottom: 10px;
`;

const SmallLabelText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })`
    margin-bottom: 10px;
    color: #a2a2a2;
`;

export const CompleteOrder: React.FC<OrderDeliveryInfoProps> = React.memo(function CompleteOrder({
    order,
}: OrderDeliveryInfoProps) {
    const history = useHistory();

    const handleGoToCatalog = useCallback(() => {
        history.push('/catalog/all');
    }, [history]);

    return (
        <Wrapper>
            {/* <COImage src={CImage} /> */}
            <TitleText color={TextColor.BLUE} style={{ marginBottom: '35px', fontSize: '40px' }}>
                Спасибо!
            </TitleText>
            <LabelText>
                Ваш заказ №<HighlitedSpan>{order.orderId}</HighlitedSpan> оформлен и находится в обработке!
            </LabelText>
            <LabelText>
                Мы отправим Вам информацию о заказа на <HighlitedSpan>{order.userEmail}</HighlitedSpan>
            </LabelText>
            <SmallLabelText>
                Проверить статус заказа можно{' '}
                <TitleLink color={TextColor.DARK} size={TextSize.MEDIUM} href="/check-order">
                    здесь
                </TitleLink>
            </SmallLabelText>
            <StyledButton
                additionalStyles={{ marginTop: '20px' }}
                onClick={handleGoToCatalog}
                label="Продолжить покупки"
            />
        </Wrapper>
    );
});
