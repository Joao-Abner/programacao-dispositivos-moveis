import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

interface Car {
  name: string;
  price: number;
  category: string;
  onSale: boolean;
}

export default function App() {
  let dataList: Car[] = [
    {
      name: "Porsche 911",
      price: 850000,
      category: "Esportivo",
      onSale: false,
    },
    {
      name: "Honda Civic",
      price: 120000,
      category: "Sedan",
      onSale: true,
    },
    {
      name: "Jeep Compass",
      price: 180000,
      category: "SUV",
      onSale: true,
    },
  ];

  const userName: string = "João";

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bem-vindo, {userName}!!!</Text>

      <StatusBar style="auto" />

      <ScrollView style={styles.listContainer}>
        {/*Uso do index como a propriedade key do item. */}
        {dataList.map((car, index) => (
          <View key={index} style={styles.carContainer}>
            <View style={styles.carDetails}>
              <Text style={styles.carName}>{car.name}</Text>
              <Text style={styles.carCategory}>{car.category}</Text>
              <Text style={[styles.carPrice, { color: car.onSale ? 'green' : 'gray' }]}>
                R$ {car.price}
              </Text>
            </View>

            {/* Exibição condicional: Se 'onSale' for true, um badge de OFERTA aparece */}
            {car.onSale && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>OFERTA</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Folha de estilos para organizar os componentes na tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  carContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carDetails: {
    flex: 1,
  },
  carName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  carCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#ffd700',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});