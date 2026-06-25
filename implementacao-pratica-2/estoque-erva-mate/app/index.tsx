import { useState } from "react";
import { View, Text, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../src/contexts/authContext";
import { AppInput } from "../src/components/AppInput";
import { AppButton } from "../src/components/AppButton";

export default function LoginScreen() {
  const { token, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Se já tem token salvo na sessão, pula direto para a área restrita
  if (token) {
    return <Redirect href="/userspace" />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      if (Platform.OS === "web") {
        window.alert("Por favor, preencha o e-mail e a senha.");
      } else {
        Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      }
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("E-mail ou senha inválidos. Tente novamente.");
      } else {
        Alert.alert("Falha no Login", "E-mail ou senha inválidos. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>🧉 Erva-Mate Stock</Text>
        <Text style={styles.subtitle}>Gerencie seu estoque com praticidade</Text>

        <View style={styles.form}>
          <AppInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <AppButton
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: 8 }}
          />
        </View>

        {/* <Text style={styles.footerText}>
          Dica de teste: admin@ervamate.local / ervamate123
        </Text> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32", // Verde escuro
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  footerText: {
    marginTop: 32,
    fontSize: 12,
    color: "#999999",
    textAlign: "center",
  }
});
