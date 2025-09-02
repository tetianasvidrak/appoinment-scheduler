import * as yup from "yup";

export const editServiceSchema = yup.object().shape({
  name: yup.string().required("Service name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  duration: yup
    .number()
    .typeError("Duration must be a number")
    .positive("Duration must be positive")
    .required("Duration is required"),
  categoryId: yup.string().required("Category is required"),
});

export const addServiceSchema = yup.object().shape({
  name: yup.string().required("Service name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  duration: yup
    .number()
    .typeError("Duration must be a number")
    .positive("Duration must be positive")
    .required("Duration is required"),
  categoryId: yup.string().required("Category is required"),
});
