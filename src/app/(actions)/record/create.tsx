import colors from "@/constants/colors";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateRecord() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [nameResponsible, setNameRsp] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [school, setSchool] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [reporter, setReporter] = useState("");

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;

    if (Platform.OS === 'android') {
      setShow(false);
    }

    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formattedDate = date.toLocaleDateString('pt-BR');

  const handleCreate = () => {
    const payload = { name, date, nameResponsible, address, school };

    console.log("Criar relatório:", payload);
    // await api.post("/records", payload);

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.label}>Nome da criança</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={name}
        onChangeText={setName}
      />

      <View>
        <Text style={styles.label}>Data de nascimento:</Text>

        <TouchableOpacity onPress={showDatepicker} style={styles.inputButton}>
          <Text style={styles.inputText}>{formattedDate}</Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
            display="default"
          />
        )}

        {Platform.OS === 'ios' && show && (
          <Button title="Confirmar Data" onPress={() => setShow(false)} />
        )}
      </View>

      <Text style={styles.label}>Nome do responsável</Text>
      <TextInput
        style={styles.input}
        placeholder="Responsável da criança"
        value={nameResponsible}
        onChangeText={setNameRsp}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço residencial"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Escola</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da escola"
        value={school}
        onChangeText={setSchool}
      />

      <View>
        <Text style={styles.label}>Demanda:</Text>

        <View style={styles.inputWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Selecione uma opção..." value="" enabled={false} color={colors.beige} />

            <Picker.Item label="Agressão" value="01" />
            <Picker.Item label="Depressão" value="02" />
            <Picker.Item label="Trauma" value="03" />
            <Picker.Item label="Outros" value="04" />
          </Picker>
        </View>
      </View>

      <Text style={styles.label}>Relato</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Escreva aqui..."
        value={content}
        onChangeText={setContent}
        multiline
      />


      <Text style={styles.label}>Relator</Text>
      <TextInput
        style={styles.input}
        placeholder="Relator(a) da história"
        value={reporter}
        onChangeText={setReporter}
      />

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Criar</Text>
      </Pressable>
    </ScrollView>
  );
}

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
    borderRadius: 8,
  },
  inputButton: {
    marginTop: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  inputText: {
    fontSize: 16,
  },
  textarea: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 140,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.orangeLight,
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: colors.beige,
    fontSize: 16
  },

  container: {
    padding: 20,
    gap: 10,
  },
  inputWrapper: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  }
});
