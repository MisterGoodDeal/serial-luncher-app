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
      last_places: "Derniers restaurants",
      no_places: "Aucun restaurant n'a encore été ajouté ☹️",
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
      add_place: "Ajouter un restaurant",
      place_name: "Nom du restaurant*",
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
        error_add: "Une erreur est survenue lors de l'ajout du restaurant.",
      },
      place: "Restaurant",
      success: {
        comment_added: "Votre commentaire a été ajouté avec succès !",
        place_added: "Le restarant a été ajouté avec succès !",
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
      edit: "Modifier mon profil",
      manage_group: "Gérer mon groupe",
      contact_us: "Nous contacter",
      privacy_policy: "Politique de confidentialité",
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
    privacy_policy: `# Politique de confidentialité
L'application Serial Luncher est détenu par TurtleCorp, qui est un contrôleur de données de vos données personnelles.

Nous avons adopté cette politique de confidentialité, qui détermine la manière dont nous traitons les informations collectées par Serial Luncher, qui fournit également les raisons pour lesquelles nous devons collecter certaines données personnelles vous concernant. Par conséquent, vous devez lire cette politique de confidentialité avant d'utiliser le site web de Serial Luncher.

Nous prenons soin de vos données personnelles et nous nous engageons à en garantir la confidentialité et la sécurité.

**Les informations personnelles que nous collectons :**
Lorsque vous visitez le Serial Luncher, nous recueillons automatiquement certaines informations sur votre appareil, notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies installés sur votre appareil. En outre, lorsque vous naviguez sur le site, nous recueillons des informations sur les pages web ou les produits individuels que vous consultez, sur les sites web ou les termes de recherche qui vous ont renvoyé au site et sur la manière dont vous interagissez avec le site. Nous désignons ces informations collectées automatiquement par le terme "informations sur les appareils". En outre, nous pourrions collecter les données personnelles que vous nous fournissez (y compris, mais sans s'y limiter, le nom, le prénom, l'adresse, les informations de paiement, etc.) lors de l'inscription afin de pouvoir exécuter le contrat.

**Pourquoi traitons-nous vos données ?**
Notre priorité absolue est la sécurité des données des clients et, à ce titre, nous ne pouvons traiter que des données minimales sur les utilisateurs, uniquement dans la mesure où cela est absolument nécessaire pour maintenir le site web. Les informations collectées automatiquement sont utilisées uniquement pour identifier les cas potentiels d'abus et établir des informations statistiques concernant l'utilisation du site web. Ces informations statistiques ne sont pas autrement agrégées de manière à identifier un utilisateur particulier du système.

Vous pouvez visiter le site web sans nous dire qui vous êtes ni révéler d'informations, par lesquelles quelqu'un pourrait vous identifier comme un individu spécifique et identifiable. Toutefois, si vous souhaitez utiliser certaines fonctionnalités du site web, ou si vous souhaitez recevoir notre lettre d'information ou fournir d'autres détails en remplissant un formulaire, vous pouvez nous fournir des données personnelles, telles que votre e-mail, votre prénom, votre nom, votre ville de résidence, votre organisation, votre numéro de téléphone. Vous pouvez choisir de ne pas nous fournir vos données personnelles, mais il se peut alors que vous ne puissiez pas profiter de certaines fonctionnalités du site web. Par exemple, vous ne pourrez pas recevoir notre bulletin d'information ou nous contacter directement à partir du site web. Les utilisateurs qui ne savent pas quelles informations sont obligatoires sont invités à nous contacter via contact@serial-luncher.turtlecorp.fr.

**Vos droits :**
Si vous êtes un résident européen, vous disposez des droits suivants liés à vos données personnelles :

* Le droit d'être informé.
* Le droit d'accès.
* Le droit de rectification.
* Le droit à l'effacement.
* Le droit de restreindre * le traitement.
* Le droit à la portabilité des données.
* Le droit d'opposition.
* Les droits relatifs à la prise de décision automatisée et au profilage.
* Si vous souhaitez exercer ce droit, veuillez nous contacter via les coordonnées ci-dessous.

En outre, si vous êtes un résident européen, nous notons que nous traitons vos informations afin d'exécuter les contrats que nous pourrions avoir avec vous (par exemple, si vous passez une commande par le biais du site), ou autrement pour poursuivre nos intérêts commerciaux légitimes énumérés ci-dessus. En outre, veuillez noter que vos informations pourraient être transférées en dehors de l'Europe, y compris au Canada et aux États-Unis.

**Liens vers d'autres sites web :**
Notre site web peut contenir des liens vers d'autres sites web qui ne sont pas détenus ou contrôlés par nous. Sachez que nous ne sommes pas responsables de ces autres sites web ou des pratiques de confidentialité des tiers. Nous vous encourageons à être attentif lorsque vous quittez notre site web et à lire les déclarations de confidentialité de chaque site web susceptible de collecter des informations personnelles.

**Sécurité de l'information :**
Nous sécurisons les informations que vous fournissez sur des serveurs informatiques dans un environnement contrôlé et sécurisé, protégé contre tout accès, utilisation ou divulgation non autorisés. Nous conservons des garanties administratives, techniques et physiques raisonnables pour nous protéger contre tout accès, utilisation, modification et divulgation non autorisés des données personnelles sous son contrôle et sa garde. Toutefois, aucune transmission de données sur Internet ou sur un réseau sans fil ne peut être garantie.

**Divulgation légale :**
Nous divulguerons toute information que nous collectons, utilisons ou recevons si la loi l'exige ou l'autorise, par exemple pour nous conformer à une citation à comparaître ou à une procédure judiciaire similaire, et lorsque nous pensons de bonne foi que la divulgation est nécessaire pour protéger nos droits, votre sécurité ou celle d'autrui, enquêter sur une fraude ou répondre à une demande du gouvernement.

**Informations de contact :**
Si vous souhaitez nous contacter pour comprendre davantage la présente politique ou si vous souhaitez nous contacter concernant toute question relative aux droits individuels et à vos informations personnelles, vous pouvez envoyer un courriel à contact@serial-luncher.turtlecorp.fr.`,
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
      last_places: "Last restaurants",
      no_places: "No restaurants yet ☹️",
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
      add_place: "Add a restaurant",
      rating_add: "Rating*",
      price_range_add: "Price*",
      place_name: "Restaurant name*",
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
        error_add: "An error occurred while adding the restaurant.",
      },
      place: "Restaurant",
      success: {
        comment_added: "Your comment has been added successfully!",
        place_added: "The restaurant has been added successfully!",
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
      edit: "Edit",
      manage_group: "Manage group",
      contact_us: "Contact us",
      privacy_policy: "Privacy policy",
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
    privacy_policy: `# Privacy Policy
The Serial Luncher app is owned by TurtleCorp, which is a data controller of your personal data.

We have adopted this privacy policy, which sets out how we treat information collected by Serial Luncher, which also provides the reasons why we need to collect certain personal data about you. Therefore, you should read this privacy policy before using the Serial Luncher website.

We take care of your personal data and are committed to ensuring its confidentiality and security.

**The personal information we collect:**
When you visit Serial Luncher, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. Additionally, as you browse the Site, we collect information about the web pages or individual products you view, the websites or search terms that referred you to the Site, and how you interact with the Site. site. We refer to this automatically collected information as "Device Information". Additionally, we may collect the personal data you provide to us (including, but not limited to, first and last name, address, payment information, etc.) during registration so that we can perform the contract.

**Why do we process your data?**
Our top priority is the security of customer data and as such we can only process minimal user data, only insofar as it is absolutely necessary to maintain the website. The information collected automatically is used only to identify potential cases of abuse and to establish statistical information regarding the use of the website. This statistical information is not otherwise aggregated in such a way as to identify any particular user of the system.

You can visit the Website without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. However, if you wish to use certain features of the website, or if you wish to receive our newsletter or provide other details by filling in a form, you may provide us with personal data, such as your e-mail address, first name , your name, your city of residence, your organization, your telephone number. You can choose not to provide us with your personal data, but then you may not be able to take advantage of certain features of the website. For example, you will not be able to receive our newsletter or contact us directly from the website. Users who do not know which information is mandatory are invited to contact us via contact@serial-luncher.turtlecorp.fr.

**Your rights :**
If you are a European resident, you have the following rights related to your personal data:

* The right to be informed.
* The right of access.
* The right of rectification.
* The right to erasure.
* The right to restrict * processing.
* The right to data portability.
* The right of opposition.
* Rights relating to automated decision-making and profiling.
* If you wish to exercise this right, please contact us using the contact details below.

Additionally, if you are a European resident, we note that we are processing your information in order to perform contracts we might have with you (for example, if you place an order through the Site), or otherwise to continue our legitimate business interests listed above. Additionally, please note that your information may be transferred outside of Europe, including to Canada and the United States.

**Links to other websites:**
Our website may contain links to other websites which are not owned or controlled by us. Please be aware that we are not responsible for these other websites or the privacy practices of third parties. We encourage you to be aware when you leave our website and to read the privacy statements of each website that may collect personal information.

**Information security :**
We secure the information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use or disclosure. We maintain reasonable administrative, technical, and physical safeguards to protect against unauthorized access, use, modification, and disclosure of personal data.`,
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
