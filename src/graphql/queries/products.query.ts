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
    query($input: LoadProductsPayload!) {
        products(input: $input) {
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
        productsCategory {
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

export const getMagnitolDetailsQuery = gql`
    query($id: Float!) {
        magnitolDetails(id: $id) {
            ${magnitolFields}
        }
    }
`;

export const getAudioSpeakerDetailsQuery = gql`
    query($id: Float!) {
        audioSpeakerDetails(id: $id) {
            ${audioSpeakerFields}
        }
    }
`;

export const getDVRDetailsQuery = gql`
    query($id: Float!) {
        dvrDetails(id: $id) {
            ${dvrFields}
        }
    }
`;

export const getSignalisationDetailsQuery = gql`
    query($id: Float!) {
        signalisationDetails(id: $id) {
            ${signalisationFields}
        }
    }
`;

export const getAmplifierDetailsQuery = gql`
    query($id: Float!) {
        amplifierDetails(id: $id) {
            ${amplifierFields}
        }
    }
`;

export const getSabwooferDetailsQuery = gql`
    query($id: Float!) {
        sabwooferDetails(id: $id) {
            ${sabwooferFields}
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
    query($category: String!) {
        categoryByName(category: $category) {
            ${categoryFields}
        }
    }
`;

export const getCategoryNamesQuery = gql`
    query {
        categoryNames {
            category_name
            title
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
