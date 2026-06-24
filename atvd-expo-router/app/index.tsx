import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Href, Link, useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    const handleRandomMovie = () => {
        const randomId = Math.floor(Math.random() * 10);
        router.push(`/movie/${randomId}` as Href);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clube do Cinema 🎬</Text>

            {/* Botão 1: Link Declarativo */}
            <Link href="/home" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Entrar como Convidado</Text>
                </Pressable>
            </Link>

            {/* Botão 2: Navegação Imperativa com Query Param */}
            <Pressable
                style={styles.button}
                onPress={() => router.push('/home?user=Fulano')}
            >
                <Text style={styles.buttonText}>Entrar como Usuário Logado</Text>
            </Pressable>

            {/* Botão 3: Navegação Imperativa com Route Param Dinâmico */}
            <Pressable
                style={styles.button}
                onPress={handleRandomMovie}
            >
                <Text style={styles.buttonText}>Ver um Filme Aleatório</Text>
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
        gap: 16,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
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