import axios from "axios";
import { Platform } from "react-native";

// No Web ou iOS Simulator: http://127.0.0.1:8090
// No Android Emulador: http://10.0.2.2:8090
// No Celular Físico (Expo Go Wi-Fi): troque por http://SEU_IP_LOCAL:8090

const getBaseUrl = () => {
  if (Platform.OS === "web") {
    return "http://127.0.0.1:8090/";
  }
  return "http://10.0.2.2:8090/";
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;
