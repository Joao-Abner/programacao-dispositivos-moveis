import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Home() {
    const params = useLocalSearchParams();
    const router = useRouter();
    console.log(params);

    const handleVoltar = () => {
        router.back();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                {params.user
                    ? `Bem-vindo, ${params.user}! Hoje tem promoção para sócios! Ingresso R$10,00.`
                    : "Bem-vindo ao Clube de Cinema! Ingresso R$20,00."
                }
            </Text>
            <Pressable
                style={styles.button}
                onPress={handleVoltar}
            >
                <Text style={styles.buttonText}>Voltar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: 20,
        fontWeight: "500",
        color: '#fff',
        textAlign: "center",
        marginHorizontal: 20,
        paddingBottom: 60,
    },
    button: {
        backgroundColor: '#e50914',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});