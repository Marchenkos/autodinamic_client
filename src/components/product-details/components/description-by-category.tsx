import React, { useMemo } from 'react';
import styled from 'styled-components';
import { IProduct } from '../../../graphql/entities';

import { CustomizedTable } from '../../../ui/custom-table.component';
import { getValueByKey } from '../helper/getValueByKey';
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
    productDetails: IProduct;
}

export const DescriptionByCategory: React.FC<DescriptionByCategoryProps> = React.memo(function DescriptionByCategory({
    productDetails,
}: DescriptionByCategoryProps) {

  const details = useMemo(() => {
    return productDetails.category.allDetails.map((item) => {
      console.log(item)

      if (productDetails.details.hasOwnProperty(item.field_name)) {
        return {
          value: productDetails.details[item.field_name],
          name: item.display_field_name

        }
      }
    })

  }, [productDetails.details, productDetails.category])

  console.log("SPPSPSPSPSPS - ", productDetails.category)
  console.log("SPPSPSPSPSPS - ", productDetails.details)


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

    const sectionValues = []
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
            <CustomizedTable header={'Описание товара'} productsData={details} />
        </TablesWrapper>
    );
});
