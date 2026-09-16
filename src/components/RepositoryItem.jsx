import { View, Image, Pressable, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

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
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginTop: 15,
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({ repository, showGithubButton = false }) => {
  const { fullName, description, language, ownerAvatarUrl, url } = repository;

  const openInGithub = () => {
    Linking.openURL(url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
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
      {showGithubButton && (
        <Pressable style={styles.button} onPress={openInGithub}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
