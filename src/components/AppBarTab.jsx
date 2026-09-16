import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

const AppBarTab = ({ text, to, onPress }) => {
  const label = (
    <Text color="appBarText" fontWeight="bold" fontSize="subheading">
      {text}
    </Text>
  );

  if (onPress) {
    return (
      <Pressable style={styles.container} onPress={onPress}>
        {label}
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.container}>
      {label}
    </Link>
  );
};

export default AppBarTab;
