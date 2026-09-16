import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  searchField: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 15,
    marginBottom: 0,
  },
});

export const orderOptions = [
  {
    value: 'CREATED_AT_DESC',
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    value: 'RATING_AVERAGE_DESC',
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    value: 'RATING_AVERAGE_ASC',
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
];

const RepositoryListHeader = ({
  order,
  onOrderChange,
  searchKeyword,
  onSearchKeywordChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchField}
        placeholder="Search repositories"
        value={searchKeyword}
        onChangeText={onSearchKeywordChange}
      />
      <Picker selectedValue={order} onValueChange={onOrderChange}>
        {orderOptions.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;
