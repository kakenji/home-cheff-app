import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaReceitasScreen from "../screens/receitas/ListaReceitasScreen";
import DetalheReceitaScreen from "../screens/receitas/DetalheReceitaScreen";
import NovaReceitaScreen from "../screens/receitas/NovaReceitaScreen";
import CabecalhoHomeCheff from "../componentes/CabecalhoHomeCheff";
import { opcoesStack } from "./opcoesStack";

const Stack = createNativeStackNavigator();

export default function ReceitasStack() {
  return (
    <Stack.Navigator screenOptions={opcoesStack} initialRouteName="ListaReceitas">
      <Stack.Screen
        name="ListaReceitas"
        component={ListaReceitasScreen}
        options={({ navigation }) => ({
          header: () => <CabecalhoHomeCheff aoVoltar={() => navigation.navigate("Início")} />,
        })}
      />
      <Stack.Screen name="DetalheReceita" component={DetalheReceitaScreen} options={{ title: "Receita" }} />
      <Stack.Screen
        name="NovaReceita"
        component={NovaReceitaScreen}
        options={({ route }) => ({ title: route.params?.receita ? "Editar receita" : "Nova receita" })}
      />
    </Stack.Navigator>
  );
}
