import TabsPrincipais from "./TabsPrincipais";
import ApoioStack from "./ApoioStack";

export default function RaizNavegacao({ modoApoio, aoEntrarNoApoio, aoSair }) {
  return modoApoio ? <ApoioStack aoSair={aoSair} /> : <TabsPrincipais aoEntrarNoApoio={aoEntrarNoApoio} />;
}
