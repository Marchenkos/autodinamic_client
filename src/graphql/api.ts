import { ApolloClient } from '@apollo/client';
import { SelectedFilterSection } from '../components/filter/actions';

import {
    AddressInfo,
    ICategory,
    IProduct,
    NewOrder,
    Promotion,
    Order,
} from './entities';

import {
    AuthResponse,
    OrderDetailsResponse,
    RequestToCallbackResponse,
    FilterObject,
    ICategoryName,
    User,
    SORT_DIRECTION,
    IProductList,
} from './interfaces';
import {
    addAddressMutation,
    addOrderMutation,
    editAddressMutation,
    editProfileInfoMutation,
    loginMutation,
    registrationMutation,
    removeAccountMutation,
    removeAddressMutation,
    setDefaultAddressMutation,
    toggleWishlistMutation,
} from './mutations/user.mutation';
import {
    getCategoryByNameQuery,
    getCategoryNamesQuery,
    getProductListByTermsQuery,
    getProductListQuery,
    getProductListWithFilterQuery,
    getProductsCategoryQuery,
    getPromotionDetailsQuery,
    getPromotionsListQuery,
    getSimilarProductsQuery,
} from './queries/products.query';
import {
    accountDetailsQuery,
    getFiltersByCategoryQuery,
    getOrderByIdQuery,
    getOrdersByEmailQuery,
    getProductByIdQuery,
    sendRequestToCallbackQuery,
} from './queries/user.query';

export class FetchMutationError extends Error {}

export type SimpleGQLResponse<Key extends string, T> = {
    [X in Key]: T;
};

export interface IFetchProductListAPI {
  limit: number;
  page: number;
  categoryName?: string;
  sort?: SORT_DIRECTION;
  filters?: SelectedFilterSection[];
  isNew?: boolean;
  isHasDiscount?: boolean;
  searchTerms?: string[];
}

export class GraphQLApi {
    constructor(private client: ApolloClient<unknown>) {}

    fetchProductList = async (props: IFetchProductListAPI): Promise<IProductList> => {
      const { limit, page, categoryName, sort, searchTerms, filters, isHasDiscount, isNew } = props;

        const response = await this.client.query<SimpleGQLResponse<'products', IProductList>>({
            query: getProductListQuery,
            variables: {
                args: {
                    limit,
                    page,
                    categoryName,
                    sort,
                    filters,
                    isNew: isNew || false,
                    isHasDiscount: isHasDiscount || false,
                    searchTerms,
                },
            },
            fetchPolicy: 'network-only',
        });

        return response.data.products;
    };

    fetchProductListByTerms = async (
        limit: number,
        next: number,
        sort: string,
        searchTerms: string[],
        filters?: SelectedFilterSection[]
    ): Promise<IProductList> => {
        const response = await this.client.query<SimpleGQLResponse<'productsBySearchTerm', IProductList>>({
            query: getProductListByTermsQuery,
            variables: {
                input: {
                    limit,
                    next,
                    sort,
                    searchTerms,
                    filters,
                },
            },
            fetchPolicy: 'network-only',
        });

        return response.data.productsBySearchTerm;
    };

    fetchProductListWithFilter = async (
        limit: number,
        filters: SelectedFilterSection[],
        startId: number,
        categoryName: string,
        sort: string,
        isNovelty?: boolean
    ): Promise<IProductList> => {
        const response = await this.client.query<SimpleGQLResponse<'productsWithFilter', IProductList>>({
            query: getProductListWithFilterQuery,
            variables: {
                input: {
                    limit,
                    filters,
                    startId,
                    categoryName,
                    sort,
                    isNovelty,
                },
            },
            fetchPolicy: 'network-only',
        });

        return response.data.productsWithFilter;
    };

    getCategoryList = async (): Promise<ICategory[]> => {
        const response = await this.client.query<SimpleGQLResponse<'categories', ICategory[]>>({
            query: getProductsCategoryQuery,
            fetchPolicy: 'network-only',
        });

        return response.data.categories;
    };

    fetchProductById = async (id: number): Promise<IProduct> => {
        const response = await this.client.query({
            query: getProductByIdQuery,
            variables: {
              id,
            },
            fetchPolicy: 'network-only',
        });

        return response.data.productById;
    };

    // fetchCompareList = async (
    //     ids: number[],
    // ): Promise<CompareResponse> => {
    //     const items: IProduct[] = await this.fetchProductsByIds(ids);
    //     let details: any;
    //     let allCategories: string[] = [];

    //     items.map(async product => {
    //         allCategories.push(product.category_name);

    //         switch(product.category_name) {
    //             case 'magnitols': {
    //                 details = await this.fetchMagnitolDetails(parseInt(product.id))

    //                 break;
    //             }
    //             case 'sound_speakers': {
    //                 details = await this.fetchAudioSpeakerDetails(parseInt(product.id))

    //                 break;
    //             }
    //             default: {
    //                 details = undefined;
    //             }
    //         }
    //     })

    //     const filteredCategories = allCategories.filter((item, index) => allCategories.indexOf(item) === index);
    //     const detailsFields = await Promise.all(filteredCategories.map(async categoryName => await this.getCategoryFields(categoryName)));

    //     const generalFields: CategoryFields[] = await this.getCategoryFields('products');

    //     return {
    //         items,
    //         details,
    //         detailsFields,
    //         generalFields
    //     };
    // };

    login = async (email: string, password: string): Promise<AuthResponse> => {
        const response = await this.client.mutate<SimpleGQLResponse<'login', AuthResponse>>({
            mutation: loginMutation,
            variables: {
                input: {
                    email,
                    password,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('login fetch result is undefined');

        return response.data.login;
    };

    registration = async (first_name: string, last_name: string, email: string, password: string): Promise<Boolean> => {
        const response = await this.client.mutate<SimpleGQLResponse<'register', Boolean>>({
            mutation: registrationMutation,
            variables: {
                input: {
                    first_name,
                    last_name,
                    email,
                    password,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('registration fetch result is undefined');

        return response.data.register;
    };

    getAccountDetails = async (): Promise<User> => {
        const response = await this.client.query<SimpleGQLResponse<'accountDetails', User>>({
            query: accountDetailsQuery,
            fetchPolicy: 'network-only',
        });

        return response.data.accountDetails;
    };

    logout = async (): Promise<void> => {
        await this.client.resetStore();
        await this.client.cache.reset();
    };

    updateProfileDetails = async (
        first_name: string,
        last_name: string,
        email: string,
        phone_number?: string,
        birthday?: string
    ): Promise<User> => {
        const response = await this.client.mutate<SimpleGQLResponse<'editProfileInfo', User>>({
            mutation: editProfileInfoMutation,
            variables: {
                input: {
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    birthday,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('update profile fetch result is undefined');

        return response.data.editProfileInfo;
    };

    editAddressDetails = async (
        address: string,
        city: string,
        postcode: string,
        id: number,
        isDefault: boolean
    ): Promise<AddressInfo[]> => {
        const response = await this.client.mutate<SimpleGQLResponse<'editAddress', AddressInfo[]>>({
            mutation: editAddressMutation,
            variables: {
                input: {
                    address,
                    city,
                    postcode,
                    isDefault,
                    id,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('edit address fetch result is undefined');

        return response.data.editAddress;
    };

    setDefaultAddress = async (id: number): Promise<AddressInfo[]> => {
        const response = await this.client.mutate<SimpleGQLResponse<'setDefaultAddress', AddressInfo[]>>({
            mutation: setDefaultAddressMutation,
            variables: {
                input: {
                    id,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('set default address fetch result is undefined');

        return response.data.setDefaultAddress;
    };

    addDeliveryAddress = async (
        address: string,
        city: string,
        postcode: string,
        isDefault: boolean
    ): Promise<AddressInfo[]> => {
        const response = await this.client.mutate<SimpleGQLResponse<'addAddress', AddressInfo[]>>({
            mutation: addAddressMutation,
            variables: {
                input: {
                    address,
                    city,
                    postcode,
                    isDefault,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('add address fetch result is undefined');

        return response.data.addAddress;
    };

    removeAddressDetails = async (id: number): Promise<AddressInfo[]> => {
        const response = await this.client.mutate<SimpleGQLResponse<'removeAddress', AddressInfo[]>>({
            mutation: removeAddressMutation,
            variables: {
                input: {
                    id,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('removeAddressDetails fetch result is undefined');

        return response.data.removeAddress;
    };

    removeAccount = async (email: string): Promise<Boolean> => {
        const response = await this.client.mutate<SimpleGQLResponse<'removeAccount', Boolean>>({
            mutation: removeAccountMutation,
            variables: {
                email,
            },
        });

        if (!response.data) throw new FetchMutationError('removeAccountMutation fetch result is undefined');

        return response.data.removeAccount;
    };

    toggleWishlist = async (id: number): Promise<User> => {
        const response = await this.client.mutate<SimpleGQLResponse<'toggleWishlist', User>>({
            mutation: toggleWishlistMutation,
            variables: {
                input: {
                    id,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('toggleWishlist fetch result is undefined');

        return response.data.toggleWishlist;
    };

    addOrder = async (order: NewOrder): Promise<OrderDetailsResponse> => {
        const response = await this.client.mutate<SimpleGQLResponse<'addOrder', OrderDetailsResponse>>({
            mutation: addOrderMutation,
            variables: {
                input: {
                    order,
                },
            },
        });

        if (!response.data) throw new FetchMutationError('addOrder fetch result is undefined');

        return response.data.addOrder;
    };

    getOrderById = async (id: string): Promise<Order> => {
        const response = await this.client.query<SimpleGQLResponse<'orderById', Order>>({
            query: getOrderByIdQuery,
            variables: {
                id,
            },
            fetchPolicy: 'network-only',
        });

        return response.data.orderById;
    };

    getOrderByEmail = async (email: string): Promise<Order[]> => {
        const response = await this.client.query<SimpleGQLResponse<'orderByEmail', Order[]>>({
            query: getOrdersByEmailQuery,
            variables: {
                input: {
                    email,
                },
            },
            fetchPolicy: 'network-only',
        });

        return response.data.orderByEmail;
    };

    getPromotionsList = async (): Promise<Promotion[]> => {
        const response = await this.client.query<SimpleGQLResponse<'promotionsList', Promotion[]>>({
            query: getPromotionsListQuery,
            fetchPolicy: 'network-only',
        });

        return response.data.promotionsList;
    };

    getPromotionDetails = async (id: number): Promise<Promotion> => {
        const response = await this.client.query<SimpleGQLResponse<'promotionDetails', Promotion>>({
            query: getPromotionDetailsQuery,
            variables: {
                id,
            },
            fetchPolicy: 'network-only',
        });

        return response.data.promotionDetails;
    };

    sendRequestToCallback = async (
        name: string,
        email: string,
        message: string
    ): Promise<RequestToCallbackResponse> => {
        const response = await this.client.query<SimpleGQLResponse<'sendRequestToCallback', RequestToCallbackResponse>>(
            {
                query: sendRequestToCallbackQuery,
                variables: {
                    input: {
                        name,
                        email,
                        message,
                    },
                },
                fetchPolicy: 'network-only',
            }
        );

        return response.data.sendRequestToCallback;
    };

    getFiltersByCategory = async (category: string): Promise<FilterObject[]> => {
        const response = await this.client.query<SimpleGQLResponse<'filterByCategory', FilterObject[]>>({
            query: getFiltersByCategoryQuery,
            variables: {
                category,
            },
            fetchPolicy: 'network-only',
        });

        return response.data.filterByCategory;
    };

    getCategoryByName = async (name: string): Promise<ICategory> => {
        const response = await this.client.query<SimpleGQLResponse<'categoryByName', ICategory>>({
            query: getCategoryByNameQuery,
            variables: {
              name,
            },
            fetchPolicy: 'network-only',
        });

        return response.data.categoryByName;
    };

    getCategoryNames = async (): Promise<ICategoryName[]> => {
        const response = await this.client.query<SimpleGQLResponse<'categoryNames', ICategoryName[]>>({
            query: getCategoryNamesQuery,
            fetchPolicy: 'network-only',
        });

        return response.data.categoryNames;
    };

    fetchSimilarProducts = async (
        category_name: string,
        brand: string,
        excludedId: number
    ): Promise<IProduct[]> => {
        const response = await this.client.query<SimpleGQLResponse<'similarProducts', IProduct[]>>({
            query: getSimilarProductsQuery,
            variables: {
                input: {
                    category_name,
                    brand,
                },
            },
            fetchPolicy: 'network-only',
        });

        return response.data.similarProducts.filter((item) => item.id !== excludedId);
    };
}
