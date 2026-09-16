import { useMutation, useApolloClient } from '@apollo/client/react';

import { AUTHENTICATE } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const mutationResult = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    await authStorage.setAccessToken(mutationResult.data.authenticate.accessToken);
    apolloClient.resetStore();

    return mutationResult;
  };

  return [signIn, result];
};

export default useSignIn;
