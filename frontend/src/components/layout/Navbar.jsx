import { Link } from "react-router-dom";
import Logo from '../../assets/img/pata2.png'

function Navbar() {
  return (
    <nav>
        <div>
            <img src={Logo} alt="logo" />
            <h2>Get A Pet</h2>
        </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        <li>
          <Link to="/login">Entrar</Link>
        </li>
        <li>
          <Link to="/register">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
