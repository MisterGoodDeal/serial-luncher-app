import * as RNLocalize from "react-native-localize";

const locales = {
  fr: {
    landing: {
      title: "Bienvenue sur \nSerial Luncher !",
      continue_with: "Continuer avec",
      email: "Email",
      apple: "Se connecter avec Apple",
      google: "Se connecter avec Google",
    },
  },
  en: {
    landing: {
      title: "Welcome to\nSerial Luncher !",
      continue_with: "Continue with",
      email: "Email",
      apple: "Login with Apple",
      google: "Login with Google",
    },
  },
};

const getLang = (languageCode: string) => {
  switch (languageCode) {
    case "fr":
      return locales.fr;
      break;
    case "en":
      return locales.en;
      break;

    default:
      return locales.en;
      break;
  }
};

export const Lang = getLang(RNLocalize.getLocales()[0].languageCode);
