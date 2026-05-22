import { Text, StyleSheet, View } from "react-native";

export default function SectionFooter({ count }: { count: number }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Total: {count} motocicletas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEF2FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#1E3A5F',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
        textAlign: 'right',
    },
});