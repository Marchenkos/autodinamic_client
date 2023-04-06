import React from 'react';
import {
    withStyles,
    Table,
    Toolbar,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    makeStyles,
} from '@material-ui/core';
import { capitalizeString } from '../components/filter/utilites/formated-string';
import { ProductDescription } from '../components/catalog/interfaces';
import styled from 'styled-components';
import { getDeviceSize } from '../utils/check-device-size';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

export const useTableStyles = makeStyles((theme) => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        '&:hover': {
            backgroundColor: '#d4e3e4bf',
            cursor: 'pointer',
        },
    },
}));

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'none',
        },
    },
}))(TableRow);

interface CustomizedTableProps {
    productsData: (ProductDescription | undefined)[];
    header: string;
}

export const CustomizedTable: React.FC<CustomizedTableProps> = React.memo(function CustomizedTable({
    productsData,
    header,
}: CustomizedTableProps) {
    const isMobile = getDeviceSize();
    const classes = useTableStyles();

    let width = '60%';

    if (isMobile < 850) {
        width = '100%';
    }

    return (
        <TableContainer style={{ width, boxShadow: 'none' }} component={Paper}>
            <Table aria-label="customized table">
                <TableBody>
                    {productsData.map((item) => {
                        if (!item || !item.value) {
                            return null;
                        }

                        return (
                            <StyledTableRow className={classes.row} key={item.name}>
                                <StyledTableCell component="th" scope="row">
                                    {item.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{item.value}</StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
