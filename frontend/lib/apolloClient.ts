// lib/apolloClient.ts

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/76357/nightmarket/0.01',
  cache: new InMemoryCache()
});

export default client;
