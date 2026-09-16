import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import AppBarTab from './AppBarTab';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollContent: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const { authorizedUser } = useAuthorizedUser();

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <AppBarTab text="Repositories" to="/" />
        {authorizedUser ? (
          <>
            <AppBarTab text="Create a review" to="/review" />
            <AppBarTab text="My reviews" to="/my-reviews" />
            <AppBarTab text="Sign out" onPress={onSignOut} />
          </>
        ) : (
          <>
            <AppBarTab text="Sign in" to="/signin" />
            <AppBarTab text="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
