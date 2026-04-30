import React, { useState } from "react";
import { ScrollView, StyleSheet, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    children: React.ReactNode;
    padding?: number;
    gap?: number;
    onRefresh?: () => void; // função que será chamada ao puxar a tela para baixo para atualizar
}

export default function ScreenWrapperScrollable({ children, padding = 20, gap = 0, onRefresh }: Props) {
    const [refreshing, setRefreshing] = useState(false); // estado para controlar o icone de girar

    const handleRefresh = () => {
        if (onRefresh) {
            setRefreshing(true);
            onRefresh();
            // Faz o ícone sumir depois de 2 segundos (simulação)
            setTimeout(() => setRefreshing(false), 2000);
        }
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={{ padding, gap }}
                refreshControl={
                    onRefresh ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    ) : undefined
                }
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flexGrow: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
