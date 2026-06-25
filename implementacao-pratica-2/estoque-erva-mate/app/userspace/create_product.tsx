import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/contexts/authContext";
import api from "../../src/services/api";
import { AppInput } from "../../src/components/AppInput";
import { AppButton } from "../../src/components/AppButton";

export default function CreateProductScreen() {
  const { token } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !brand || !price || !stockQty) {
      const msg = "Preencha os campos obrigatórios (Nome, Marca, Preço e Quantidade).";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Atenção", msg);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        brand,
        category: category || "Erva-Mate",
        price: parseFloat(price.replace(",", ".")),
        stock_qty: parseInt(stockQty, 10),
        description,
      };

      await api.post("/api/collections/products/records", payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const successMsg = "Produto cadastrado no estoque com sucesso!";
      if (Platform.OS === "web") {
        window.alert(successMsg);
        router.push("/userspace");
      } else {
        Alert.alert("Sucesso", successMsg, [
          { text: "OK", onPress: () => router.push("/userspace") }
        ]);
      }
    } catch (error) {
      console.error("Erro ao criar produto", error);
      const errMsg = "Não foi possível salvar o produto. Verifique os dados.";
      Platform.OS === "web" ? window.alert(errMsg) : Alert.alert("Erro", errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Novo Produto 🍃</Text>
      </View>

      <View style={styles.form}>
        <AppInput 
          label="Nome do Produto *" 
          placeholder="Ex: Erva-Mate Tradicional 1kg"
          value={name}
          onChangeText={setName}
        />

        <AppInput 
          label="Marca *" 
          placeholder="Ex: Barão, Madrugada, Ximango..."
          value={brand}
          onChangeText={setBrand}
        />

        <AppInput 
          label="Categoria" 
          placeholder="Ex: Pura Folha, Moagem Grossa, Acessórios..."
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <AppInput 
              label="Preço (R$) *" 
              placeholder="25.90"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 8 }}>
            <AppInput 
              label="Estoque (Qtd) *" 
              placeholder="50"
              keyboardType="number-pad"
              value={stockQty}
              onChangeText={setStockQty}
            />
          </View>
        </View>

        <AppInput 
          label="Descrição / Observações" 
          placeholder="Detalhes adicionais do produto..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={{ height: 80, textAlignVertical: "top" }}
        />

        <AppButton 
          title="Cadastrar Produto"
          onPress={handleSave}
          loading={loading}
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  backText: {
    color: "#4CAF50",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  form: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
