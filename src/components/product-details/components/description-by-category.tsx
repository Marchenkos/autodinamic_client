import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryFields, ProductField } from '../../../graphql/entities';
import { ProductCharacteristicInfo } from '../../../graphql/interfaces';

import { CustomizedTable } from '../../../ui/custom-table.component';
import { getCategoryFields, getProductCategory } from '../../product-category/selectors';
import { getValueByKey } from '../helper/getValueByKey';
import { getProductFields, getSelectedProduct } from '../selectors';
import './product-details.style.scss';

const TablesWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
`;

export interface ProductDescription {
    name: string;
    value: string | null;
}

interface DescriptionByCategoryProps {
	productDetails: ProductCharacteristicInfo
}

export const DescriptionByCategory: React.FC<DescriptionByCategoryProps> = React.memo(function DescriptionByCategory({
	productDetails
}: DescriptionByCategoryProps) {
    const categoryFields = useSelector(getProductFields);

    const stringFromValue = (value?: any): string => {
        if (value === true || value === 'true') {
            return 'Есть';
        }

        if (value === false || value === 'false') {
            return 'Нет';
        }

        if (typeof value === 'number') {
            return value.toString();
        }

        if (typeof value === 'string') {
            return value;
        }

        return '';
    };

    const sectionValues = useMemo(() => {
        let result: ProductDescription[] = [];

        if (!categoryFields) {
            return [
                {
                    name: '',
                    value: '',
                },
            ];
        }

        categoryFields.map((item: ProductField) => {
            if (productDetails.hasOwnProperty(item.column_name)) {
                const productValue = getValueByKey(productDetails, item.column_name);

                if (productValue) {
                    const value = stringFromValue(productValue);

                    result.push({
                        name: item.column_comment ? item.column_comment : '',
                        value: value,
                    });
                }
            }
        });

        return result;
    }, [productDetails, categoryFields]);

    // if (productCategory) {
    //     const r = productCategory.description_sections.map((section) => {
    //         const s = productCategory.description_section_fields.map((fields) => {
    //             if (fields.sectionName === section) {
    //                 const l = sectionValues.filter((item) => item.name.includes(fields.fieldName));

    //                 if (l.length > 0) {
    //                     return l[0];
    //                 }
    //             }
    //         })

    //         return s.filter((i) => i);
    //     })

    //     console.log('r ---', r)

    //     return (
    //         <TablesWrapper>
    //             {r.map((i, index) => {
    //                 if (i.length > 0) {
    //                     return <CustomizedTable key={index} header={productCategory.description_sections[index]} productsData={i} />;
    //                 }
    //             })}
    //         </TablesWrapper>
    //     )
    // }

    return (
        <TablesWrapper>
            <CustomizedTable header={'Описание товара'} productsData={sectionValues} />
        </TablesWrapper>
    );
});
