import colors from '@/constants/colors';
import paddingTop from '@/constants/screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, login2FA, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const [is2FAMode, setIs2FAMode] = useState(false);
  const [apiError, setApiError] = useState('')
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    code: false,
  });
  async function HandleSignin() {
    setApiError('');
    const newErrors = {
      email: !email.trim(),
      password: !password.trim(),
      code: false
    };

    setErrors(newErrors);
    if (newErrors.email || newErrors.password) {
      return;
    }
    
    const result = await login(email, password);
    console.log("Result: ", result);

    if (result.status === 'REQUIRES_2FA') {
      setIs2FAMode(true);
    } else if (result.status === 'SUCCESS') {
      console.log(result.status)
      router.replace('/(tabs)/home');
    } else {
      setApiError(result.message || 'Erro ao acessar a conta')
    }

    // const hasError = Object.values(newErrors).some(Boolean)
    // if (hasError) return;

    // setLoading(true)
    // console.log({ email, password })
    // setLoading(false)

    // router.replace('/(tabs)/home');
  }

  async function HandleConfirm2FA() {
    setApiError('');
    console.log(twoFactorCode);

    if (!twoFactorCode || twoFactorCode.length < 6) {
      setErrors(prev => ({...prev, code: true}));
      return;
    }
    const result = await login2FA(twoFactorCode);

    if (result.status === 'SUCCESS') {
      router.replace('/(tabs)/home');
    } else {
      setApiError(result.message || 'Código inválido ou expirado');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.beige }}>
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.beige }}
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
              {/* CORRIGIDO: Usando \n para quebra de linha em React Native */}
              {is2FAMode ? `\nVerifique sua identidade` : ''} 
            </Text>
            {is2FAMode && (
              <Text style={{color: colors.beige, marginBottom: 10, fontSize: 14}}>
                Enviamos um código para o email informado
              </Text>
            )}
          </View>

          <View style={styles.form}>

            {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

            {!is2FAMode ? (
              // Vinicius: Modo login normal
              <>
                <Field
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Field 
                  label="Senha"
                  value={password}
                  onChange={setPassword}
                  secure
                  error={errors.password}
                />
                <Pressable style={styles.button} onPress={HandleSignin} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color={colors.beige} />
                  ) : (
                    <Text style={styles.buttonText}>Acessar</Text>
                  )}
                </Pressable>
                <Link href='/(auth)/signup/page' style={styles.link}>
                  <Text style={styles.link}>Ainda não possui uma conta? Cadastre-se</Text>
                </Link>
              </>
            ) : (
              <>
                <Field 
                  label="Código de verificação"
                  value={twoFactorCode}
                  onChange={setTwoFactorCode}
                  error={errors.code}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="000000"
                />
                <Pressable style={styles.button} onPress={HandleConfirm2FA} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color={colors.beige}/>
                  ) : (
                    <Text style={styles.buttonText}>Validar Código</Text>
                  )}
                </Pressable>

                <TouchableOpacity style={styles.link} onPress={() => {
                  setIs2FAMode(false)
                  setApiError('')
                }}>
                  <Text style={{color: colors.orangeDark}}>Voltar para login</Text>
                  
                </TouchableOpacity>
              </>
            )}
            
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>



  );
}

function Field({ label, value, onChange, secure, error, ...props }: any) {
  return (
    <View>
      <Text style={[styles.label, error && styles.labelError]}>
        {label} {error && '*'}
      </Text>
      <TextInput
        placeholder={props.placeholder || label + '...'}
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        { ...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingTop,
    minHeight: '100%'
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
    paddingBottom: 40
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
  },
  errorDisplay: {
    color: colors.red,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#ffe6e6', // Fundo leve para destacar o erro
    padding: 10,
    borderRadius: 8,
  }
});