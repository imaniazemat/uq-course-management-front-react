import { GrEdit } from 'react-icons/gr'
import { MdDeleteOutline } from 'react-icons/md'

import { useState, useEffect } from "react"
import AjouterMateriel from "./AjouterMateriel";
import Modal from "./Modal/Modal";
import AjouterSection from './AjouterSection';
import axios from "axios";

//import { GrEdit } from 'react-icons/gr'
//import { MdDeleteOutline } from 'react-icons/md'


export function MaterielsEtSections({cours}){
    const [sectionId, setSectionId] = useState(null);
    const [showAjouterMaterielComponentCoursParent, setShowAjouterMaterielComponentCoursParent] = useState(false);
    const [showAjouterMaterielComponentSectionParent, setShowAjouterMaterielComponentSectionParent] = useState(false);
    const [showAjouterSectionComponentCoursParent, setShowAjouterSectionComponentCoursParent] = useState(false);
    const [showAjouterSectionComponentSectionParent, setShowAjouterSectionComponentSectionParent] = useState(false);

      function handleClick(buttonId) {
        //const buttonId = event.target.id;
        console.log(`Clicked button with id: ${buttonId}`);
        axios.delete("http://localhost:5000/materiel/" + buttonId)
      .then(() => {          
        window.location.reload(); // Refresh the page
        })
      .catch(error => {
        console.error(error);
        alert(error);
      });
      }

    return(
        <div className="row">
            <div className="col-12 text-center mb-3">
                <h5>Materiels</h5>
                <button className="btn btn-secondary btn-sm me-2" onClick={() => setShowAjouterSectionComponentCoursParent(true)}>Ajouter Section</button>
                <Modal title="Ajouter Section" onClose={() => setShowAjouterSectionComponentCoursParent(false)} show={showAjouterSectionComponentCoursParent}>
                    {
                        cours.map((c) => {
                            return(
                                <AjouterSection coursId={c._id} parentSectionId={c._id} parentType="Cours"/>
                        )}) 
                    }
                </Modal>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowAjouterMaterielComponentCoursParent(true)}>Ajouter Materiel</button>
                <Modal title="Ajouter Materiel" onClose={() => setShowAjouterMaterielComponentCoursParent(false)} show={showAjouterMaterielComponentCoursParent}>
                    {
                        cours.map((c) => {
                            return(
                                <AjouterMateriel coursId={c._id} parentSectionId={c._id} parentType="Cours"/>
                        )}) 
                    }
                </Modal>
            </div>
            <table>
                {
                    cours.map((materiel) => {
                        return(
                            materiel.Materiels.map((m, i) => {
                                return(
                                    <tbody>
                                        <tr key={i}>
                                            <td><a href={m.lien}>{m.description}</a></td>
                                            <td className="text-muted d-none d-sm-block">{m.dateAjoute.slice(0,10)}</td>
                                            {/* <td><a href="...">{m.lien}</a></td> */}
                                            <td>{m.typeMateriel}</td>
                                            <td>
                                                <button className="btn btn-outline-warning btn-sm me-2"><GrEdit/></button>
                                                <button id={m._id} className="btn btn-danger btn-sm" onClick={() => handleClick(m._id)}><MdDeleteOutline/></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        )
                    })
                }
            </table>
            {
                cours.map(c => {
                    return(
                        c.Sections.map((item, i) => {
                            return(
                                <div id={i} className="col-12 table">
                                    <div className="bg-warning mt-4">{item.titreSection}
                                    <button id={item._id} className="btn btn-secondary btn-sm me-2 ms-2" onClick={(event) => {setShowAjouterSectionComponentSectionParent(true); setSectionId(event.target.id)}}>Ajouter Section</button>
                                    <Modal title="Ajouter Section" onClose={() => setShowAjouterSectionComponentSectionParent(false)} show={showAjouterSectionComponentSectionParent}>            
                                                    <AjouterSection coursId={c._id} parentSectionId={sectionId} parentType="Section"/>
                                    </Modal>

                                    <button id={item._id} className="btn btn-secondary btn-sm" onClick={(event) => {setShowAjouterMaterielComponentSectionParent(true); setSectionId(event.target.id)}}>Ajouter Materiel</button></div>
                                    <Modal title="Ajouter Materiel" onClose={() => setShowAjouterMaterielComponentSectionParent(false)} show={showAjouterMaterielComponentSectionParent}>            
                                                    <AjouterMateriel coursId={c._id} parentSectionId={sectionId} parentType="Section"/>
                                    </Modal>
                                    <div className="row">
                                        <div className="col">
                                            {/* Materiels dans une section */}
                                            <div>{item.MaterielsSansSousSection.map((ss, i) => {
                                                    return(
                                                        <div className="row mt-3 ms-2" key={i}>
                                                            <div className="col-3"><a href={ss.lien}>{ss.description}</a></div>
                                                            <div className="col text-center text-muted d-none d-sm-block">{ss.dateAjoute.slice(0,10)}</div>
                                                            {/* <div className="col text-center"><a href="...">{ss.lien}</a></div> */}
                                                            <div className="col text-center">{ss.typeMateriel}</div>
                                                            <div className='col'>
                                                                <button className="btn btn-outline-warning btn-sm me-2"><GrEdit/></button>
                                                                <button id={ss._id} className="btn btn-danger btn-sm" onClick={() => handleClick(ss._id)}><MdDeleteOutline/></button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            {/* Sections */}
                                            <div className="ms-3">{item.SousSections.map((ss, i) => {
                                                    return(
                                                        <div key={i}><hr/><b>{ss.titreSection} 
                                                            <button id={ss._id} className="btn btn-secondary btn-sm ms-2" onClick={(event) => {setShowAjouterMaterielComponentSectionParent(true); setSectionId(event.target.id)}}>Ajouter materiel</button></b>
                                                            <Modal title="Ajouter Materiel" onClose={() => setShowAjouterMaterielComponentSectionParent(false)} show={showAjouterMaterielComponentSectionParent}>            
                                                                <AjouterMateriel coursId={c._id} parentSectionId={sectionId} parentType="Section"/>
                                                            </Modal>
                                                            <div className="col ms-3">
                                                                {/* Materiels d'une section */}
                                                                <div>{ss.Materiels.map((m, i) => {
                                                                        return(
                                                                            <div className="row mt-3" key={i}>
                                                                                <div className="col"><a href={m.lien}>{m.description}</a></div>
                                                                                <div className="col text-center text-muted d-none d-sm-block">{m.dateAjoute.slice(0,10)}</div>
                                                                                {/* <div className="col text-center"><a href="...">{m.lien}</a></div> */}
                                                                                <div className="col text-center">{m.typeMateriel}</div>
                                                                                <div className='col'>
                                                                                    <button className="btn btn-outline-warning btn-sm me-2"><GrEdit/></button>
                                                                                    <button id={m._id} className="btn btn-danger btn-sm" onClick={() => handleClick(m._id)}><MdDeleteOutline/></button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                })
            }
        </div>
    )
}