import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyPets() {
  const [pets, setPets] = useState([]);

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
