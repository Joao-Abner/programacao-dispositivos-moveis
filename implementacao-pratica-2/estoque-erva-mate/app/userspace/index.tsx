import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/contexts/authContext";
import api from "../../src/services/api";
import { Product } from "../../src/types/Product";
import { ProductCard } from "../../src/components/ProductCard";

export default function ProductListScreen() {
  const { token, logout, user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/collections/products/records", {
        headers: {
          Authorization: token,
        },
      });

      setProducts(response.data.items);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      if (Platform.OS === "web") {
        window.alert("Não foi possível carregar a lista de produtos.");
      } else {
        Alert.alert("Erro de Conexão", "Não foi possível carregar a lista de produtos da API.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.email || "Admin"} 🧉</Text>
          <Text style={styles.title}>Estoque Erva-Mate</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <FlatList 
          data={products}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onPress={() => router.push(`/userspace/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum produto cadastrado ainda. 🍃</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push("/userspace/create_product")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  greeting: {
    fontSize: 12,
    color: "#666",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ff5252",
  },
  logoutText: {
    color: "#ff5252",
    fontSize: 12,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // espaço pro FAB
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: -2,
  }
});
