import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import './filter.css';

import { FilterCheckbox } from './filter-checkbox.component';
import { FilterRange } from './filter-range.component';

import { FilterSelector } from './filter-selector.component';
import { FilterObject } from '../../../graphql/interfaces';
import { FilterSwitch } from '../../../ui/controller.component';
import { BodyText, TextSize, TextWeight, TextColor } from '../../../ui/text';
import { getFilters } from '../selector';
import { capitalizeString } from '../utilites/formated-string';
import { StyledButton } from '../../../ui/new-styled';

const Section = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
`;

export const FilterValueText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.DARK })``;

const FilterWrapper = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    padding-right: 30px;
    border-right: 1px solid #efefef;
    min-height: 70vh;
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

export const FilterDesktop: React.FC<FilterProps> = React.memo(function SimpleFilter({ cleanFilter }: FilterProps) {
    const filters = useSelector(getFilters);

    const renderSectionsValues = (filter: FilterObject) => {
        switch (filter.type) {
            case 'multiple': {
                return <FilterSelector filterValues={filter.values} enName={filter.field_name} />;
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
            {renderSections()}
            <StyledButton
                additionalStyles={{ width: '60%', margin: '0 auto', padding: '5px' }}
                onClick={cleanFilter}
                isSecondary
                label="Очистить"
            />
        </FilterWrapper>
    );
});
