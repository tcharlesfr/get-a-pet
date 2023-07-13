import { useState } from "react";

import styles from "./Message.module.css";

function Message() {
  const [type, setType] = useState("");

  //div onde mostra a mensagem, com classe de stilos,
  //com tipo de mensagem também, onde muda com o css
  //variavel dinamica
  return (
    <div className={`${styles.message} ${styles[type]}`}>mensagem aqui</div>
  );
}

export default Message;
