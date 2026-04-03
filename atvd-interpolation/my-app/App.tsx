import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { formatCurrency } from './services/formatter';

// Usando 'type' ao invés de 'interface' para definir o formato do objeto.
type Car = {
  name: string;
  price: number;
  category: string;
  onSale: boolean;
};

export default function App() {
  // 1. Preparação dos Dados: Criação do array de objetos 'dataList'
  // Este array de objetos armazena a nossa lista de carros que será exibida dinamicamente.
  let dataList: Car[] = [
    {
      name: "Porsche 911",
      price: 85000,
      category: "Esportivo",
      onSale: false,
    },
    {
      name: "Honda Civic",
      price: 32000,
      category: "Sedan",
      onSale: true,
    },
    {
      name: "Jeep Compass",
      price: 18000,
      category: "SUV",
      onSale: true,
    },
  ];

  // 2. Interpolação: Criando a variável para a saudação
  const userName: string = "João";

  return (
    // View principal (container estrutural) que envolve todos os elementos da tela
    <View style={styles.container}>
      {/* Exibindo a saudação no topo da tela */}
      {/* As chaves {userName} fazem a chamada "interpolação", embutindo o valor da variável de forma dinâmica no texto */}
      <Text style={styles.heading}>Bem-vindo, {userName}!</Text>

      {/* Componente nativo do Expo para manter a barra superior do celular limpa */}
      <StatusBar style="auto" />

      {/* ScrollView permite navegar na lista rolando para baixo, útil quando temos muitos itens */}
      <ScrollView style={styles.listContainer}>
        {/* O método .map() itera (passa um a um) sobre o array 'dataList'. */}
        {/* Para cada objeto 'car' encontrado, ele renderiza o bloco visual (<View>) abaixo. */}
        {/* 3. Regras Técnicas: O 'index' está sendo usado como a 'key', para que o React nativo saiba diferenciar cada item renderizado na lista. */}
        {dataList.map((car, index) => (
          <View key={index} style={styles.carContainer}>
            <View style={styles.carDetails}>
              {/* Interpolação: Imprimindo na tela o nome e a categoria de cada carro */}
              <Text style={styles.carName}>{car.name}</Text>
              <Text style={styles.carCategory}>{car.category}</Text>

              {/* Uso do Operador Ternário dentro do estilo */}
              {/* Se a propriedade 'onSale' do carro for 'true', defina a cor como 'green' (verde), senão 'gray' (cinza). */}
              <Text style={[styles.carPrice, { color: car.onSale ? 'green' : 'gray' }]}>
                {formatCurrency(car.price)}
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