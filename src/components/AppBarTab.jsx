import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

const AppBarTab = ({ text, to }) => {
  return (
    <Link to={to} style={styles.container}>
      <Text color="appBarText" fontWeight="bold" fontSize="subheading">
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
