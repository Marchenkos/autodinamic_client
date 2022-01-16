import React, { ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface AppTabPanelProps {
    index: any;
    value: any;
    children: ReactNode;
}

export const AppTabPanel: React.FC<AppTabPanelProps> = React.memo(function AppTabPanel(props: AppTabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
});
