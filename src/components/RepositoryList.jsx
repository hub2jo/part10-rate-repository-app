import { useState } from 'react';
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader, { orderOptions } from './RepositoryListHeader';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReached,
  onPressItem,
  order,
  onOrderChange,
  searchKeyword,
  onSearchKeywordChange,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem?.(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositoryListHeader
          order={order}
          onOrderChange={onOrderChange}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={onSearchKeywordChange}
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState(orderOptions[0].value);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const selectedOrder = orderOptions.find((option) => option.value === order);

  const { repositories, fetchMore } = useRepositories({
    first: 5,
    orderBy: selectedOrder.orderBy,
    orderDirection: selectedOrder.orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  const onPressItem = (id) => {
    navigate(`/repositories/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReached={fetchMore}
      onPressItem={onPressItem}
      order={order}
      onOrderChange={setOrder}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={setSearchKeyword}
    />
  );
};

export default RepositoryList;
