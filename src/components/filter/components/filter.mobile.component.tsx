import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { FilterObject } from '../../../graphql/interfaces';
import { FilterSwitch } from '../../../ui/controller.component';
import { StyledButton } from '../../../ui/new-styled';
import { BodyText, TextSize, TextWeight, TextColor, TitleText } from '../../../ui/text';
import { getFilters, getSelectedFilters } from '../selector';
import { capitalizeString } from '../utilites/formated-string';
import { FilterCheckbox } from './filter-checkbox.component';
import { FilterRange } from './filter-range.component';

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

    const renderSectionsValues = (filter: FilterObject) => {
        switch (filter.type) {
            case 'multiple': {
                return filter.values.map((value: string, index) => (
                    <FilterCheckbox enName={filter.field_name} key={index} filterValue={value} />
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
                <>
                    <SectionTitle>{filter.view_field_name && capitalizeString(filter.view_field_name)}</SectionTitle>

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
