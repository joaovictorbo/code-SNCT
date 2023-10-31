import Navbar from '../Componentes/navbar';
import Footer2 from '../Componentes/footer2';
import Dados from './votação/get.jsx'


function Vota() {
    return (
        <div className="Vota">
        <Navbar/>
        <Dados/>
        <Footer2/>
        
        </div>
    );

}

export default Vota;
