import { Link } from "react-router-dom";


export function CarteCours({id, nom, description, image, prixNormal, categorie}){

    return(
        <>
            <div className="row">
                <hr/>
                <div className="col-lg-2 col-md-3 col-sm-4 me-4 text-center">
                    <img src={image} className="imgSize" alt="..."/>
                </div>
                <div className="col">
                    <h5>{nom}</h5>
                    <h4 className="text-success">{prixNormal} $</h4>
                    <div>Description:</div>
                    <p>{description}</p>
                    <p><b>Categorie: </b>{categorie}</p>
                </div>
                <div className="col-xs-12 col-md-3 mb-2 text-center">
                    <Link to={`/materielDeCours/${id}`}><button className="btn btn-warning me-3 mb-2 mx-auto">Voir</button></Link>
                    <button className="btn btn-success mb-2">S'inscrire</button>
                </div>
            </div>
        </>
    )
}