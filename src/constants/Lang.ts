import * as RNLocalize from "react-native-localize";

const locales = {
  fr: {
    landing: {
      title: "Bienvenue sur\nSerial Luncher !",
      continue_with: "Continuer avec",
      email: "Email",
      apple: "Se connecter avec Apple",
      google: "Se connecter avec Google",
    },
    enrollment: {
      login: {
        title: "Connexion",
        email: "Adresse email",
        password: "Mot de passe",
        button: "Se connecter",
        forgotPassword: "Mot de passe oublié ?",
        send: "Envoyer",
        success: {
          hello: "Salut",
          connected: "Vous êtes connecté avec succès !",
        },
        error: {
          oops: "😬 Oups !",
          doesnt_exist: "Cette adresse email n'existe pas.",
          wrong_credentials:
            "Ces identifiants sont incorrects. Veuillez réessayer.",
          missing_parameters: "Veuillez remplir tous les champs.",
          unknown: "Une erreur est survenue. Veuillez réessayer.",
        },
      },
      register: {
        title: "Inscription",
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
        error: {
          oops: "😬 Oups",
          missing_fields: "Veuillez remplir tous les champs.",
          invalid_email: "Veuillez saisir une adresse email valide.",
          password_mismatch: "Les mots de passe ne correspondent pas.",
          invalid_password: "Veuillez utiliser un mot de passe plus complexe.",
          already_exists:
            "Cette utilisateur existe déjà. Veuillez modifer votre email.",
        },
      },
      oauth: {
        apple: {
          userCancel: {
            title: "❌ Connexion avec Apple annulée",
            body: "Vous avez annulé la connexion avec Apple",
          },
          unknownError: {
            title: "❌ Erreur inconnue",
            body: "Une erreur inconnue s'est produite, veuillez réessayer.",
          },
          robotError: {
            title: "🤖 Êtes-vous un robot ?",
            body: "Vous avez été identifié comme un robot. Impossible de continuer.",
          },
          loginFailed: {
            title: "😶‍🌫️ Oups !",
            body: "Ce compte Apple n'est pas associé à Serial Luncher.",
          },
          registerFailed: {
            title: "🫣 Oups !",
            body: "Impossible de créer votre compte, veuillez réessayer.",
          },
        },
      },
    },
    navigation: {
      group: "Groupe",
      map: "Carte",
      settings: "Paramètres",
    },
    group: {
      error: {
        oops: "😬 Oups",
        error_fetching:
          "Une erreur est survenue lors de la récupération du groupe.",
      },
      hello: "Salut",
      added_by: "Ajouté par",
      reusable_package: "Emballage réutilisable",
      last_places: "Derniers lieux",
      users: "Utilisateurs",
      actions: "Actions",
      leave_group: "Quitter le groupe",
      delete_group: "Supprimer le groupe",
    },
    map: {
      rating: "Note",
      price_range: "Prix",
      reusable_package: "Apporter emballage réutilisable ?",
      comments: "Commentaires",
      no_comment: "Aucun commentaire... Soyez le premier !",
      your_comment: "Commentaire... (max. 160 caractères)",
      added_by: "Ajouté par",
      open_link: "Ouvrir le lien",
      add_place: "Ajouter un lieu",
      place_name: "Nom du lieu*",
      rating_add: "Note*",
      price_range_add: "Prix*",
      picture: "Prennez ou choississez une photo*",
      fromCamera: "Caméra",
      fromGallery: "Galerie",
      link: "URL site web, menu...",
      is_required: "Les champs avec * sont requis",
      error: {
        oops: "😬 Oups",
        error_location:
          "Une erreur est survenue lors de la récupération de votre position.",
        comment_empty: "Veuillez saisir un commentaire.",
        error_comment:
          "Une erreur est survenue lors de l'ajout du commentaire.",
        missing_fields: "Veuillez remplir tous les champs.",
      },
      success: {
        comment_added: "Votre commentaire a été ajouté avec succès !",
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
        title: "Sign In",
        email: "Email",
        password: "Password",
        button: "Sign In",
        send: "Send",
        forgotPassword: "Forgotten password ?",
        success: {
          hello: "Hello",
          connected: "You are successfully connected!",
        },
        error: {
          oops: "😬 Oops",
          doesnt_exist: "This user can't be found!",
          wrong_credentials: "Wrong credentials, please check again!",
          unknown: "An unknown error has occurred, please try again!",
          missing_parameters: "Please fill all fields.",
        },
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
        error: {
          oops: "😬 Oops",
          missing_fields: "Please fill all fields.",
          invalid_email: "Please enter a valid email address.",
          password_mismatch: "Passwords don't match.",
          invalid_password: "Please use a stronger password.",
          already_exists: "This user already exists. Please change your email.",
        },
      },
      oauth: {
        apple: {
          userCancel: {
            title: "❌ Apple login cancled",
            body: "The authentication with Apple has been canceled",
          },
          unknownError: {
            title: "❌ Unknown error",
            body: "An unknown error has occurred, please try again.",
          },
          robotError: {
            title: "🤖 Are you a robot ?",
            body: "You have been identified as a robot. Impossible to continue.",
          },
          loginFailed: {
            title: "😶‍🌫️ Oops !",
            body: "This Apple account is not associated with Serial Luncher.",
          },
          registerFailed: {
            title: "🫣 Oops !",
            body: "Can't your account, please try again.",
          },
        },
      },
    },
    navigation: {
      group: "Group",
      map: "Map",
      settings: "Settings",
    },
    group: {
      error: {
        oops: "😬 Oops",
        error_fetching: "An error occurred while fetching the group.",
      },
      hello: "Hello",
      added_by: "Added by",
      reusable_package: "Reusable package",
      last_places: "Last places",
      users: "Users",
      actions: "Actions",
      leave_group: "Leave group",
      delete_group: "Delete group",
    },
    map: {
      rating: "Rating",
      price_range: "Price",
      reusable_package: "Bring reusable package?",
      comments: "Comments",
      no_comment: "No comment... Be the first !",
      your_comment: "Comment... (max. 160 chars.)",
      added_by: "Added by",
      open_link: "Open link",
      add_place: "Add a place",
      rating_add: "Rating*",
      price_range_add: "Price*",
      place_name: "Place name*",
      link: "URL (site web, menu...)",
      picture: "Take or choose a picture*",
      fromCamera: "Camera",
      fromGallery: "Gallery",
      is_required: "Required fields are marked with *",
      error: {
        oops: "😬 Oops",
        error_location: "An error occurred while fetching your location.",
        comment_empty: "Please enter a non-empty comment.",
        error_comment: "An error occurred while adding the comment.",
        missing_fields: "Please fill all fields.",
      },
      success: {
        comment_added: "Your comment has been added successfully !",
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
