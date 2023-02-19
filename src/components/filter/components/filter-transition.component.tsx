import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './filter.css';
import { FilterObject } from '../../../graphql/interfaces';
import { FilterSwitch } from '../../../ui/controller.component';
import { BodyText, TextSize, TextWeight, TextColor } from '../../../ui/text';
import { getProductList } from '../../catalog/selectors';
import { getFilters } from '../selector';
import { capitalizeString } from '../utilites/formated-string';
import { FilterCheckbox } from './filter-checkbox.component';
import { FilterRange } from './filter-range.component';
import { StyledButton } from '../../../ui/new-styled';

const Section = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
`;

const WrapperAccordionSummary = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const FilterWrapper = styled.div`
    width: 100%;
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
`;

const FilterHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 0;
`;

const SectionTitle = styled(BodyText).attrs({ size: TextSize.MEDIUM, color: TextColor.DARK })`
    padding: 0 20px;
`;

const FilterTitle = styled(BodyText).attrs({ size: TextSize.LARGE, color: TextColor.DARK })`
    @media (max-width: 850px) {
        font-size: 18px;
        margin-top: 10px;
    }
`;

interface FilterProps {
    applyFilter: () => void;
    cleanFilter: () => void;
}

export const SimpleFilter: React.FC<FilterProps> = React.memo(function SimpleFilter({
    applyFilter,
    cleanFilter,
}: FilterProps) {
    const productList = useSelector(getProductList);
    const filters = useSelector(getFilters);

    const renderSectionsValues = (filter: FilterObject) => {
        switch (filter.type) {
            case 'multiple': {
                return filter.values.map((value: string, index) => (
                    <FilterCheckbox enName={filter.field_name} key={`${index}-${value}`} filterValue={value} />
                ));
            }
            case 'only-one': {
                return <FilterSwitch filter={filter} />;
            }
            case 'range': {
                return (
                    <FilterRange
                        enName={filter.field_name}
                        max={parseInt(filter.values[1])}
                        min={parseInt(filter.values[0])}
                    />
                );
            }
        }
    };

    const renderSections = useCallback(() => {
        return (
            filters &&
            filters.map((filter: FilterObject, index) => (
                <Accordion defaultExpanded={true} key={`${index}-${filter.field_name}`}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <WrapperAccordionSummary>
                            <SectionTitle>
                                {filter.view_field_name && capitalizeString(filter.view_field_name)}
                            </SectionTitle>
                            {/* <Button style={{...secondaryStyledButton, width: '20%', padding: '5px'}} variant="contained" onClick={cleanFilter} color="primary">Очистить</Button> */}
                        </WrapperAccordionSummary>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Section>{renderSectionsValues(filter)}</Section>
                    </AccordionDetails>
                </Accordion>
            ))
        );
    }, [filters]);

    return (
        <FilterWrapper>
            <FilterHeaderWrapper>
                <FilterTitle>ФИЛЬТР</FilterTitle>
                <StyledButton
                    additionalStyles={{ width: '50%' }}
                    isSecondary
                    onClick={cleanFilter}
                    label="Очистить все"
                />
            </FilterHeaderWrapper>
            {renderSections()}
            <StyledButton
                additionalStyles={{ width: '50%', margin: '20px auto' }}
                onClick={applyFilter}
                disabled={!productList || !productList.length}
                label="Применить"
            />
        </FilterWrapper>
    );
});
