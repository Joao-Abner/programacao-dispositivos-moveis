import { Text, StyleSheet, View } from "react-native";
import { Motorcycle } from "../helpers/groupByCategory";

export default function MotorcycleItem({ motorcycle }: { motorcycle: Motorcycle }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{motorcycle.model}</Text>
            <Text style={styles.subtitle}>{motorcycle.brand} - {motorcycle.year}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
});