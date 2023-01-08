import styled from 'styled-components';

import { device } from '../../../../public/screen-sizes';
import { BodyText, TextSize } from '../../../ui/text';

export const BasketWrapper = styled.div`
  padding: 20px 50px;
  flex-grow: 1;
  background: white;
`;

export const BasketHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0;
`;


export const BasketBodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 85vh;

    flex-direction: row;

    @media ${device.laptop} {
        flex-direction: column;
    }
`;
export const BasketItems = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 50px;

    @media ${device.laptop} {
        margin-right: 0;
    }
`;

export const ResultBasketWrapper = styled.div`
    width: 50%;
    min-width: 300px;
    padding: 20px;
    border: 2px solid #f2f2f2;
    margin-top: 0px;
    height: 270px;

    @media ${device.laptop} {
        margin-top: 40px;
        width: 40%;
    }
`;

export const ResultItemWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: ${(props: { first?: boolean }) => (props.first ? '25px' : '0')};
`;

export const ResultItemButtonWrapper = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
`;

export const BasketHeaders = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1.5px solid #e8e8e8;
`;

export const BasketBodyText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin-right: 5px;
`;

