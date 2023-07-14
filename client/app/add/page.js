"use client"
import React, { useState } from 'react';
import {Input} from 'antd';

import { gql, useMutation, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Define the GraphQL mutation
const ADD_USER = gql`
  mutation AddUser($phoneNumber: ID!, $password: ID!, $fullName: ID!) {
    addUsers(phoneNumber: $phoneNumber, password: $password, fullName: $fullName) {
      id
      phoneNumber
      password
      fullName
    }
  }
`;

const AddUserForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ variables: { phoneNumber, password, fullName } })
      .then((result) => {
        console.log(result.data);
        // Handle successful addition of user
      })
      .catch((error) => {
        console.error(error);
        // Handle error when adding user
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

// Create the Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Add User</h1>
        <AddUserForm />
      </div>
    </ApolloProvider>
  );
};

export default App;
