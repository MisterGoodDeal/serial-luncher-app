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
        step1: {
          title: "Vos informations",
          firstname: "Prénom",
          lastname: "Nom",
          profile_picture: {
            title: "Photo de profil",
            fromCamera: "Prendre une photo",
            fromGallery: "Choisir une photo",
            cancel: "Vous avez annulé la sélection...",
            error: "Une erreur s'est produite, veuillez réessayer...",
            success: "Image récupérée avec succès !",
          },
        },
        step2: {
          title: "Vos identifiants",
          email: "Adresse email",
          password: "Mot de passe",
          repeatPassword: "Répéter le mot de passe",
        },
        step3: {
          title: "Rejoignez\nvotre groupe",
          description: "Saisissez le code à 6 chiffres de votre groupe",
          no_group: "Vous n'avez pas de groupe ?",
          create_group: "Créez un groupe",
          error: {
            not_found: {
              title: "Ce groupe n'existe pas",
              content:
                "Le code que vous avez saisi pour votre groupe n'existe pas.",
            },
            unknown: {
              title: "Une erreur est survenue",
              content:
                "Une erreur inconnue s'est produite. Veuillez réessayer.",
            },
          },
          success: {},
        },
        step4: {
          title: "Créez votre groupe",
          popup_title: "Photo du groupe",
          placeholder: "Nom du groupe",
          button: "Créer mon groupe",
        },
        next: "Étape suivante",
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
        step1: {
          title: "Your informations",
          firstname: "Firstname",
          lastname: "Lastname",
          profile_picture: {
            title: "Profile picture",
            fromCamera: "Take a picture",
            fromGallery: "Choose a picture",
            cancel: "You have cancelled the selection...",
            error: "An error has occurred, please try again...",
            success: "Image retrieved successfully !",
          },
        },
        step2: {
          title: "Your credentials",
          email: "Email",
          password: "Password",
          repeatPassword: "Repeat password",
        },
        step3: {
          title: "Join\nyour group",
          description: "Enter the 6-digit code of your group",
          no_group: "You don't have a group ?",
          create_group: "Create a group",
          error: {
            not_found: {
              title: "This group doesn't exist",
              content: "The code you entered for your group doesn't exist.",
            },
            unknown: {
              title: "An error has occurred",
              content: "An unknown error has occurred. Please try again.",
            },
          },
        },
        step4: {
          title: "Create your group",
          popup_title: "Group picture",
          placeholder: "Group name",
          button: "Create my group",
        },
        next: "Next step",
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
