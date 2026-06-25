import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../src/contexts/authContext";

export default function UserspaceLayout() {
  const { token, isLoading } = useAuth();

  // Enquanto estiver checando o AsyncStorage, mostra loading para não piscar a tela
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // Se o carregamento terminou e não há token, redireciona para a tela de Login
  if (!token) {
    return <Redirect href="/" />;
  }

  // Se tem token, libera o acesso às rotas filhas
  return <Slot />;
}
