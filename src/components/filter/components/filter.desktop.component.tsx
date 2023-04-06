import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import './filter.css';

import { FilterRange } from './filter-range.component';

import { FilterSelector } from './filter-selector.component';
import { FILTER_TYPE, IFilter } from '../../../graphql/interfaces';
import { BodyText, TextSize, TextWeight, TextColor, TitleText } from '../../../ui/text';
import { getFilters } from '../selector';
import { capitalizeString } from '../utilites/formated-string';
import { StyledButton } from '../../../ui/new-styled';
import { getProductsCount } from '../../catalog/selectors';
import { useDispatch } from 'react-redux';
import { CLEAR_FILTERS, GET_DEFAULT_FILTER } from '../actions';
import { device } from '../../../../public/screen-sizes';
import { FilterSwitch } from './filter-switch.component';

const Section = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
`;

const BlockBox = styled.div`
    width: 104%;
    position: absolute;
    height: 100%;
    top: 80px;
    background: #f2f2f2a1;
    margin-left: -20px;
`;

const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 40px 0 30px;
    box-sizing: border-box;
    align-items: center;
`;

export const FilterValueText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.DARK })``;
const FilterTitle = styled(TitleText)`
    font-size: 22px;
`;

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    border-right: 1px solid #efefef;
    max-height: 90vh;

    position: sticky;
    top: 40px;

    @media ${device.tablet} { 
      display: none;
    }
`;

const FilterSectionsWrapper = styled.div`
    height: fit-content;
`;


const FilterScollSectionsWrapper = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const FilterDesktop: React.FC = React.memo(function SimpleFilter() {
    const filters = useSelector(getFilters);
    const productsCount = useSelector(getProductsCount);
    const dispatch = useDispatch()

    const clearFilters = useCallback(() => {
      dispatch(CLEAR_FILTERS());
    }, [dispatch]);

    React.useEffect(() => {
      dispatch(GET_DEFAULT_FILTER.TRIGGER());
    }, [dispatch])

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
      <FilterSectionsWrapper>
        {
          filters.map((filter: IFilter, index) => (
              <div key={index}>
                  <Section>{renderSectionsValues(filter)}</Section>
              </div>
          ))
          }
        </FilterSectionsWrapper>
      );
    }, [filters]);

    return (
        <FilterWrapper>
            <HeaderWrapper>
                <FilterTitle>Фильтры</FilterTitle>
            </HeaderWrapper>

            <FilterScollSectionsWrapper>
              {renderSections()}
            </FilterScollSectionsWrapper>
            
            <StyledButton
                additionalStyles={{ width: '60%', margin: '0 auto', padding: '5px', borderRadius: 4, border: '1px solid' }}
                onClick={clearFilters}
                isSecondary
                label="Очистить"
            />
            {productsCount == 0 ? <BlockBox /> : null}
        </FilterWrapper>
    );
});
