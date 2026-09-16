import { View, Pressable, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topRow: {
    flexDirection: 'row',
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
  fullName: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const MyReviewItem = ({ review, onViewRepository, onDelete }) => {
  const { rating, createdAt, text, repository } = review;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.fullName} fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
          <Text style={styles.date} color="textSecondary">
            {format(new Date(createdAt), 'dd MMM yyyy')}
          </Text>
          <Text>{text}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={onViewRepository}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewItem;
