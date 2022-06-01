import { Application } from "@store/model/application";

export const initialState: Application = {
  info: {
    visible: false,
    type: null, // erreur, coeur, ...
    title: null, // Titre de la popup
    content: null, // Texte principal de la popup
    buttons: null,
  },
  pending: false, // Affichage du loader
};

export const sliceName = "application";
