import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaComprasScreen from "../screens/compras/ListaComprasScreen";
import NovoItemCompraScreen from "../screens/compras/NovoItemCompraScreen";
import CabecalhoHomeCheff from "../componentes/CabecalhoHomeCheff";
import { cores, fonteTitulo } from "../tema/tema";

const Stack = createNativeStackNavigator();

export default function ComprasStack({ aoEntrarNoApoio }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.fundo },
        headerShadowVisible: false,
        headerTintColor: cores.verde,
        headerTitleStyle: { fontFamily: fonteTitulo, fontWeight: "bold", color: cores.texto },
      }}
    >
      <Stack.Screen name="ListaCompras" component={ListaComprasScreen} options={{ header: () => <CabecalhoHomeCheff /> }} />
      <Stack.Screen
        name="NovoItemCompra"
        options={({ route }) => ({ title: route.params?.itemCompra ? "Editar item" : "Adicionar item" })}
      >
        {(props) => <NovoItemCompraScreen {...props} aoEntrarNoApoio={aoEntrarNoApoio} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
