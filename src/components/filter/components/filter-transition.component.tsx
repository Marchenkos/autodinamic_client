import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './filter.css';
import { FILTER_TYPE, IFilter } from '../../../graphql/interfaces';
import { BodyText, TextSize, TextWeight, TextColor } from '../../../ui/text';
import { getProductList } from '../../catalog/selectors';
import { getFilters } from '../selector';
import { capitalizeString } from '../utilites/formated-string';
import { FilterRange } from './filter-range.component';
import { StyledButton } from '../../../ui/new-styled';
import { FilterSelector } from './filter-selector.component';
import { FilterSwitch } from './filter-switch.component';

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

    const renderSectionsValues = (filter: IFilter) => {
      switch (filter.type) {
          case FILTER_TYPE.MULTIPLE: {
              return <FilterSelector filter={filter} />;
          }
          case FILTER_TYPE.SINGLE: {
              return <FilterSwitch filter={filter} />;
          }
          case FILTER_TYPE.RANGE: {
              return (
                  <FilterRange filter={filter} />
              );
          }
      }
  };

    const renderSections = useCallback(() => {
        return (
            filters &&
            filters.map((filter: IFilter, index) => (
                <Accordion defaultExpanded={true} key={`${index}-${filter.name}`}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <WrapperAccordionSummary>
                            <SectionTitle>
                                {capitalizeString(filter.displayName)}
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
