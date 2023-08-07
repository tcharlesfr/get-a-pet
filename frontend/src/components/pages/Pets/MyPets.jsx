import api from '../../../utils/api'

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import RoundedImage from '../../layout/RoundedImage'

import styles from './Dashboard.module.css'

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
    <section >
      <div className={styles.petlist_header}>
        <h1>MyPets</h1>
        <Link to='/pet/add'>Cadastrar Pet</Link>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 && 
        pets.map((pet) => (
          <div className={styles.petlist_row} key={pet._id}>
            <RoundedImage
              src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
              alt={pet.name}
              width='px75'
            />
            <span className='Bold'>{pet.name}</span>
            <div className={styles.actions}>
              {pet.available ? (
                <>
                  {pet.adopter && <button className={styles.conclude_btn}>Concluir adoção</button>}
                  <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                  <button>Excluir</button>
                </>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ))}
        {pets.length === 0 && <p>não há pets</p>}
        </div>
    </section>
  );
}

export default MyPets;
