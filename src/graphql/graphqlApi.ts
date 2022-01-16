import { GraphQLApi } from './api';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

export const graphqlApi = {
    client: (undefined as unknown) as GraphQLApi,
    init: (): void => {
        const httpLink = createHttpLink({ uri: process.env.SERVER_URL });

        const authLink = setContext((_, { headers }) => {
            const token = localStorage.getItem('userToken');

            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        });

        const client = new ApolloClient({
            uri: process.env.SERVER_URL,
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });

        console.log('INIT APOLLO');
        graphqlApi.client = new GraphQLApi(client);
    },
};
