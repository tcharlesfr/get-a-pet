import api from '../../../utils/api'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import RoundedImage from '../../layout/RoundedImage'

//hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()

  //chamar a api, enviando o token de autorização
  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setPets(response.data.pets)
    })
  }, [token])

  return (
    <section>
      <h1> MyPets </h1>
      <Link to='/pet/add'>Cadastrar Pet</Link>
      <div>
        {pets.length > 0 && <p>meus pets</p>}
        {pets.length === 0 && <p>não há pets</p>}
        </div>
    </section>
  );
}

export default MyPets;
