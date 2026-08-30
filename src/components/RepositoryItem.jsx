import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import RepositoryItemStats from './RepositoryItemStats';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    flexShrink: 1,
    marginLeft: 10,
  },
  fullName: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  language: {
    alignSelf: 'flex-start',
    color: 'white',
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

const RepositoryItem = ({ repository }) => {
  const { fullName, description, language, ownerAvatarUrl } = repository;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text style={styles.fullName} fontWeight="bold" fontSize="subheading">
            {fullName}
          </Text>
          <Text style={styles.description} color="textSecondary">
            {description}
          </Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
      <RepositoryItemStats repository={repository} />
    </View>
  );
};

export default RepositoryItem;
