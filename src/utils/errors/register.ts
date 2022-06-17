import { Lang } from "@constants/Lang";

interface ErrorMessagePayload {
  title: string;
  content: string;
}

export const errorHandler = (error: string): ErrorMessagePayload => {
  switch (error) {
    case "wrong_password":
      return {
        title: Lang.enrollment.login.error.oops,
        content: Lang.enrollment.login.error.wrong_credentials,
      };
    case "missing_parameters":
      return {
        title: Lang.enrollment.login.error.oops,
        content: Lang.enrollment.login.error.missing_parameters,
      };
    case "unknown_user":
      return {
        title: Lang.enrollment.login.error.oops,
        content: Lang.enrollment.login.error.doesnt_exist,
      };
    case "user_already_exists":
      return {
        title: Lang.enrollment.register.error.oops,
        content: Lang.enrollment.register.error.already_exists,
      };

    default:
      return {
        title: Lang.enrollment.login.error.oops,
        content: Lang.enrollment.login.error.unknown,
      };
  }
};
