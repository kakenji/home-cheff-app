import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsPrincipais from "./TabsPrincipais";
import ApoioStack from "./ApoioStack";
import PerfilScreen from "../screens/perfil/PerfilScreen";
import { opcoesStack } from "./opcoesStack";

const Stack = createNativeStackNavigator();

function NavegacaoCozinha({ aoEntrarNoApoio }) {
  return (
    <Stack.Navigator screenOptions={opcoesStack}>
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {() => <TabsPrincipais aoEntrarNoApoio={aoEntrarNoApoio} />}
      </Stack.Screen>
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: "Seu perfil" }} />
    </Stack.Navigator>
  );
}

export default function RaizNavegacao({ modoApoio, aoEntrarNoApoio, aoSair }) {
  return modoApoio ? <ApoioStack aoSair={aoSair} /> : <NavegacaoCozinha aoEntrarNoApoio={aoEntrarNoApoio} />;
}
