import * as React from "react";
import { LandingScreen } from "@screens/LandingScreen";
import { EnrollmentNavigator } from "@navigation/EnrollmentNavigator";
import { LoginScreen } from "@screens/LoginScreen";
import { MenuBadge } from "@components/ui/Organisms/MenuBadge";
import { Lang } from "@constants/Lang";
import { RegisterScreen } from "@screens/Register";
import ForgottenPassword from "@screens/ForgottenPassword/ForgottenPassword";

type StackScreen = {
  key: number;
  name: string;
  component: React.FC<any>;
  header?: boolean;
}[];

type TabsScreen = {
  key: number;
  name: string;
  component: React.FC<any>;
  icon: (focused: boolean, keyboardStatus: boolean) => JSX.Element;
}[];

export const stack: StackScreen = [
  {
    key: 0,
    name: "Landing",
    component: LandingScreen,
    header: false,
  },
  {
    key: 1,
    name: "Enrollment",
    component: EnrollmentNavigator,
  },
  {
    key: 2,
    name: "ForgottenPassword",
    component: ForgottenPassword,
    header: true,
  },
];

export const tabs: TabsScreen = [
  {
    key: 0,
    name: "Login",
    component: LoginScreen,
    icon: (focused: boolean, keyboardStatus: boolean) => (
      <MenuBadge focused={focused} visible={!keyboardStatus}>
        {Lang.enrollment.login.title}
      </MenuBadge>
    ),
  },
  {
    key: 1,
    name: "Register",
    component: RegisterScreen,
    icon: (focused: boolean, keyboardStatus: boolean) => (
      <MenuBadge focused={focused} visible={!keyboardStatus}>
        {Lang.enrollment.register.title}
      </MenuBadge>
    ),
  },
];
