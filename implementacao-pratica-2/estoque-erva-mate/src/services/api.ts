import axios from "axios";

// No Expo Go Físico (via Wi-Fi), troque "10.0.2.2" pelo IP local do computador (ex: 192.168.1.100)
// No emulador Android, 10.0.2.2 aponta para o localhost do computador.
// No Expo Web ou iOS Simulator, use "http://localhost:8090/"

const api = axios.create({
  baseURL: "http://10.0.2.2:8090/",
});

export default api;
