/*
*------------------SE IMPORTA EL LOGO-----------------
*/
import star from './star.png';
import logo from './logo2.png';


/*
*------------------FUNCION PRINCIPAL-----------------
*/
export default function LoginColumnTwo(){
    return (
        <div className='content-ColumnTwo'>
            <img src={star} className="Star" alt="Estrella" />
            <img src={logo} className='App-logo' alt='logo'/>
            <h1 className="title">Constructora Uroboros</h1>
            <p>
            Somos una compañia dedicada a cumplir tu sueño de tener una casa propia.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            </a>
        </div>
    );
}
