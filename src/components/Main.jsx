import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import MyReviews from './MyReviews';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import ReviewForm from './ReviewForm';
import SignIn from './SignIn';
import SignUp from './SignUp';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<RepositoryView />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;