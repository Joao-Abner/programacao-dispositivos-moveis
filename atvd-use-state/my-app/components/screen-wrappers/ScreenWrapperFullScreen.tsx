import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    children: React.ReactNode;
    center?: boolean;
    padding?: number;
    gap?: number;
}

// valor padrão do padding definido diretamente na desestruturação
export default function ScreenWrapperFullScreen({ children, center, padding = 20, gap = 0 }: Props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[
                styles.container,
                { padding, gap },
                center ? styles.centerContent : {}]}>
                {/* Se center for true, aplica o estilo centerContent, senão aplica um objeto vazio */}
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})