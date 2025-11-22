import colors from '@/constants/colors';
import paddingTop from '@/constants/screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  function HandleSignin() {
    const newErrors = {
      email: !email.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean)
    if (hasError) return;

    setLoading(true)
    console.log({ email, password })
    setLoading(false)

    router.replace('/(tabs)/home');
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
            <Text style={styles.logoText}>
              Sofis<Text style={{ color: colors.orangeDark, fontFamily: 'Baloo' }}>App</Text>
            </Text>
            <Text style={styles.slogan}>
              Facilitando o cuidado, fortalecendo propósitos.
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              error={errors.email}
            />

            <Field
              label="Senha"
              value={password}
              onChange={setPassword}
              secure
              error={errors.password}
            />

            <Pressable style={styles.button} onPress={HandleSignin}>
              <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Acessar'}</Text>
            </Pressable>

            <Link href='/(auth)/signup/page' style={styles.link}>
              <Text>Ainda não possui uma conta? Cadastre-se</Text>
            </Link>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>



  );
}

function Field({ label, value, onChange, secure, error }: any) {
  return (
    <View>
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
  logoText: {
    fontFamily: 'Baloo',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.beige,
    marginBottom: 8,
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
    marginBottom: 16,
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
  link: {
    marginTop: 16,
    textAlign: 'center'
  },
  errorText: {
    color: colors.red,
    marginBottom: 10,
    fontSize: 16
  }
});
