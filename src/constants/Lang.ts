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
        error_leaving: "Une erreur est servenue en quittant le groupe.",
        error_deleting: "Une erreur est servenue en supprimant le groupe.",
      },
      delete: {
        title: "Supprimer le groupe",
        content: "Êtes-vous sûr de vouloir supprimer ce groupe ?",
        cancel: "Annuler",
        confirm: "Confirmer",
        success: "Le groupe a été supprimé avec succès !",
      },
      created: "Ton groupe a été créé avec succès !",
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
      open_link: "Ouvrir",
      add_place: "Ajouter un lieu",
      place_name: "Nom du lieu*",
      rating_add: "Note*",
      price_range_add: "Prix*",
      picture: "Prennez ou choississez une photo*",
      fromCamera: "Caméra",
      fromGallery: "Galerie",
      link: "URL site web, menu...",
      is_required: "Les champs avec * sont requis",
      go: "Y aller !",
      error: {
        oops: "😬 Oups",
        error_location:
          "Une erreur est survenue lors de la récupération de votre position.",
        comment_empty: "Veuillez saisir un commentaire.",
        error_comment:
          "Une erreur est survenue lors de l'ajout du commentaire.",
        missing_fields: "Veuillez remplir tous les champs.",
        error_add: "Une erreur est survenue lors de l'ajout du lieu.",
      },
      place: "Lieu",
      success: {
        comment_added: "Votre commentaire a été ajouté avec succès !",
        place_added: "Votre lieu a été ajouté avec succès !",
      },
    },
    country_specialities: {
      title: "Sélectionnez une spécialité",
      title_filter:
        "Sélectionnez une spécialité (maintenir le bouton filtre pour réinitialiser)",
      close: "Fermer",
      search: "Rechercher",
      no_result: "Aucune spécialité trouvée",
      countries: [
        { name: "🇺🇸 Américain", code: 0 },
        { name: "🇨🇳 Chinois", code: 1 },
        { name: "🇰🇷 Coréen", code: 2 },
        { name: "🇪🇸 Espagnol", code: 3 },
        { name: "🇫🇷 Français", code: 4 },
        { name: "🇮🇹 Italien", code: 5 },
        { name: "🇮🇳 Indien", code: 12 },
        { name: "🇯🇵 Japonais", code: 6 },
        { name: "🇲🇽 Mexicain", code: 7 },
        { name: "🇵🇪  Péruvien", code: 13 },
        { name: "🇵🇹 Portugais", code: 8 },
        { name: "🇷🇺 Russe", code: 9 },
        { name: "🇹🇷 Turc", code: 10 },
        { name: "🇹🇼  Taiwanais", code: 14 },
        { name: "🇹🇭  Thaïlandais", code: 15 },
        { name: "🇻🇳 Vietnamien", code: 11 },
      ],
    },
    settings: {
      title: "Paramètres",
      edit_pp: "Modifier la photo de profil",
      disconnect: "Se déconnecter",
      editUser: {
        title: "Modifier les informations de l'utilisateur",
        success: "✅ Vos informations ont été modifiées avec succès !",
        error: "😠 Une erreur est survenue lors de la modification.",
        cantEditOAuth:
          "Vous ne pouvez pas modifier vos informations de\nconnexion car vous vous êtes connecté avec",
        password: "Mot de passe",
        password_confirm: "Confirmer le mot de passe",
        password_error: "Les mots de passe ne correspondent pas.",
        password_strengh: "Saisissez un mot de passe plus fort.",
        password_changed: "✅ Votre mot de passe a été modifié avec succès !",
        password_fill: "Veuillez remplir tous les champs.",
        invalid_email: "Veuillez saisir une adresse email valide.",
      },
      delete: {
        button: "Supprimer mon compte",
        title: "Supprimer mon compte",
        content:
          "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
        cancel: "Annuler",
        confirm: "Confirmer",
        error:
          "😠 Une erreur est survenue lors de la suppression de votre compte.",
        success: "🗑 Votre compte a été supprimé avec succès !",
      },
    },
  },
  en: {
    landing: {
      title: "Welcome to\nSerial Luncher!",
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
        forgotPassword: "Forgotten password?",
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
            success: "Image retrieved successfully!",
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
          no_group: "You don't have a group?",
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
            title: "🤖 Are you a robot?",
            body: "You have been identified as a robot. Impossible to continue.",
          },
          loginFailed: {
            title: "😶‍🌫️ Oops!",
            body: "This Apple account is not associated with Serial Luncher.",
          },
          registerFailed: {
            title: "🫣 Oops!",
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
        error_leaving: "An error occurred while leaving the group.",
        error_deleting: "An error occurred while deleting the group.",
      },
      delete: {
        title: "Delete group",
        content: "Are you sure you want to delete this group?",
        confirm: "Delete",
        cancel: "Cancel",
        success: "Group deleted successfully!",
      },
      created: "The group has been created successfully!",
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
      no_comment: "No comment... Be the first!",
      your_comment: "Comment... (max. 160 chars.)",
      added_by: "Added by",
      open_link: "Open",
      add_place: "Add a place",
      rating_add: "Rating*",
      price_range_add: "Price*",
      place_name: "Place name*",
      link: "URL (site web, menu...)",
      picture: "Take or choose a picture*",
      fromCamera: "Camera",
      fromGallery: "Gallery",
      is_required: "Required fields are marked with *",
      go: "Go there!",
      error: {
        oops: "😬 Oops",
        error_location: "An error occurred while fetching your location.",
        comment_empty: "Please enter a non-empty comment.",
        error_comment: "An error occurred while adding the comment.",
        missing_fields: "Please fill all fields.",
        error_add: "An error occurred while adding the place.",
      },
      place: "Place",
      success: {
        comment_added: "Your comment has been added successfully!",
        place_added: "Your place has been added successfully!",
      },
    },
    country_specialities: {
      title: "Select a country speciality",
      title_filter:
        "Select a country speciality (long press filter button to reset)",
      close: "Close",
      search: "Search",
      no_result: "No country speciality found.",
      countries: [
        { name: "🇺🇸 American", code: 0 },
        { name: "🇨🇳 Chinese ", code: 1 },
        { name: "🇰🇷 Korean", code: 2 },
        { name: "🇪🇸 Spanish", code: 3 },
        { name: "🇫🇷 French", code: 4 },
        { name: "🇮🇹 Italian", code: 5 },
        { name: "🇮🇳 Indian", code: 12 },
        { name: "🇯🇵 Japanese", code: 6 },
        { name: "🇲🇽 Mexican", code: 7 },
        { name: "🇵🇪 Peruvian", code: 13 },
        { name: "🇵🇹 Portuguese", code: 8 },
        { name: "🇷🇺 Russian", code: 9 },
        { name: "🇹🇷 Turkish", code: 10 },
        { name: "🇹🇼 Taiwanese", code: 14 },
        { name: "🇹🇭 Thai", code: 15 },
        { name: "🇻🇳 Vietnamese", code: 11 },
      ],
    },
    settings: {
      title: "Settings",
      edit_pp: "Edit profile picture",
      editUser: {
        title: "Edit user",
        success: "✅ User updated successfully!",
        error: "😠 An error occurred while updating the user.",
        cantEditOAuth:
          "You can't edit your credentials\nbecause you signed up with",
        password: "Password",
        password_confirm: "Repeat password",
        password_error: "Passwords doesn't match.",
        password_strengh: "Please use a stronger password.",
        password_changed: "✅ Password changed successfully!",
        password_fill: "Please fill all fields.",
        invalid_email: "Please enter a valid email address.",
      },
      disconnect: "Disconnect",
      delete: {
        button: "Delete account",
        title: "Delete account",
        content: "Are you sure you want to delete your account?",
        confirm: "Delete",
        cancel: "Cancel",
        success: "🗑 Account deleted successfully!",
        error: "😠 An error occurred while deleting the account.",
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
