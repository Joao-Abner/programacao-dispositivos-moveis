import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from "react-native";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function AppButton({ title, loading = false, style, ...rest }: AppButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      activeOpacity={0.8}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50", // Verde erva-mate
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  }
});
