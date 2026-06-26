import axios from "axios";
import { Platform } from "react-native";

// No Web ou iOS Simulator: http://127.0.0.1:8090
// No Android Emulador: http://10.0.2.2:8090
// No Celular Físico (Expo Go Wi-Fi): troque por http://SEU_IP_LOCAL:8090

const getBaseUrl = () => {
  if (Platform.OS === "web") {
    // Se acessado via IP da rede (ex: no browser do celular), usa o mesmo IP para a API
    if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      return `http://${window.location.hostname}:8090/`;
    }
    return "http://127.0.0.1:8090/";
  }
  return "http://192.168.3.120:8090/";
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;
