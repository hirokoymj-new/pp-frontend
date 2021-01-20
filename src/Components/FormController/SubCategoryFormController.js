import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useSnackbar } from "notistack";

import { CREATE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";

export const SubCategoryFormController = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createSubCategory] = useMutation(CREATE_SUB_CATEGORY, {
    refetchQueries: [
      {
        query: SUB_CATEGORIES,
        variables: { limit: 5, cursor: null },
        fetchPolicy: "network-only",
      },
    ],
  });
  const { data, loading } = useQuery(CATEGORIES);

  const categories = !loading && get(data, "categories.categoryFeed");

  const category_options =
    !loading &&
    categories.map(({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    });

  const onSubmit = async (values, dispatch) => {
    try {
      const { name, categoryId } = values;
      await createSubCategory({
        variables: {
          input: {
            name,
            category: categoryId,
          },
        },
      });
      dispatch(destroy("Sub_Category_Form"));
      enqueueSnackbar("New sub category has been created!", {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required";
    if (!values.order) errors.order = "Required";
    if (!values.categoryId) errors.categoryId = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
    category_options,
    loading,
  });
};
