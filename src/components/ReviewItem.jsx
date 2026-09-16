import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  info: {
    flexShrink: 1,
  },
  username: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 5,
  },
});

const ReviewItem = ({ review }) => {
  const { user, rating, createdAt, text } = review;

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.username} fontWeight="bold" fontSize="subheading">
          {user.username}
        </Text>
        <Text style={styles.date} color="textSecondary">
          {format(new Date(createdAt), 'dd MMM yyyy')}
        </Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
