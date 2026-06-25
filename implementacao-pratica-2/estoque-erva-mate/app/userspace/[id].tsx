import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../src/contexts/authContext";
import api from "../../src/services/api";
import { AppInput } from "../../src/components/AppInput";
import { AppButton } from "../../src/components/AppButton";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/api/collections/products/records/${id}`, {
          headers: { Authorization: token }
        });
        const p = response.data;
        setName(p.name);
        setBrand(p.brand);
        setCategory(p.category);
        setPrice(String(p.price));
        setStockQty(String(p.stock_qty));
        setDescription(p.description || "");
      } catch (error) {
        const msg = "Erro ao carregar detalhes do produto.";
        Platform.OS === "web" ? window.alert(msg) : Alert.alert("Erro", msg);
        router.back();
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleUpdate = async () => {
    if (!name || !brand || !price || !stockQty) {
      const msg = "Preencha os campos obrigatórios.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Atenção", msg);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name,
        brand,
        category,
        price: parseFloat(price.replace(",", ".")),
        stock_qty: parseInt(stockQty, 10),
        description,
      };

      await api.patch(`/api/collections/products/records/${id}`, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const successMsg = "Produto atualizado com sucesso!";
      if (Platform.OS === "web") {
        window.alert(successMsg);
        router.push("/userspace");
      } else {
        Alert.alert("Sucesso", successMsg, [
          { text: "OK", onPress: () => router.push("/userspace") }
        ]);
      }
    } catch (error) {
      const errMsg = "Falha ao atualizar produto.";
      Platform.OS === "web" ? window.alert(errMsg) : Alert.alert("Erro", errMsg);
    } finally {
      setSaving(false);
    }
  };

  const executeDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/api/collections/products/records/${id}`, {
        headers: { Authorization: token }
      });
      const delMsg = "Produto removido do estoque.";
      if (Platform.OS === "web") {
        window.alert(delMsg);
        router.push("/userspace");
      } else {
        Alert.alert("Excluído", delMsg, [
          { text: "OK", onPress: () => router.push("/userspace") }
        ]);
      }
    } catch (error) {
      const failMsg = "Não foi possível excluir o produto.";
      Platform.OS === "web" ? window.alert(failMsg) : Alert.alert("Erro", failMsg);
      setDeleting(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Tem certeza que deseja excluir este produto permanentemente?")) {
        executeDelete();
      }
    } else {
      Alert.alert(
        "Confirmar Exclusão",
        "Confirma a exclusão definitiva deste produto do estoque?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Excluir", style: "destructive", onPress: executeDelete }
        ]
      );
    }
  };

  if (loadingInitial) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Produto 🧉</Text>
      </View>

      <View style={styles.form}>
        <AppInput label="Nome *" value={name} onChangeText={setName} />
        <AppInput label="Marca *" value={brand} onChangeText={setBrand} />
        <AppInput label="Categoria" value={category} onChangeText={setCategory} />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <AppInput label="Preço *" keyboardType="numeric" value={price} onChangeText={setPrice} />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <AppInput label="Estoque *" keyboardType="number-pad" value={stockQty} onChangeText={setStockQty} />
          </View>
        </View>

        <AppInput 
          label="Descrição" 
          value={description} 
          onChangeText={setDescription} 
          multiline 
          numberOfLines={3}
          style={{ height: 80, textAlignVertical: "top" }}
        />

        <AppButton title="Salvar Alterações" onPress={handleUpdate} loading={saving} style={{ marginTop: 16 }} />

        <TouchableOpacity 
          style={styles.deleteBtn} 
          onPress={handleDeleteConfirm}
          disabled={deleting}
        >
          {deleting ? (
            <ActivityIndicator color="#ff5252" />
          ) : (
            <Text style={styles.deleteText}>🗑️ Excluir Produto</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { marginBottom: 24 },
  backText: { color: "#4CAF50", fontSize: 16, marginBottom: 8, fontWeight: "bold" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2E7D32" },
  form: { width: "100%" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  deleteBtn: {
    marginTop: 24,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff5252",
    borderRadius: 8,
  },
  deleteText: { color: "#ff5252", fontWeight: "bold", fontSize: 16 }
});
