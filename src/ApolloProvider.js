import React from 'react';
import App from './App';

import {ApolloClient} from '@apollo/client';
import { ApolloProvider,createHttpLink, InMemoryCache } from '@apollo/react-hooks';
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'https://graphql-apollo-mern-network.herokuapp.com/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('usrToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);