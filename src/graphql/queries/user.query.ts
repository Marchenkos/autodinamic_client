import { gql } from 'apollo-boost';
import { orderFields, productFields, userFields } from './fields';

export const accountDetailsQuery = gql`
    query {
        accountDetails {
            ${userFields}
        }
    }
`;

export const getOrderByIdQuery = gql`
    query($id: String!) {
        orderById(id: $id) {
            ${orderFields}
        }
    }
`;

export const getOrdersByEmailQuery = gql`
    query($input: GetOrdersByEmailPayload!) {
        orderByEmail(input: $input) {
            ${orderFields}
        }
    }
`;

export const getProductByIdQuery = gql`
    query($id: Float!) {
        productById(id: $id) {
            ${productFields}
        }
    }
`;

export const sendRequestToCallbackQuery = gql`
    query ($input: RequestToCallbackPayload!) {
        sendRequestToCallback(input: $input) {
            isSuccess
        }
    }
`;

export const getFiltersByCategoryQuery = gql`
    query ($category: String!) {
        filterByCategory(category: $category) {
            field_name
            view_field_name
            values
            category
            type
        }
    }
`;
