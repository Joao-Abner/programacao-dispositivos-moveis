import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Alert, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenWrapperFullScreen from './components/screen-wrappers/ScreenWrapperFullScreen';

// componente separado para o Sensor
function SensorEstacionamento() {
    // PASSO 2: Criando o estado para a distância (em cm)
    const [distancia, setDistancia] = useState(30);

    // PASSO 1 e 3: o array vazio [] indica inicialização (Mount) e a função de retorno a limpeza (Unmount)
    useEffect(() => {
        console.log("📡 Sistema de Sensores Iniciado");

        const intervaloID = setInterval(() => {
            console.log("🟢 Sensor vivo e monitorando...");
        }, 2000); // 2000 milissegundos = 2 segundos

        // PASSO 3: Return de Limpeza - roda antes do componente "morrer"
        return () => {
            clearInterval(intervaloID);
            console.log("📴 Sistema de Sensores Desligado");
        };
    }, []);

    // PASSO 2: useEffect que observa apenas o estado [distancia]
    useEffect(() => {
        if (distancia < 20) {
            if (Platform.OS === 'web')
                window.alert("⚠️ PERIGO: Muito Próximo!");

            Alert.alert("⚠️ PERIGO: Muito Próximo!");
        }
    }, [distancia]);

    return (
        <View style={styles.sensorBox}>
            <Text style={styles.sensorTitle}>Sensor Ativo</Text>

            {/* Visualização da distância e botões de controle */}
            <Text style={styles.distanciaText}>{distancia} cm</Text>

            <View style={styles.botoesContainer}>
                <TouchableOpacity
                    style={styles.btnAproximar}
                    // O Math.max(0, ...) garante que a distância nunca desça abaixo de zero direto no clique!
                    onPress={() => setDistancia(d => Math.max(0, d - 5))}
                >
                    <Text style={styles.btnText}>- aproximar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnAfastar}
                    onPress={() => setDistancia(d => d + 5)}
                >
                    <Text style={styles.btnText}>+ afastar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function App() {
    // Vamos usar esse estado só para ligar e desligar o sensor inteiro na tela
    const [sistemaLigado, setSistemaLigado] = useState(true);

    return (
        <SafeAreaProvider>
            <ScreenWrapperFullScreen center gap={20}>
                <Text style={styles.appTitle}>Painel do Carro</Text>

                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>
                        {sistemaLigado ? 'Desligar Motor' : 'Ligar Motor'}
                    </Text>
                    <Switch
                        value={sistemaLigado}
                        onValueChange={setSistemaLigado}
                    />
                </View>

                {/* Renderização Condicional: O sensor só existe se o sistema estiver ligado */}
                {sistemaLigado && <SensorEstacionamento />}

            </ScreenWrapperFullScreen>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        gap: 10
    },
    switchLabel: {
        fontSize: 16
    },
    sensorBox: {
        padding: 35,
        backgroundColor: '#E5F1FF',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF'
    },
    sensorTitle: {
        fontSize: 18,
        color: '#007AFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    distanciaText: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1C1C1E',
        marginVertical: 20
    },
    botoesContainer: {
        flexDirection: 'column', // botoes na vertical
        marginTop: 10,
        gap: 15
    },
    btnAproximar: {
        backgroundColor: '#FF3B30',
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAfastar: {
        backgroundColor: '#34C759',
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: '#FFF',
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 0.5
    }
});

