import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import InicioScreen from "../screens/inicio/InicioScreen";
import ReceitasStack from "./ReceitasStack";
import ComprasStack from "./ComprasStack";
import { cores } from "../tema/tema";

const Tab = createBottomTabNavigator();

function icone(nome) {
  return ({ focused, color }) => <Ionicons name={focused ? nome : `${nome}-outline`} size={22} color={color} />;
}

export default function TabsPrincipais({ aoEntrarNoApoio }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: cores.cartao, borderTopColor: cores.borda },
        tabBarActiveTintColor: cores.verde,
        tabBarInactiveTintColor: cores.textoSuave,
      }}
    >
      <Tab.Screen name="Início" component={InicioScreen} options={{ tabBarIcon: icone("home") }} />
      <Tab.Screen name="Receitas" component={ReceitasStack} options={{ tabBarIcon: icone("book") }} />
      <Tab.Screen name="Despensa" options={{ tabBarIcon: icone("basket") }}>
        {() => <ComprasStack aoEntrarNoApoio={aoEntrarNoApoio} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
