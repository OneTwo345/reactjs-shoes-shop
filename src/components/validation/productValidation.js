import * as yup from "yup";

export const studentSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Ít nhất 3 kí tự")
    .max(7, "Tối đa 7 kí tự")
    .required("Trường này bắt buộc"),
  newPrice: yup
    .number("Phải nhập kiểu dữ liệu là số")
    .min(1, "Ít nhất 1 kí tự")
    .max(7, "Tối đa 7 kí tự")
    .required("Trường này bắt buộc")
    .typeError("Trường này bắt buộc"),
});
