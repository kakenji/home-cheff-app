import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { mensagemDeErro } from "../servicos/api";

export default function useDadosDaApi(buscar, valorInicial = null) {
  const [dados, setDados] = useState(valorInicial);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setDados(await buscar());
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }, [buscar]);

  useFocusEffect(
    useCallback(() => {
      recarregar();
    }, [recarregar])
  );

  return { dados, setDados, carregando, erro, recarregar };
}
