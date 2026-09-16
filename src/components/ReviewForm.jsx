import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  field: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  multilineField: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  fieldError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: -10,
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .integer('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const ownerNameError = formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameError =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingError = formik.touched.rating && formik.errors.rating;
  const textError = formik.touched.text && formik.errors.text;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.field, ownerNameError && styles.fieldError]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {ownerNameError && (
        <Text style={styles.errorText}>{ownerNameError}</Text>
      )}
      <TextInput
        style={[styles.field, repositoryNameError && styles.fieldError]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {repositoryNameError && (
        <Text style={styles.errorText}>{repositoryNameError}</Text>
      )}
      <TextInput
        style={[styles.field, ratingError && styles.fieldError]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />
      {ratingError && <Text style={styles.errorText}>{ratingError}</Text>}
      <TextInput
        style={[
          styles.field,
          styles.multilineField,
          textError && styles.fieldError,
        ]}
        placeholder="Review"
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
      />
      {textError && <Text style={styles.errorText}>{textError}</Text>}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const review = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      navigate(`/repositories/${review.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
