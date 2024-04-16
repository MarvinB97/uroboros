//-------LIBRERIA DE FRAMEWORK PARA CSS----------
import {UncontrolledCarousel} from 'reactstrap';


/*
*------------------FUNCION PRINCIPAL-----------------
*/
export default function LoginColumnOne(){
    return (
    <div className='content-ColumnOne'>
        <Carousel/>
    </div>);
  }



/*
*------------------IMAGENES DE PRESENTACION-----------------
*/
function Carousel(){
    return(
        <UncontrolledCarousel
  items={[
    {
      altText: 'Slide 1',
      caption: '',
      key: 1,
      src: 'https://i.pinimg.com/736x/04/da/b3/04dab38b2058443d9ae76a9726fb931b.jpg'
    },
    {
      altText: 'Slide 2',
      caption: '',
      key: 2,
      src: 'https://images.adsttc.com/media/images/55ba/d229/e58e/ce6b/e300/0094/medium_jpg/8.jpg?1438306841'
    },
    {
      altText: 'Slide 3',
      caption: '',
      key: 3,
      src: 'https://i.pinimg.com/736x/04/da/b3/04dab38b2058443d9ae76a9726fb931b.jpg'
    }
  ]}
 />
    );
}


//https://assets.contenthub.wolterskluwer.com/api/public/content/7a4a118d4c3e47a7b1fa8974650f8d6e?v=26a94f75
