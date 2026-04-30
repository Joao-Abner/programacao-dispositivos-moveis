import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FormButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
}

export default function FormButton({ label, onPress, disabled = false }: FormButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[
                styles.button,
                disabled && styles.buttonDisabled,
            ]}
        >
            <Text style={[styles.label, disabled && styles.labelDisabled]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Botão principal: azul UTFPR, altura confortável, bordas arredondadas
    button: {
        backgroundColor: '#1A56A0',
        height: 52,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,                   // sombra Android
        shadowColor: '#1A56A0',         // sombra iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },

    // Estado desabilitado: cinza opaco, sem sombra
    buttonDisabled: {
        backgroundColor: '#CBD5E1',
        elevation: 0,
        shadowOpacity: 0,
    },


    // Texto do botão: branco, negrito
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Texto quando desabilitado: cinza mais escuro para contraste
    labelDisabled: {
        color: '#94A3B8',
    },
});
