// ============================================================
// Stack da aba "Receitas": lista → detalhe → nova/editar receita.
// ============================================================
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaReceitasScreen from "../screens/receitas/ListaReceitasScreen";
import DetalheReceitaScreen from "../screens/receitas/DetalheReceitaScreen";
import NovaReceitaScreen from "../screens/receitas/NovaReceitaScreen";
import CabecalhoHomeCheff from "../componentes/CabecalhoHomeCheff";
import { cores, fonteTitulo } from "../tema/tema";

const Stack = createNativeStackNavigator();

export default function ReceitasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.fundo },
        headerShadowVisible: false,
        headerTintColor: cores.verde,
        headerTitleStyle: { fontFamily: fonteTitulo, fontWeight: "bold", color: cores.texto },
      }}
    >
      <Stack.Screen name="ListaReceitas" component={ListaReceitasScreen} options={{ header: () => <CabecalhoHomeCheff /> }} />
      <Stack.Screen name="DetalheReceita" component={DetalheReceitaScreen} options={{ title: "Receita" }} />
      <Stack.Screen
        name="NovaReceita"
        component={NovaReceitaScreen}
        options={({ route }) => ({ title: route.params?.receita ? "Editar receita" : "Nova receita" })}
      />
    </Stack.Navigator>
  );
}
