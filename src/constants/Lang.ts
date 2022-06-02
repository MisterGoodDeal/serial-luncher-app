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
    enrollment: {
      login: {
        title: "CONNEXION",
        email: "Adresse email",
        password: "Mot de passe",
        button: "Se connecter",
      },
      register: {
        title: "INSCRIPTION",
        firstname: "Prénom",
        lastname: "Nom",
        email: "Adresse email",
        password: "Mot de passe",
        profile_picture: {
          title: "Photo de profil",
          fromCamera: "Prendre une photo",
          fromGallery: "Choisir une photo",
          cancel: "Vous avez annulé la sélection...",
          error: "Une erreur s'est produite, veuillez réessayer...",
          success: "Image récupérée avec succès !",
        },
        button: "S'inscrire",
      },
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
    enrollment: {
      login: {
        title: "SIGN IN",
        email: "Email",
        password: "Password",
        button: "SIGN IN",
      },
      register: {
        title: "SIGN UP",
        firstname: "Firstname",
        lastname: "Lastname",
        email: "Email",
        password: "Password",
        profile_picture: {
          title: "Profile picture",
          fromCamera: "Take a picture",
          fromGallery: "Choose a picture",
          cancel: "You've cancelled the operation...",
          error: "There was an error, please try again...",
          success: "Image successfully fetched!",
        },
        button: "Sign up",
      },
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
