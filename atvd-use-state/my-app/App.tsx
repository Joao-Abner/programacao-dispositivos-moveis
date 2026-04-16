import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ScreenWrapperFullScreen from './components/screen-wrappers/ScreenWrapperFullScreen';

export default function App() {
    // 1. Estados Necessários
    const [name, setName] = useState<string>('');
    const [accessAuthorized, setAccessAuthorized] = useState<boolean>(false);

    // Lógica para autorizar acesso
    const handleAuthorize = () => {
        // uso do trim() para remover espaços em branco do nome
        if (name.trim() !== '') {
            setAccessAuthorized(true);
        }
    };

    // Lógica para sair e limpar o nome
    const handleLogout = () => {
        setAccessAuthorized(false);
        setName('');
    };

    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <ScreenWrapperFullScreen center gap={20}>

                {!accessAuthorized ? (
                    // 2. Interface de Entrada - formulário
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Identificação</Text>
                            <Text style={styles.subtitle}>Por favor, identifique-se para acessar.</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>NOME COMPLETO</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu nome completo"
                                placeholderTextColor="#999"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <TouchableOpacity
                            // aplica styles.button e se o nome estiver vazio, aplica styles.buttonDisabled.
                            style={[styles.button, name.trim() === '' && styles.buttonDisabled]}
                            onPress={handleAuthorize}
                            disabled={name.trim() === ''} // desabilita o botão se o nome estiver vazio.
                            activeOpacity={0.8}
                        >
                            {/* aplica styles.buttonText e se o nome estiver vazio, aplica styles.buttonTextDisabled. */}
                            <Text style={[styles.buttonText, name.trim() === '' && styles.buttonTextDisabled]}>Solicitar Acesso</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // 3. Lógica de Exibição - acesso concedido
                    <View style={styles.successContainer}>
                        <View style={styles.successIcon}>
                            <Text style={styles.successIconText}>✓</Text>
                        </View>
                        <Text style={styles.welcomeText}>Acesso Liberado para:</Text>
                        <Text style={styles.userName}>{name}</Text>

                        <TouchableOpacity
                            style={styles.outlineButton}
                            onPress={handleLogout} // chama a função handleLogout quando o botão é pressionado. 
                            activeOpacity={0.6}
                        >
                            <Text style={styles.outlineButtonText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </ScreenWrapperFullScreen>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#636366',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    form: {
        width: '100%',
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: '#8E8E93',
        letterSpacing: 1,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F2F2F7',
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1C1C1E',
    },
    button: {
        backgroundColor: '#007AFF',
        height: 52,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        boxShadow: '0px 4px 8px rgba(0, 122, 255, 0.2)', // sombra que funciona no ios
        elevation: 3 // uma sombra que fica abaixo do botão, mas só funciona no android 
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonTextDisabled: {
        color: '#AEAEB2',
    },
    buttonDisabled: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#AEAEB2',
        elevation: 0,
        shadowOpacity: 0,
    },
    successContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    successIconText: {
        color: '#FFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 18,
        color: '#636366',
        marginBottom: 8,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1E',
        textAlign: 'center',
        marginBottom: 40,
    },
    outlineButton: {
        borderWidth: 1.5,
        borderColor: '#007AFF',
        height: 52,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    outlineButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});