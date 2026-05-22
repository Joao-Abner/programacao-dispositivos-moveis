import { Text, StyleSheet, View } from "react-native";

type Props = {
    title: string;
};

export default function SectionHeader({ title }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E3A5F',
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});
