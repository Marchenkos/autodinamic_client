import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { PlusIconComponent } from './icons/plus-icon.component';
import { device } from '../../public/screen-sizes';
import { BodyText, TextSize } from './text';

export const CounterWrapper = styled.div`
    display: flex;
    width: 100px;
    border: 2px solid #f2f2f2;
    padding: 5px;

    @media ${device.laptop} {
        width: 70px;
    }
`;

export const CounterImageWrapper = styled.div`
    flex-basis: 33%;
    min-width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props: { value?: boolean }) => (props.value ? 'auto' : 'pointer')};
`;

export const CounterBodyText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin-right: 5px;

    @media ${device.laptop} {
        font-size: 15px;
    }
`;

export interface CounterProps {
    count: number;
    recalculatePrice: (value: number) => void;
}

export enum ACTION_TYPE {
    INCREMENT = 'I',
    DECREMENT = 'D',
}

export const Counter: React.FC<CounterProps> = React.memo(function Counter({ count, recalculatePrice }: CounterProps) {
    const [currentState, setCurrentState] = useState(count);

    const changeCurrentValue = useCallback(
        (type: ACTION_TYPE) => {
            switch (type) {
                case ACTION_TYPE.INCREMENT: {
                    if (currentState < 10) {
                        recalculatePrice(currentState + 1);
                        setCurrentState(currentState + 1);
                    }

                    break;
                }
                case ACTION_TYPE.DECREMENT: {
                    if (currentState > 1) {
                        recalculatePrice(currentState - 1);
                        setCurrentState(currentState - 1);
                    }

                    break;
                }
                default:
                    break;
            }
        },
        [currentState]
    );

    return (
        <CounterWrapper>
            <CounterImageWrapper onClick={() => changeCurrentValue(ACTION_TYPE.DECREMENT)}>
                <PlusIconComponent isInverted />
            </CounterImageWrapper>
            <CounterImageWrapper value>
                <CounterBodyText>{currentState}</CounterBodyText>
            </CounterImageWrapper>
            <CounterImageWrapper onClick={() => changeCurrentValue(ACTION_TYPE.INCREMENT)}>
                <PlusIconComponent />
            </CounterImageWrapper>
        </CounterWrapper>
    );
});
