import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Details: { name: string, id: number }; // Expecting a 'name' parameter
};

export type AppNavigationProps = NavigatorScreenParams<RootStackParamList>;

export interface Pokemon {
  name: string;
  url: string;
  id: number; // Add the id property here
}
