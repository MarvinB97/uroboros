import Encabezado from './Encabezado';

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';


export default function AcercaDeNosotros(){
    const navigate = useNavigate();
    const volver = ()=>{navigate('/profile')};

    return (
        <>
        <Encabezado boton={<Button color='primary' onClick={volver} style={{fontSize: '20px', display: 'inline', float: 'right'}}>volver</Button>}/>
        <hr/>
        <div style={{width:'80vw',margin:'auto'}}>
          <Descripcion/>

        </div>
        </>
    );
}


//---------DESCRIPCION--------------
function Descripcion(){
    const nombreCompania = 'Uroboros';
    const yearCreation = '2024';

    return(
        <div>
        <h2>Descripción.</h2>

<p style={{textAlign:'justify'}}>
Bienvenido a {nombreCompania}, donde construimos sueños y edificamos comunidades desde {yearCreation}. Nos enorgullece ser una empresa líder en el sector de la construcción, comprometida con la excelencia, la innovación y la satisfacción del cliente.

En {nombreCompania}, nuestra misión es crear espacios habitables que trasciendan las expectativas de nuestros clientes, cumpliendo con los más altos estándares de calidad y sostenibilidad. Cada proyecto que emprendemos es una oportunidad para dejar una huella positiva en la comunidad y contribuir al desarrollo urbano de manera responsable.

Nuestro equipo está compuesto por profesionales altamente capacitados y apasionados por su trabajo. Desde arquitectos y ingenieros hasta expertos en construcción y gestión de proyectos, cada miembro de nuestro equipo aporta su experiencia y dedicación para asegurar el éxito de cada proyecto.

Nos distinguimos por nuestra atención al detalle, nuestro compromiso con la seguridad en el lugar de trabajo y nuestra capacidad para adaptarnos a las necesidades específicas de cada cliente. Ya sea que estemos construyendo una residencia familiar, un complejo de apartamentos o una estructura comercial, nos esforzamos por superar las expectativas en cada etapa del proceso.

Además de nuestra dedicación a la excelencia en la construcción, en {nombreCompania} también nos comprometemos a ser buenos ciudadanos corporativos. Nos esforzamos por minimizar nuestro impacto ambiental, fomentar la diversidad y la inclusión en nuestra fuerza laboral, y contribuir al bienestar de las comunidades en las que operamos.

En {nombreCompania}, no solo construimos edificios, creamos hogares y espacios donde las personas pueden vivir, trabajar y prosperar. Estamos emocionados de ser parte de su próximo proyecto y esperamos colaborar con usted para convertir su visión en realidad.

¡Gracias por considerar a {nombreCompania} para sus necesidades de construcción!
</p>

        </div>
    );
}
