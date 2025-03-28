import * as Yup from "yup";
import { I18n } from "../../../common";

export const passwordRegex = /^[0-9a-zA-Z#@.$_-]*$/;
export const userNameRegex = /^[0-9a-zA-Z#@.$_-]*$/;

export const loginSchema = Yup.object({
    userName: Yup
        .string()
        .required(I18n("is_required", { type: I18n("user_name") })),
    password: Yup
        .string()
        .required(I18n("is_required", { type: I18n("password") }))
});

export const passwordSchema = Yup.object({
    currentPassword: Yup
        .string()
        .required("Please enter current password."),
    password: Yup
        .string()
        .required("Please enter a new password.")
        .min(8, "Password must be at least 8 character long!"),
    retypePassword: Yup
        .string()
        .required("Please retype your new password.")
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
});
