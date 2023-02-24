import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Input } from '@material-ui/core';

import { BodyText, TextColor, TextSize, TextWeight, TitleLink, TitleText } from '../../../ui/text';
import { useLocation } from 'react-router-dom';
import { getDeviceSize } from '../../../utils/check-device-size';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const PadeDetailWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0px;
    padding: 50px;

    @media (max-width: 980px) {
        flex-direction: column;
        padding: 20px;
        margin-top: 0px;
    }
`;

const Spacer = styled.div`
    padding-top: 20px;
`;
const TitleWrapper = styled.div`
    width: 100%;
    gap: 140px;
    display: flex;
    align-items: center;
`;
const TabBarBlock = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;

    @media (max-width: 980px) {
        flex-direction: row;
        width: 100%;
        padding-left: 0px;
        margin-bottom: 20px;
        justify-content: space-between;
    }
`;

const MainInfo = styled.div`
    display: flex;
    width: 75%;
    flex-direction: column;

    @media (max-width: 980px) {
        width: 90%;
    }
`;

const Section = styled.div`
    margin: 0 0 0 0px;
    width: 100%;
`;

const SectionTitleText = styled(BodyText).attrs({ size: TextSize.LARGE, color: TextColor.DARK })`
    text-align: center;
    margin-bottom: 20px;
    width: 80%;
`;

const DescriptionText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    width: 80%;
    line-height: 26px;

    @media (max-width: 980px) {
        width: 100%;
        font-size: 14px;
    }
`;

const DescriptionTitleText = styled.p`
    width: 50%;
    line-height: 26px;
    color: #808080;
    margin-top: 60px;
    @media (max-width: 980px) {
        width: 100%;
        font-size: 14px;
    }
`;

const PageTitleText = styled(TitleText)`
    font-size: 45px;
    background: #fff;
    margin: 40px 0 0 50px;
    color: #858585;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

const UnitLink = styled(TitleLink).attrs({
    color: TextColor.MEDIUM,
})<{ selected?: boolean }>`
    ${({ selected }) => (selected ? 'border-bottom: 2px solid #1e1e1e' : '')};
    margin-right: 10px;
    padding: 10px;
    text-decoration: underline;
    font-weight: 500;
    font-family: 'Manrope';
    font-size: 15px;
    margin-right: 60px;
    margin-bottom: 20px;

    &:hover {
        color: #808080;
        border-bottom: 2px solid #1e1e1e;
    }

    @media (max-width: 850px) {
        font-size: 11px;
        max-width: 32%;
        padding: 0px;
        margin: 0px;
    }
`;

export interface IHeaderLink {
    id: number;
    header: string;
    link: string;
}

export const DeliveryDescription: React.FC = React.memo(function DeliveryDescription() {
    let location = useLocation();
    const [selectedUnit, setSelectedUnit] = useState(0);

    const units: IHeaderLink[] = [
        {
            id: 1,
            header: '- Условия доставки',
            link: '#delivery-terms',
        },
        {
            id: 2,
            header: '- Доставка почтой',
            link: '#post-delivery',
        },
        {
            id: 3,
            header: '- Самовывоз',
            link: '#pick-up-delivery',
        },
    ];

    useEffect(() => {
        units.map((item) => {
            if (location.pathname.includes(item.link)) {
                setSelectedUnit(item.id);
            }
        });
    }, [location.pathname, units]);

    const renderUnitHeaders = useMemo(
        () =>
            units.map((item, index) => (
                <UnitLink
                    key={index}
                    onClick={() => setSelectedUnit(item.id)}
                    href={item.link}
                    selected={item.id === selectedUnit}
                >
                    {item.header}
                </UnitLink>
            )),
        [units, selectedUnit]
    );

    return (
        <Wrapper>
            <TitleWrapper>
                <PageTitleText>Доставка</PageTitleText>
                <DescriptionTitleText>
                    На этой странице Вы можете ознакомиться с условиями доставки и выбрать наиболее подходящую Вам.
                    Оформление доставки заказа осуществляется во все рабочие дни, в том числе и в выходные, с 09:00 до
                    22:00.
                </DescriptionTitleText>
            </TitleWrapper>
            <PadeDetailWrapper>
                <TabBarBlock>{renderUnitHeaders}</TabBarBlock>
                <MainInfo>
                    <Section id="delivery-terms">
                        <SectionTitleText>Условия доставки</SectionTitleText>
                        <DescriptionText>
                            {' '}
                            Мы предлагаем два типа доставки: почтой и самовывоз. Индивидуальный выбор времени доставки
                            предусмотрен только для варианта самовывоза заказа.
                        </DescriptionText>
                        <Spacer />

                        <DescriptionText>
                            Заявки обрабатываются Пн-Вс с 09:00 до 22:00. Пересылка почтой осуществляется с понедельника
                            по пятницу.
                        </DescriptionText>
                        <Spacer />

                        <DescriptionText>
                            {' '}
                            Вся информация, которую Вы предоставляете при оформлении заказа, остается конфиденциальной и
                            не передается третьим лицам. Доставку продукции мы производим только по факту подтверждения
                            заказа по телефону и согласования удобного дня и времени, если заказ забирается с пункта
                            выдачи. Заказы, не получившие подтверждение, к исполнению не принимаются.
                        </DescriptionText>
                    </Section>

                    <Section id="post-delivery">
                        <SectionTitleText>Доставка почтой</SectionTitleText>
                        <DescriptionText>
                            Доставка почтой осуществляется во все регионы Беларуси через отделения РУП «Белпочта».
                            Оплата осуществляется наложенным платежом при получении заказа.
                        </DescriptionText>
                        <Spacer />

                        <DescriptionText>
                            Срок доставки: 2-4 рабочих дня с момента отправки посылки, после полной ее комплектации.
                            Отправка осуществляется с понедельника по пятницу.
                        </DescriptionText>
                        <Spacer />

                        <DescriptionText>
                            Стоимость доставки посылки почтой при заказе на сумму до 100 BYN - 5 BYN.
                        </DescriptionText>
                        <DescriptionText>
                            Доставка посылки почтой при заказе на сумму 100 BYN и выше осуществляется БЕСПЛАТНО.
                        </DescriptionText>
                    </Section>

                    <Section id="pick-up-delivery">
                        <SectionTitleText>Самовывоз</SectionTitleText>
                        <DescriptionText>
                            Предварительно согласованный по телефону заказ можно забрать из нашего магазина, который
                            находится по адресу:
                        </DescriptionText>
                        <DescriptionText>г. Гомель, ул. Карповича 28.</DescriptionText>
                        <Spacer />

                        <DescriptionText>
                            Режим работы: c 09:00 по 17:00 в выходные и будние дни. Выходной - понедельник.
                        </DescriptionText>
                        <Spacer />

                        <DescriptionText>Данный тип доставки осуществляется БЕСПЛАТНО.</DescriptionText>
                    </Section>
                </MainInfo>
            </PadeDetailWrapper>
        </Wrapper>
    );
});
