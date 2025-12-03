import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator, Alert } from "react-native";
// IMPORTANTE: Você precisa garantir que seu módulo 'api' esteja configurado e importado corretamente.
// import api from 'path/to/your/api/config'; 

// 1. Defina a interface (ou type) dos dados esperados.
interface ReportData {
  id: string;
  title: string;
  description: string;
  // Campos de relacionamento (podem ser strings para exibição ou IDs)
  childName: string; 
  employeeName: string;
  // Se for enviar, precisa dos IDs (se editáveis, senão podem ser nulos no estado)
  // childId: string;
  // employeeId: string;
}

// Renomeado para EditReport para clareza
export default function EditReport() { 
  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();

  // Estados alinhados com a Entidade Report
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [childName, setChildName] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. Lógica para carregar os dados existentes
  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      console.log("Carregar dados do Relatório:", id);

      try {
        // CHAMADA API REAL (DESCOMENTE E AJUSTE O ENDPOINT/MÉTODO)
        // const response = await api.get(/reports/${id});
        // const data: ReportData = response.data;

        // MOCK DE DADOS TEMPORÁRIO para testes
        const mockData: ReportData = {
          id: id,
          title: "Relatório de Exemplo Carregado",
          description: "Conteúdo do relatório carregado da API, pronto para edição.",
          childName: "Nome da Criança Associada",
          employeeName: "Nome do Funcionário Associado",
        };
        const data = mockData;
        
        // Configurar estados
        setTitle(data.title);
        setDescription(data.description);
        setChildName(data.childName);
        
      } catch (error) {
        console.error("Erro ao carregar dados do relatório:", error);
        Alert.alert("Erro", "Não foi possível carregar o relatório para edição.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // 3. Função para salvar as alterações
  const handleSave = async () => {
    // 1. Validação básica (opcional)
    if (!title || !description) {
        Alert.alert("Atenção", "Título e Descrição não podem ser vazios.");
        return;
    }
      
    // Payload enviado para a API
    const payload = { 
        id, // O ID é enviado no corpo para o método PUT/PATCH
        title, 
        description,
        // Inclua outros campos editáveis, como childId e employeeId, se necessário
    };

    console.log("Atualizar Relatório:", id, payload);
    
    // CHAMADA API REAL (DESCOMENTE E AJUSTE O ENDPOINT/MÉTODO)
    /*
    try {
        const response = await api.put(/reports/${id}, payload); 
        
        if (response.status === 200 || response.status === 204) {
            Alert.alert("Sucesso", "Relatório salvo com sucesso!");
            router.back();
        } else {
            // Tratar códigos de erro específicos
            Alert.alert("Erro", "Falha ao salvar. Status: " + response.status);
        }
    } catch (error) {
        console.error("Erro ao salvar relatório:", error);
        Alert.alert("Erro", "Ocorreu um erro na comunicação com a API.");
    }
    */
    
    // Simulação de sucesso (remover após descomentar a API real)
    Alert.alert("Sucesso", "Relatório salvo com sucesso! (Simulação)");
    router.back(); 
  };
  
  // Se estiver carregando, mostra o indicador
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff8a00" />
        <Text>Carregando Relatório...</Text>
      </View>
    );
  }

  // 4. Estrutura do formulário
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10}}>Editar Relatório</Text>

      <Text style={styles.label}>Criança Associada</Text>
      {/* Campo de Paciente/Criança é geralmente somente para leitura no Relatório */}
      <TextInput style={styles.inputDisabled} value={childName} editable={false} /> 

      <Text style={styles.label}>Título</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Título do Relatório"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.textarea}
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Conteúdo detalhado do relatório..."
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </Pressable>
    </ScrollView>
  );
}

// 5. Estilos
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  inputDisabled: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0", // Cor para indicar que é não editável
    borderRadius: 8,
    color: '#333'
  },
  textarea: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    minHeight: 140,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff8a00",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});