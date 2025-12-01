import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import GlobalList from "@/components/GlobalList";
import RecordCard from "@/components/RecordCard";
import SearchBar from "@/components/SearchBar";

export default function RecordScreen() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await AsyncStorage.getItem("search_history");
      if (data) setHistory(JSON.parse(data));
    } catch {}
  }

  async function saveToHistory(text: string) {
    if (!text.trim()) return;

    const newHistory = [text, ...history.filter((h) => h !== text)].slice(0, 10);

    setHistory(newHistory);
    await AsyncStorage.setItem("search_history", JSON.stringify(newHistory));
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(query);
      if (query) saveToHistory(query);
    }, 500);

    return () => clearTimeout(t);
  }, [query]);

  async function fetchAll() {
    const res = await fetch(`https://sofis-api.onrender.com/api/v1/Children`);
    return res.ok ? res.json() : [];
  }

  async function fetchByName(text: string) {
    const res = await fetch(`https://sofis-api.onrender.com/api/v1/Children/name/${text}`);
    return res.ok ? res.json() : [];
  }

  async function fetchByCPF(text: string) {
    const res = await fetch(`https://sofis-api.onrender.com/api/v1/Children/cpf/${text}`);
    return res.ok ? res.json() : [];
  }

  async function fetchById(text: string) {
    if (!/^\d+$/.test(text)) return [];
    const res = await fetch(`https://sofis-api.onrender.com/api/v1/Children/${text}`);
    return res.ok ? [await res.json()] : [];
  }

  useEffect(() => {
    let ignore = false;

    async function search() {
      setLoading(true);

      try {
        let results: any[] = [];

        if (!debounced) {
          results = await fetchAll();
        } else {
          const [byName, byCPF, byId] = await Promise.all([
            fetchByName(debounced),
            fetchByCPF(debounced),
            fetchById(debounced),
          ]);

          results = [...byName, ...byCPF, ...byId].reduce((acc: any[], curr) => {
            if (!acc.some((i) => i.id === curr.id)) acc.push(curr);
            return acc;
          }, []);
        }

        if (ignore) return;
        setRecords(results);
      } catch {
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }

    search();

    return () => {
      ignore = true;
    };
  }, [debounced]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por nome, CPF ou ID..."
        loading={loading}
      />

      {history.length > 0 && !query && (
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Pesquisas recentes:</Text>
            <TouchableOpacity
              onPress={async () => {
                setHistory([]);
                await AsyncStorage.removeItem("search_history");
              }}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "#e0e0e0",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#333", fontSize: 13 }}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {history.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setQuery(item)}
              style={{
                paddingVertical: 2,
                paddingHorizontal: 12,
                backgroundColor: "#f3f3f3",
                borderRadius: 8,
                marginBottom: 6,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 3,
              }}
            >
              <Text style={{ color: "#333" }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <GlobalList
        loading={loading}
        data={records}
        renderItem={(record) => (
          <RecordCard
            key={record.id}
            {...record}
            onPress={() => router.push(`/record/${record.id}`)}
          />
        )}
        fabOnPress={() => router.push("/record/create")}
      />
    </ScrollView>
  );
}
