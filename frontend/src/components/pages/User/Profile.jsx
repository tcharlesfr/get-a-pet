//importar api para utilizar as conexoes
import api from '../../../utils/api'
import { useState, useEffect } from 'react';

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'
import Input from '../../form/Input'

function Profile() {
  const [user, setUser] = useState({})
  //pegar o token com informações do storage
  const [token] = useState(localStorage.getItem('token') || '')


  useEffect(() => {
    //checar o usuario
    api.get('/users/checkuser', {
      headers: {
        //garantindo que o token vai ser enviado da forma correta
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data)
    })
  }, [token])

  function onFileChange(e){
    
  }
  function handleChange(e){
    
  }
    return (
      <section>
        <div className={styles.profile_header}>
        <h1>Perfil</h1>
        <p>imagem</p>
        </div>
        <form action="" className={formStyles.form_container}>
          <Input
            text='Imagem'
            type='file'
            name='image'
            handleOnChange={onFileChange}
          />
          <Input
            text='E-mail'
            type='email'
            name='email'
            placeholder='Digite o seu e-mail'
            handleOnChange={handleChange}
            value={user.email || ''}
          />
          <Input
            text='Nome'
            type='text'
            name='name'
            placeholder='Digite o seu nome'
            handleOnChange={handleChange}
            value={user.name || ''}
          />
          <Input
            text='Telefone'
            type='text'
            name='phone'
            placeholder='Digite o seu telefone'
            handleOnChange={handleChange}
            value={user.phone || ''}
          />
          <Input
            text='Senha'
            type='password'
            name='password'
            placeholder='Digite a sua senha'
            handleOnChange={handleChange}
          />
          <Input
            text='Confirmação de Senha'
            type='password'
            name='confirmpassword'
            placeholder='confirme a sua senha'
            handleOnChange={handleChange}            
          />
          <input type="submit" value='Editar'/>
         
        </form>
      </section>
    );
  }
  
  export default Profile;
  