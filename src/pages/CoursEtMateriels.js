import { useState, useEffect } from "react"
import axios from "axios"
import { MaterielsEtSections } from "../components/MaterielsEtSections"
import { useParams } from "react-router-dom"

export function CoursEtMateriels (){

    const [cours, setCours] = useState([])

    const params = useParams()

    useEffect(() => {
        listeDeMateriels()
    }, [])


    const listeDeMateriels = async () => {
        const resultat = await axios.get(`http://localhost:5000/materielDeCours/${params.id}`)
        setCours(resultat.data)
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 d-none d-md-block">

                </div>
                <div className="col">
                    {
                        cours.map((cours, i) => {
                            return(
                                <div className="row" key={i}>
                                    <div className="col-md-3 text-center">
                                        <img className="imgSize" src={cours.image} alt="..."/>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col"><b>{cours.nom}</b></div>
                                            <div className="col"><b>Prof: </b>Louis Roi</div>
                                            <div className="col"><b>Code: </b>{cours.code}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col mt-3 mb-3"><b>Description: </b>{cours.description}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col"><b>Categorie: </b>{cours.nomCategorie.map(c => c.nom)}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <MaterielsEtSections cours={cours}/>
                </div>
            </div>
        </div>
    )
}