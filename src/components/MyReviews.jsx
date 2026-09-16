import { FlatList, View, Alert, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import MyReviewItem from './MyReviewItem';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { authorizedUser, loading, refetch } = useAuthorizedUser({
    includeReviews: true,
  });
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  if (loading || !authorizedUser) {
    return null;
  }

  const reviewNodes = authorizedUser.reviews.edges.map((edge) => edge.node);

  const onViewRepository = (repositoryId) => {
    navigate(`/repositories/${repositoryId}`);
  };

  const onDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview(id);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <MyReviewItem
          review={item}
          onViewRepository={() => onViewRepository(item.repositoryId)}
          onDelete={() => onDelete(item.id)}
        />
      )}
    />
  );
};

export default MyReviews;
