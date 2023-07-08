import React from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class AjouterMateriel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      materialLink: null,
      description: '',
      materialType:'Note',
      coursId: props.coursId,
      parentSectionId: props.parentSectionId,
      parentType: props.parentType
    };
    this.handleMaterialLinkChange = this.handleMaterialLinkChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMaterialTypeChange = this.handleMaterialTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  showSuccessAlert() {
    toast.success('Insertion du matériel réussie!', {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  showFailedAlert(errorMessage) {
    toast.error('Insertion du matériel a échoué! voici erreur = ' + errorMessage , {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  handleMaterialLinkChange(event) {
    this.setState({
      materialLink: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleMaterialTypeChange(event) {
    this.setState({
      materialType: event.target.value
    });
    console.log('Material Type: ' + event.target.value);
  }

  createCourseMaterial(materialType, description, materialLink, coursId, parentSectionId, parentType) {
    const material = {      
      typeMateriel: materialType,
      description: description,
      idCours: coursId,
      lien: materialLink,
      idParentSection: parentSectionId,
      typeParent: parentType
    }

    axios.post("http://localhost:5000/ajouterMateriel", material)
      .then(response => {
        console.log(response.data);
        if (response.data != null && response.data.message != null && response.data.message.errors != null && response.data.message.errors.description != null) {
          this.showFailedAlert(response.data.message.errors.description.message);
        } else {
          this.showSuccessAlert();
        }
        
      })
      .catch(error => {
        console.error(error);
        this.showFailedAlert(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createCourseMaterial(this.state.materialType, this.state.description, this.state.materialLink, this.state.coursId, this.state.parentSectionId, this.state.parentType)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="lienDeMateriel">Lien de materiel</label>
            <input className="form-control" id="lienDeMateriel" placeholder="Entrez le lien de materiel" onChange={this.handleMaterialLinkChange}/>
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Description</span>
            </div>
            <textarea className="form-control" aria-label="With textarea" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="typeDeMateriel" id="noteRadio" value='Note' onChange={this.handleMaterialTypeChange}/>
            <label className="form-check-label" htmlFor="noteRadio">
              Note
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="typeDeMateriel" id="videoRadio" value='Video' onChange={this.handleMaterialTypeChange}/>
            <label className="form-check-label" htmlFor="videoRadio">
              Video
            </label>
          </div>
          <button type="submit">Ajouter Materiel</button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AjouterMateriel;
