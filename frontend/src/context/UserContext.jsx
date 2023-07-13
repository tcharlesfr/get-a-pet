import { createContext } from "react";

//hooks
import useAuth from "../hooks/useAuth";

// criando contexto
const Context = createContext();

//seguindo a convensão mais utilizada
//criar um provedor deste contexto, vai dar contexto para as outras entidades
//passar chidren para saber o que tem que imprimir dentro dele, que componente ele vai passar tal dado
function UserProvider({ children }) { 
  const { register } = useAuth();

  //prover o contexto, value passa as funções  e propriedades
  return <Context.Provider value={{ register }}>{children}</Context.Provider>;
}

export { Context, UserProvider };