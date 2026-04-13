import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenWrapperFullScreen from './components/screen-wrappers/ScreenWrapperFullScreen';
import ScreenWrapperScrollable from './components/screen-wrappers/ScreenWrapperScrollable';

interface AtivoPatrimonial {
    tombo: string;
    nome: string;
    descricao: string;
}

const ativosMock: AtivoPatrimonial[] = [
    {
        tombo: "102548",
        nome: "Projetor Epson PowerLite",
        descricao: "Projetor multimídia localizado no auditório principal, bloco A.",
    },
    {
        tombo: "205421",
        nome: "Microscópio Binocular Nikon",
        descricao: "Equipamento de precisão utilizado no laboratório de biologia II.",
    },
    {
        tombo: "301254",
        nome: "Notebook Dell Latitude 3420",
        descricao: "Patrimônio da secretaria acadêmica, processador i5, 16GB RAM.",
    },
    {
        tombo: "400215",
        nome: "Mesa de Escritório Ergonômica",
        descricao: "Conjunto de mesa L em MDF, sala de Física.",
    },
    {
        tombo: "508741",
        nome: "Mesa de Escritório Giratória",
        descricao: "Mesa giratória em MDF, sala de Química.",
    },
    {
        tombo: "608741",
        nome: "Cadeira de Escritório Giratória",
        descricao: "Cadeira giratória em MDF, sala de Química.",
    },
    {
        tombo: "708741",
        nome: "Cadeira de Escritório Giratória",
        descricao: "Cadeira giratória em MDF, sala de Química.",
    },
    {
        tombo: "808741",
        nome: "Cadeira de Escritório Giratória",
        descricao: "Cadeira giratória em MDF, sala de Química.",
    },
    {
        tombo: "908741",
        nome: "Cadeira de Escritório Giratória",
        descricao: "Cadeira giratória em MDF, sala de Química.",
    },
    {
        tombo: "108741",
        nome: "Cadeira de Escritório Giratória",
        descricao: "Cadeira giratória em MDF, sala de Química.",
    },
];


// TESTE 1: Descomente para ver a tela de Login (FullScreen)
export default function App() {
    return (
        <SafeAreaProvider>
            <ScreenWrapperFullScreen center gap={20}>
                {/* onde ficam os icones superiores do dispositivo mobile */}
                <StatusBar style="auto" />

                {/* Logo Circular */}
                <View style={styles.logoCircle}>
                    <View style={styles.logoInner} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>Bem-vindo</Text>
                    <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-MAIL</Text>
                        <TextInput
                            placeholder="exemplo@email.com"
                            placeholderTextColor="#999"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>SENHA</Text>
                        <TextInput
                            secureTextEntry
                            placeholder="••••••••"
                            placeholderTextColor="#999"
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.forgotPass}>
                        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>
            </ScreenWrapperFullScreen>
        </SafeAreaProvider>
    );
}

// TESTE 2: Descomente para ver a tela de Lista (Scrollable)
// export default function App() {
//     return (
//         <SafeAreaProvider>
//             <ScreenWrapperScrollable padding={20} gap={20} onRefresh={() => alert('Sincronizando com o Banco de Dados...')}>
//                 <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Ativos de Patrimônio</Text>
//                 {ativosMock.map((ativo) => (
//                     <View key={ativo.tombo} style={styles.card}>
//                         <View style={styles.tomboBadge}>
//                             <Text style={styles.tomboText}>#{ativo.tombo}</Text>
//                         </View>
//                         <Text style={styles.ativoNome}>{ativo.nome}</Text>
//                         <Text style={styles.ativoDescricao}>{ativo.descricao}</Text>
//                     </View>
//                 ))}
//             </ScreenWrapperScrollable>
//         </SafeAreaProvider>

//     );
// }

const styles = StyleSheet.create({
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F0F2F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    logoInner: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: '#007AFF',
        transform: [{ rotate: '45deg' }]
    },
    header: {
        alignItems: 'center',
        marginBottom: 40
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 8
    },
    subtitle: {
        fontSize: 16,
        color: '#636366',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: '#8E8E93',
        letterSpacing: 1,
        marginBottom: 8,
        marginLeft: 4
    },
    input: {
        backgroundColor: '#F2F2F7',
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1C1C1E',
    },
    button: {
        backgroundColor: '#007AFF',
        height: 52,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        boxShadow: '0px 4px 8px rgba(0, 122, 255, 0.2)', // sombra que funciona no ios
        elevation: 3 // uma sombra que fica abaixo do botão, mas só funciona no android 
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    forgotPass: {
        alignItems: 'center',
        marginTop: 20
    },
    forgotText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500'
    },
    listTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        // Sombra leve para destacar os cartões
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: '#007AFF', // Barra lateral azul para dar destaque
    },
    tomboBadge: {
        backgroundColor: '#F2F2F7',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    tomboText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#007AFF',
    },
    ativoNome: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    ativoDescricao: {
        fontSize: 14,
        color: '#636366',
        lineHeight: 20,
    },
});