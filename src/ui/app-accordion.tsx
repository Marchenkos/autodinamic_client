import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

export const Accordion = withStyles({
    root: {
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: '0',
        },
    },
    expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'none',
        border: 'none',
        marginBottom: -10,
        minHeight: 40,
        padding: 0,
        '&$expanded': {
            minHeight: 40,
        },
    },
    content: {
        '&$expanded': {
            margin: '0px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: '0px',
    },
}))(MuiAccordionDetails);
