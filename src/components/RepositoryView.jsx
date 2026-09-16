import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({
    id,
    first: 2,
  });

  if (loading || !repository) {
    return null;
  }

  const reviewNodes = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} showGithubButton />
      )}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryView;
