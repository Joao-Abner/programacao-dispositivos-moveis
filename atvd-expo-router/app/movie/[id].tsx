import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const FILMES = [
    { id: '0', nome: 'Interestelar' },
    { id: '1', nome: 'A Origem' },
    { id: '2', nome: 'Batman: O Cavaleiro das Trevas' },
    { id: '3', nome: 'Matrix' },
    { id: '4', nome: 'O Senhor dos Anéis' },
    { id: '5', nome: 'Pulp Fiction' },
    { id: '6', nome: 'O Poderoso Chefão' },
    { id: '7', nome: 'Clube da Luta' },
    { id: '8', nome: 'Forrest Gump' },
    { id: '9', nome: 'Vingadores: Ultimato' },
];

export default function MovieScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    // Método find responsável por comparar o id do filme com o id passado na rota. Se for igual, retorna o filme.
    const filmeSelecionado = FILMES.find(f => f.id === params.id);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {filmeSelecionado ? `Exibindo detalhes do filme:\n ${filmeSelecionado.nome}` : "Filme não encontrado"}
            </Text>
            {/* Botão de voltar */}
            <Pressable
                style={styles.button}
                onPress={() => router.back()}
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
        gap: 16,
    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
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