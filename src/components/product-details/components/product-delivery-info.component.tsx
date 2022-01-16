import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

import { DeliveryMethod } from '../../product-list/interfaces';
import { AppTabPanel } from '../../../ui/app-tab-panel';
import { BodyText, TextColor, TextWeight, TextSize } from '../../../ui/text';

interface ProductDeliveryInfoProps {
    deliveryInfo?: DeliveryMethod[];
}

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'none',
    },
}));

const DescriptionText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin: 5px 0;
`;

export const ProductDeliveryInfo: React.FC<ProductDeliveryInfoProps> = React.memo(function ProductDeliveryInfo({
    deliveryInfo,
}: ProductDeliveryInfoProps) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    if (!deliveryInfo) {
        return null;
    }

    const styles: React.CSSProperties = {
        fontSize: '15px',
        textTransform: 'inherit',
        minWidth: '50px',
        width: '70px',
        padding: 0,
    };

    const createAppTabs = useCallback(
        () =>
            deliveryInfo.map((item: DeliveryMethod, index: number) => {
                return (
                    <AppTabPanel value={value} index={index} key={index}>
                        <DescriptionText>{index}</DescriptionText>
                    </AppTabPanel>
                );
            }),
        [deliveryInfo, value]
    );

    const createTabs = useCallback(
        () =>
            deliveryInfo.map((item: DeliveryMethod, index: number) => {
                if (item.city === '*') {
                    return (
                        <Tab
                            key={index}
                            onChange={handleChange}
                            style={{ ...styles, width: '100px' }}
                            label="Все города"
                        />
                    );
                }
                return <Tab key={index} label={item.city} style={styles} onChange={handleChange} />;
            }),
        [deliveryInfo]
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" style={{ boxShadow: 'none' }}>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
                    {createTabs()}
                </Tabs>
            </AppBar>
            {createAppTabs()}
        </div>
    );
});
