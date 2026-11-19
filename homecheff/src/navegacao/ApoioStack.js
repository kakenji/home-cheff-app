import { TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import ApoioHomeScreen from "../screens/apoio/ApoioHomeScreen";
import RedeApoioScreen from "../screens/apoio/RedeApoioScreen";
import NovoContatoScreen from "../screens/contato/NovoContatoScreen";
import DiarioScreen from "../screens/apoio/DiarioScreen";
import NovaOcorrenciaScreen from "../screens/apoio/NovaOcorrenciaScreen";
import { cores } from "../tema/tema";
import { opcoesStack } from "./opcoesStack";

const Stack = createNativeStackNavigator();

export default function ApoioStack({ aoSair }) {
  return (
    <Stack.Navigator
      screenOptions={(props) => ({
        ...opcoesStack(props),
        headerRight: () => (
          <TouchableOpacity onPress={aoSair} hitSlop={10} style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}>
            <Ionicons name="exit-outline" size={18} color={cores.verde} />
            <Text style={{ marginLeft: 4, color: cores.verde, fontWeight: "600" }}>Sair</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="ApoioHome" options={{ headerShown: false }}>
        {(props) => <ApoioHomeScreen {...props} aoSair={aoSair} />}
      </Stack.Screen>
      <Stack.Screen name="RedeApoio" component={RedeApoioScreen} options={{ title: "Rede de apoio" }} />
      <Stack.Screen
        name="NovoContato"
        component={NovoContatoScreen}
        options={({ route }) => ({ title: route.params?.contato ? "Editar contato" : "Novo contato" })}
      />
      <Stack.Screen name="Diario" component={DiarioScreen} options={{ title: "Diário seguro" }} />
      <Stack.Screen
        name="NovaOcorrencia"
        component={NovaOcorrenciaScreen}
        options={({ route }) => ({ title: route.params?.ocorrencia ? "Editar registro" : "Novo registro" })}
      />
    </Stack.Navigator>
  );
}
