import { TextInput, StyleSheet, TextInputProps, View, Text } from "react-native";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function AppInput({ label, error, style, ...rest }: AppInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput 
        style={[
          styles.input, 
          error ? styles.inputError : null,
          style
        ]} 
        placeholderTextColor="#999"
        {...rest} 
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "#ff5252",
  },
  errorText: {
    color: "#ff5252",
    fontSize: 12,
    marginTop: 4,
  }
});
