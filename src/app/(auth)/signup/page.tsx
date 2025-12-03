import colors from '@/constants/colors';
import paddingTop from '@/constants/screen';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export default function Signup() {
  const {register, isLoading: isContextLoading} = useAuth();
  const [apiError, setApiError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    cpf: false,
    password: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  async function HandleSignup() {
    setApiError('');
    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      phone: !phone.trim(),
      cpf: !cpf.trim(),
      password: !password.trim(),
      confirmPassword: !confirmPassword.trim(),
      passwordMismatch: password !== confirmPassword,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setLoading(true);
    console.log({ name, email, phone, cpf, password });
    try{
      const result = await register(name, email, phone, cpf, 0, password);
      if (result.status === 'SUCCESS') {
        Alert.alert(
          "Sucesso",
          "Seu cadastro foi realizado com sucesso. Faça login para acessar sua conta",
          [{text: "OK", onPress: () => router.replace('login')}]
        );
      } else{
        setApiError(result.message || 'Erro desconhecido ao cadastrar.');
      }
    } catch (error){
      console.error("Erro no cadastro:", error);
      setApiError("Erro desconhecido ao cadastrar.");
    } finally{
    setLoading(false);
    }


    router.replace('../(panel)/profile/page');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.beige }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={colors.gradient.warm}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={24} color={colors.orangeLight} />
            </Pressable>
            <Text style={styles.slogan}>
              Criar uma conta
            </Text>
          </View>
          {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

          <View style={styles.form}>

            <Field
              label="Nome Completo"
              value={name}
              onChange={setName}
              error={errors.name}
            />

            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              error={errors.email}
            />

            <Field
              label="Telefone"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
            />

            <Field
              label="CPF"
              value={cpf}
              onChange={setCPF}
              error={errors.cpf}
            />

            <Field
              label="Senha"
              value={password}
              onChange={setPassword}
              secure
              error={errors.password}
            />

            <Field
              label="Confirme a senha"
              value={confirmPassword}
              onChange={setConfirmPassword}
              secure
              error={errors.confirmPassword || errors.passwordMismatch}
            />

            {errors.passwordMismatch && (
              <Text style={styles.errorText}>As senhas não coincidem.</Text>
            )}

            <Pressable style={styles.button} onPress={HandleSignup} disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Carregando...' : 'Cadastrar'}
              </Text>
            </Pressable>

          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, value, onChange, secure, error }: any) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={[styles.label, error && styles.labelError]}>
        {label} {error && '*'}
      </Text>
      <TextInput
        placeholder={label + '...'}
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingTop
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  slogan: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.beige,
    marginBottom: 24,
  },
  form: {
    flex: 1,
    backgroundColor: colors.beige,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14,
  },
  label: {
    fontFamily: 'Nunito',
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  labelError: {
    color: colors.red,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
  },
  inputError: {
    borderColor: colors.red,
  },
  button: {
    backgroundColor: colors.orangeDark,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
  },
  buttonText: {
    color: colors.beige,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: colors.beige,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8
  },
  errorText: {
    color: colors.red,
    marginBottom: 10,
    fontSize: 14,
  },
});
