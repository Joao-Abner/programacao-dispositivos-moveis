import { Slot } from "expo-router";
import AuthContextProvider from "../src/contexts/authContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
