import { useDispatch } from "react-redux";
import { Lang } from "../../../constants/Lang";
import { checkApiError } from "../../api";
import { Info } from "../../model/application";
import { createGreenGoThunk } from "../../thunks";
import { LoginError, LoginResponse } from "../interfaces";

export const login = createGreenGoThunk<
  { email: string; password: string },
  Info,
  Info
>(
  "user/login",
  async (
    arg: { email: string; password: string },
    { dispatch, actions, rejectWithValue, greengoApi }
  ) => {
    const response = checkApiError(
      await greengoApi.login.login(arg.email, arg.password)
    );

    console.log("REPONSE => ", response);

    if (!response.ok) {
      const json: LoginError = await response.json();
      console.log("JSON LOGIN ERROR => ", json);

      if (json.title === "missing_parameters") {
        return rejectWithValue({
          visible: true,
          title: "Oups !",
          content: "Il manque des paramètres",
          type: "error",
          buttons: {
            valid: null,
            cancel: {
              action: null,
              text: null,
            },
          },
        });
      } else if (json.title === "unknown_user") {
        return rejectWithValue({
          visible: true,
          title: "Utilisateur inconnu",
          content: "Aucun utilisateur ne correspond à ces identifiants",
          type: "error",
          buttons: {
            valid: null,
            cancel: {
              action: null,
              text: null,
            },
          },
        });
      } else if (json.title === "wrong_password") {
        return rejectWithValue({
          visible: true,
          title: "Oups !",
          content: "Le mot de passe est incorrect",
          type: "error",
          buttons: {
            valid: null,
            cancel: {
              action: null,
              text: null,
            },
          },
        });
      } else {
        return rejectWithValue({
          visible: true,
          title: "Oups !",
          content: "Une erreur inconnue est survenue",
          type: "error",
          buttons: {
            valid: null,
            cancel: {
              action: null,
              text: null,
            },
          },
        });
      }
    } else {
      const json: LoginResponse = await response.json();
      const tokenData = JSON.stringify(response.headers);
      const xAuth = JSON.parse(tokenData).map["x-auth"];
      const hAuth = JSON.parse(tokenData).map["h-auth"];
      dispatch(
        actions.user.updateUser({
          id: json.id,
          firstname: json.prenom,
          lastname: json.nom,
          email: json.mail,
          token: xAuth,
          refreshToken: hAuth,
        })
      );
      dispatch(actions.user.persistUser());
      return {
        visible: true,
        title: "Youpi !",
        content: "Vous êtes connecté !",
        type: "heart",
        buttons: {
          valid: {
            text: "Let's go !",
            action: "connected",
          },
          cancel: null,
        },
      };
    }
  }
);
