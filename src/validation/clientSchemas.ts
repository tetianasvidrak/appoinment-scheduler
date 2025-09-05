import * as yup from "yup";

export const addClientSchema = yup.object().shape({
  name: yup.string().required("Client name is required"),
  phone: yup
    .string()
    .matches(
      /^\+?[0-9]+$/,
      "Phone must contain only digits and may start with +"
    )

    .min(7, "Phone must be at least 7 digits")
    .max(12, "Phone must be at most 12 digits")
    .required("Phone is required"),
});
