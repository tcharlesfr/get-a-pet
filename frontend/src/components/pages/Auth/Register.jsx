import Input from "../../form/Input";
import styles from '../../form/Form.module.css'
import { useState, useContext } from "react";
import {Link} from 'react-router-dom'

// contexto
import { Context } from "../../../context/UserContext";

function Register() {

  const [user, setUser] = useState({})
  const {register} = useContext(Context)

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value })//pegar o objeto atual e adicionar
  }

  function handleSubmit(e){
    e.preventDefault()
    //enviar usuario para o banco
    register(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta?<Link to='/login'>Clique aqui.</Link>
      </p>
    </section>
  );
}

export default Register;
