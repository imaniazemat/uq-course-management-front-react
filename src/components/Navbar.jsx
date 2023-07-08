import logo from '../logo/logo_UQ.png'
import { BiSearchAlt2 } from 'react-icons/bi'

export function Navbar(){
    
    return(
        <div className='container-fluid'>
            <div className="row">
                <div className="col">
                    <img src={logo} width="200px" alt="Logo UQ"/>
                </div>
                <div className="col d-none d-sm-block">
                    <form className='d-flex mt-4'>
                        <input className='form-control' type="text" placeholder='Rechercher un cours'/>
                        <button className='btn btn-dark'><BiSearchAlt2/></button>
                    </form>
                </div>
                <div className='col text-center'>
                    <button className='btn btn-outline-dark mt-4 me-4'>S'incrire</button>
                    <button className='btn btn-dark mt-4'>Se connecter</button>
                </div>
                <hr/>
            </div>
        </div>
    )
}