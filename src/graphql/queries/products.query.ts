import { gql } from 'apollo-boost';
import { SelectedFilterSection } from '../../components/filter/actions';
import {
    amplifierFields,
    audioSpeakerFields,
    categoryFields,
    dvrFields,
    magnitolFields,
    newsFields,
    productFields,
    sabwooferFields,
    signalisationFields,
} from './fields';

export interface GetOrdersByEmailPayload {
    email: string;
}

export interface SearchProductsPayload {
    terms: string[];
    limit: number;
    next: number;
}

export interface SimilarProductsPayload {
    brand: string;
    category_name: string;
}

export interface LoadProductsWithFilterPayload {
    limit: number;
    filters: SelectedFilterSection[];
    startId: number;
    categoryName: string;
    sort: string;
}

export interface ProductByIdPayload {
    id: number;
}

export interface UpdateCategoryPayload {
    fieldName: string;
    value: string;
    category: string;
}

export interface DeleteMultiProductPayload {
    ids: number[];
}

export interface ProductsByIdsPayload {
    ids: number[];
}

export const getProductListQuery = gql`
    query($args: AllProductsArgs!) {
        products(args: $args) {
            products {
              ${productFields}
            }
            count
        }
    }
`;

export const getProductListByTermsQuery = gql`
    query($input: ProductsBySearchInput!) {
        productsBySearchTerm(input: $input) {
            products {
                ${productFields}
            }
            count
        }
    }
`;

export const getProductListWithFilterQuery = gql`
    query($input: LoadProductsWithFilterPayload!) {
        productsWithFilter(input: $input) {
            products {
                ${productFields}
            }
            count
        }
    }
`;

export const getProductsCategoryQuery = gql`
    query {
      categories {
        ${categoryFields}
      }
    }
`;

export const getCategoryFieldsQuery = gql`
    query ($category: String!) {
        categoryColumns(category: $category) {
            column_name
            data_type
            is_nullable
            column_comment
        }
    }
`;

export const getPromotionsListQuery = gql`
    query {
        promotionsList {
            ${newsFields}
        }
    }
`;

export const getPromotionDetailsQuery = gql`
    query($id: Float!) {
        promotionDetails(id: $id) {
            ${newsFields}
        }
    }
`;

export const getCategoryByNameQuery = gql`
    query($name: String!) {
        categoryByName(name: $name) {
            ${categoryFields}
        }
    }
`;

export const getCategoryNamesQuery = gql`
  query {
    categoryNames {
      displayName
      name
    }
  }
`;

export const getSimilarProductsQuery = gql`
    query($input: SimilarProductsPayload!) {
        similarProducts(input: $input) {
            ${productFields}
        }
    }
`;

export const getProductsByIdsQuery = gql`
    query($input: ProductsByIdsPayload!) {
        productsByIds(input: $input) {
            ${productFields}
        }
    }
`;

export const getProductFieldsQuery = gql`
    query ($category: String!) {
        categoryColumns(category: $category) {
            column_name
            data_type
            is_nullable
            column_comment
        }
    }
`;
