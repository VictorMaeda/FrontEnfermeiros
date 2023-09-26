import React, { useEffect, useState } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './Plantoes.css';
import { adicionaEnfermeiroEscalado, deleteEnfermeiroEscalado, getPlantaoEscalados } from '../services/PlantaoService';
import Escalados from '../PlantaoComponents/Escalados';
import TabelaPlantoes from '../PlantaoComponents/TabelaPlantoes';
import ModalPlantao from '../PlantaoComponents/ModalPlantao';
import { sessionValidate } from '../services/UserService';

const Plantoes = () => {
  //sessionValidate();
  const [listaEscalados, setEscalados] = useState([]);
  const [idPlantao, setIdPlantao] = useState(null);
  const [dataHoraPlantao, setDataHoraPlantao] = useState("");
  const [plantao, setPlantao] = useState(null);

  async function buscarEscalados(plantao) {
    try {
      setPlantao(plantao);
      sessionStorage.setItem('plantaoExibido', plantao.idPlantao);
      sessionStorage.setItem('token', JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUb2tlbkdlcmVuY2lhZG9yIiwic3ViIjoidmljdG9yQGdtYWlsLmNvbSIsImV4cCI6MTY5NTE1OTEzNH0.eXWTskQeGc9CBEhIRjqfj7eeXOjb2kN5og3cuk21RWM"));
      setIdPlantao(plantao.idPlantao);
      setDataHoraPlantao(`${plantao.dia} ${plantao.horario}`);
      const response = await getPlantaoEscalados(plantao.idPlantao);
      setEscalados(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletarEscalado(idEnfermeiro) {
    try {
      const response = await deleteEnfermeiroEscalado(idPlantao, idEnfermeiro); // Usa idPlantao do estado
      setEscalados(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ColorSchemesExample />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            {/* Passe a função buscarEscalados como uma propriedade */}
            <TabelaPlantoes buscarEscalados={buscarEscalados} setDataHoraPlantao={setDataHoraPlantao} />
          </div>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            <Escalados lista={listaEscalados} deletarEscalado={deletarEscalado}
              plantao={plantao} modal={ModalPlantao} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plantoes;
