import colors from '@/constants/colors';
import paddingTop from '@/constants/screen';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    telefone: false,
    cpf: false,
    password: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  function HandleSignup() {
    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      telefone: !telefone.trim(),
      cpf: !cpf.trim(),
      password: !password.trim(),
      confirmPassword: !confirmPassword.trim(),
      passwordMismatch: password !== confirmPassword,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setLoading(true);
    console.log({ name, email, telefone, cpf, password });
    setLoading(false);

    router.replace('../(panel)/profile/page');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.beige }}>
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
              value={telefone}
              onChange={setTelefone}
              error={errors.telefone}
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
    </SafeAreaView>
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
