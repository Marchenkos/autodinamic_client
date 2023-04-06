import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { FILTER_TYPE, IFilter } from '../../../graphql/interfaces';
import { StyledButton } from '../../../ui/new-styled';
import { BodyText, TextSize, TextWeight, TextColor, TitleText } from '../../../ui/text';
import { getFilters, getSelectedFilters } from '../selector';
import { capitalizeString } from '../utilites/formated-string';
import { FilterRange } from './filter-range.component';
import { FilterSelector } from './filter-selector.component';
import { FilterSwitch } from './filter-switch.component';

const Section = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
`;

export const FilterValueText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.DARK })``;

const FilterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
    display: flex;
`;

const FilterTitle = styled(TitleText)`
    font-size: 22px;
    margin-bottom: 40px;
`;

const SectionTitle = styled(BodyText).attrs({
    size: TextSize.EXTRA_SMALL,
    weight: TextWeight.MEDIUM,
    color: TextColor.DARK,
})`
    margin: 0 0 10px;
`;

interface FilterProps {
    cleanFilter: () => void;
}

export const FilterMobile: React.FC<FilterProps> = React.memo(function FilterMobile({ cleanFilter }: FilterProps) {
    const filters = useSelector(getFilters);
    const selectedFilters = useSelector(getSelectedFilters);

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
                <>
                    <SectionTitle>{capitalizeString(filter.displayName)}</SectionTitle>

                    <Section>{renderSectionsValues(filter)}</Section>
                </>
            ))
        );
    }, [filters]);

    return (
        <FilterWrapper>
            <HeaderWrapper>
                <FilterTitle>Фильтры</FilterTitle>
                {selectedFilters && selectedFilters.length && (
                    <StyledButton
                        additionalStyles={{
                            height: '40px',
                            width: '100px',
                            fontSize: '12px',
                            margin: '0 20px',
                            padding: '5px',
                        }}
                        isSecondary
                        onClick={cleanFilter}
                        label="Очистить"
                    />
                )}
            </HeaderWrapper>
            {renderSections()}
        </FilterWrapper>
    );
});
