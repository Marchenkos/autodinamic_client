import { gql } from 'apollo-boost';
import { Order } from '../entities';
import { userFields, addressFields } from '../queries/fields';

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface EditProfilePayload {
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    birthday?: string;
}

export interface AddressTypeInput {
    id: number;
    address: string;
    city: string;
    postcode: string;
    isDefault: boolean;
}

export interface AddressIDPayload {
    id: number;
}

export interface ToggleWishlistPayload {
    id: number;
}

export interface AddOrderPayload {
    order: Order;
}

export interface AddAddressPayload {
    address: string;
    postcode: string;
    city: string;
    isDefault: boolean;
}

export interface LoginPayload {
    email: string;
    password: string;
}

const authFields = `
    token
    user {
      ${userFields}
    }
`;

const orderFields = `
  orderId
  userEmail
`;

export const loginMutation = gql`
    mutation($input: LoginPayload!) {
      login(input: $input) {
        ${authFields}
      }
    }
`;

export const registrationMutation = gql`
    mutation ($input: RegisterPayload!) {
        register(input: $input)
    }
`;

export const editProfileInfoMutation = gql`
    mutation($input: EditProfilePayload!) {
      editProfileInfo(input: $input) {
        ${userFields}
      }
    }
`;

export const editAddressMutation = gql`
    mutation($input: AddressTypeInput!) {
      editAddress(input: $input) {
        ${addressFields}
      }
    }
`;

export const setDefaultAddressMutation = gql`
    mutation($input: AddressIDPayload!) {
      setDefaultAddress(input: $input) {
        ${addressFields}
      }
    }
`;

export const addAddressMutation = gql`
    mutation($input: AddAddressPayload!) {
      addAddress(input: $input) {
        ${addressFields}
      }
    }
`;

export const removeAddressMutation = gql`
    mutation($input: AddressIDPayload!) {
      removeAddress(input: $input) {
        ${addressFields}
      }
    }
`;

export const removeAccountMutation = gql`
    mutation($email: String!) {
      removeAccount(email: $email)
    }
`;

export const addOrderMutation = gql`
  mutation($input: AddOrderPayload!) {
    addOrder(input: $input) {
      ${orderFields}
    }
  }
`;

export const toggleWishlistMutation = gql`
    mutation($input: ToggleWishlistPayload!) {
      toggleWishlist(input: $input) {
        ${userFields}
      }
    }
`;
