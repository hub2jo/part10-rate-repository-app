import { useQuery } from '@apollo/client/react';

import { ME } from '../graphql/queries';

const useAuthorizedUser = ({ includeReviews = false } = {}) => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews },
  });

  return { authorizedUser: data?.me, loading, refetch };
};

export default useAuthorizedUser;
