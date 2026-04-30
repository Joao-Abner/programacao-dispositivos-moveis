import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
    label: string;
    error?: string;
}

export default function FormInput({ label, error, ...rest }: FormInputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor="#9CA3AF"
                {...rest}
            />
            {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    // Espaçamento externo entre cada campo do formulário
    container: {
        marginBottom: 4,
    },

    // Label acima do campo: letras maiúsculas, cor discreta, espaçamento entre letras
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: '#1A56A0',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 6,
        marginLeft: 2,
    },

    // Campo de input: fundo claro, borda suave, bordas arredondadas
    input: {
        backgroundColor: '#F3F6FB',
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#1C1C1E',
        borderWidth: 1.5,
        borderColor: '#DDE3EE',
    },

    // Estado de erro: substitui a borda padrão por vermelho
    inputError: {
        borderColor: '#DC2626',
        backgroundColor: '#FFF5F5',
    },

    // Mensagem de erro exibida abaixo do campo
    errorText: {
        fontSize: 12,
        color: '#DC2626',
        marginTop: 4,
        marginLeft: 2,
        fontWeight: '500',
    },
});
