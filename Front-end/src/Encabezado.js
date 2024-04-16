import star from './star.png';
import logo from './logo2.png';

export default function Encabezado({boton}){
    return (
    <header className='App-header'>
        <img src={star} className="Star-Prof" alt="Estrella" />
        <img src={logo} className='App-logo-Prof' alt='logo'/>
        Costructora Uroboros
        {boton}
        <hr/>
    </header>
);
}
