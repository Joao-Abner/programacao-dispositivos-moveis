import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Switch,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenWrapperScrollable from './components/screen-wrappers/ScreenWrapperScrollable';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';

// Componente separado para usar o hook useSafeAreaInsets
// (precisa ser filho do SafeAreaProvider)
function LoadingBanner() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.loadingBanner, { paddingTop: insets.top + 8 }]}>
            <Text style={styles.loadingText}>⏳ Sistema Carregando...</Text>
        </View>
    );
}

export default function App() {

    // ─── Valores dos campos ────────────────────────────────────────────────────
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [aceitouTermos, setAceitouTermos] = useState(false);

    // ─── Mensagens de erro ────────────────────────────────────────────────────
    const [erroMatricula, setErroMatricula] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');

    // ─── Controles de UI ──────────────────────────────────────────────────────
    const [sistemaCarregado, setSistemaCarregado] = useState(false);
    const [botaoHabilitado, setBotaoHabilitado] = useState(false);

    // ─── REQUISITO 2: Ciclo de vida — loading simulado de 2s ─────────────────
    useEffect(() => {
        const timer = setTimeout(() => {
            setSistemaCarregado(true);
        }, 2000);
        return () => clearTimeout(timer); // limpeza ao desmontar
    }, []);

    // ─── REQUISITOS 5 e 9: Valida campos e habilita/desabilita o botão ────────
    useEffect(() => {
        setErroMatricula(matricula.length > 0 && matricula.length < 5
            ? 'Credencial deve ter no mínimo 5 caracteres' : '');

        setErroNome(nome.length > 0 && nome.length < 5
            ? 'Nome deve ter no mínimo 5 caracteres' : '');

        setErroEmail(email.length > 0 && !email.includes('@')
            ? 'Informe um e-mail institucional válido' : '');

        setErroSenha(senha.length > 0 && senha.length < 8
            ? 'Senha deve ter no mínimo 8 caracteres' : '');

        setErroConfirmarSenha(confirmarSenha.length > 0 && confirmarSenha !== senha
            ? 'As senhas não coincidem' : '');

        setBotaoHabilitado(
            matricula.length >= 5 &&
            nome.length >= 5 &&
            email.includes('@') &&
            senha.length >= 8 &&
            confirmarSenha === senha &&
            aceitouTermos
        );
    }, [matricula, nome, email, senha, confirmarSenha, aceitouTermos]);

    // ─── REQUISITO 10: Log de submissão no console ────────────────────────────
    const handleSubmit = () => {
        console.log('=== DADOS DO FORMULÁRIO ===');
        console.log({ matricula, nome, email, senha, confirmarSenha, aceitouTermos });
    };

    return (
        <SafeAreaProvider >
            <StatusBar style="auto" />

            {/* REQUISITO 2: Banner de loading — some após 2s */}
            {/* Se sistemaCarregado for falso, mostra o componente <LoadingBanner /> */}
            {!sistemaCarregado && <LoadingBanner />}

            {/* KeyboardAvoidingView evita que o teclado cubra os campos */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* REQUISITO 1: ScreenWrapper rolável com safe area */}
                <ScreenWrapperScrollable padding={24} gap={16}>

                    {/* REQUISITO 3: Identidade visual — logo UTFPR */}
                    <Image
                        source={require('./assets/utfpr-logo-fundo-branco.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>Cadastro Institucional</Text>
                    <Text style={styles.subtitle}>
                        Sistema de Gestão de Ativos de Patrimônio.
                    </Text>

                    {/* REQUISITO 4, 5, 6: FormInput com label, erro e estado */}
                    <FormInput
                        label="Credencial Institucional"
                        placeholder="Ex: joaosilva (servidor) ou a1234567 (aluno)"
                        value={matricula}
                        onChangeText={setMatricula}
                        autoCapitalize="none"
                        error={erroMatricula}
                    />
                    <FormInput
                        label="Nome Completo"
                        placeholder="Seu nome completo"
                        value={nome}
                        onChangeText={setNome}
                        autoCapitalize="words"
                        error={erroNome}
                    />
                    <FormInput
                        label="E-mail Institucional"
                        placeholder="nome@utfpr.edu.br"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={erroEmail}
                    />
                    <FormInput
                        label="Senha"
                        placeholder="Mínimo 8 caracteres"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        error={erroSenha}
                    />
                    <FormInput
                        label="Confirmação de Senha"
                        placeholder="Repita sua senha"
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry
                        error={erroConfirmarSenha}
                    />

                    {/* REQUISITO 7: Switch — Aceite dos Termos de Uso */}
                    <View style={styles.switchRow}>
                        <Switch
                            value={aceitouTermos}
                            onValueChange={setAceitouTermos}
                            trackColor={{ false: '#CBD5E1', true: '#1A56A0' }}
                            thumbColor={aceitouTermos ? '#FFFFFF' : '#F1F5F9'}
                        />
                        <Text style={styles.switchLabel}>
                            Aceito os Termos de Uso e Política de Privacidade
                        </Text>
                    </View>

                    {/* REQUISITO 8 e 9: FormButton habilitado/desabilitado dinamicamente */}
                    <FormButton
                        label="Cadastrar"
                        onPress={handleSubmit}
                        disabled={!botaoHabilitado}
                    />

                    {/* Rodapé institucional */}
                    <Text style={styles.footer}>
                        UTFPR - Universidade Tecnológica Federal do Paraná - Câmpus Guarapuava.
                    </Text>

                </ScreenWrapperScrollable>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    // Banner de loading: cobre toda a largura, paddingTop vem do useSafeAreaInsets
    loadingBanner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#1A56A0',
        paddingBottom: 10,
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },

    // Logo UTFPR centralizado
    logo: {
        width: '100%',
        height: 80,
        marginTop: 12,
        marginBottom: 4,
    },

    // Títulos do formulário
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1C1C1E',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 8,
    },

    // Linha do Switch
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 4,
    },
    switchLabel: {
        flex: 1,
        fontSize: 11,
        color: '#374151',
        lineHeight: 20,
    },

    // Rodapé discreto
    footer: {
        fontSize: 12,
        color: '#94A3B8',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 12,
        lineHeight: 18,
    },
});

