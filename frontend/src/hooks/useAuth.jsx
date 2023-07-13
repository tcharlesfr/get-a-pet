//api
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
    //disparador de mensagem
  const { setFlashMessage } = useFlashMessage();

  async function register(user) {
    //mensagens de sucesso e tipo
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "sucess";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data; //response(data)
      });
    } catch (error) {
      //mensagens de sucesso e tipo
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }
  return { register };
}
