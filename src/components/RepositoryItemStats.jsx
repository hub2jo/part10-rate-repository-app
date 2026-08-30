import { View, StyleSheet } from 'react-native';

import Text from './Text';
import formatCount from '../utils/formatCount';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  count: {
    marginBottom: 5,
  },
});

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.count} fontWeight="bold">
      {formatCount(value)}
    </Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItemStats = ({ repository }) => {
  const { stargazersCount, forksCount, reviewCount, ratingAverage } = repository;

  return (
    <View style={styles.container}>
      <Stat label="Stars" value={stargazersCount} />
      <Stat label="Forks" value={forksCount} />
      <Stat label="Reviews" value={reviewCount} />
      <Stat label="Rating" value={ratingAverage} />
    </View>
  );
};

export default RepositoryItemStats;
