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

  const [value, onChange] = useState(new Date());

  return (
    <div>
      <ColorSchemesExample />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
            <div className="mb-3 text-start">
              <label className="form-label">Data</label>
              <input type='date' className='form-control' />
            </div>
          </div>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
            <div className="mb-3 text-start">
              <label className="form-label">Horário</label>
              <select className='form-control'>
                <option value="8">8:00</option>
                <option value="16">16:00</option>
                <option value="00">00:00</option>
              </select>
            </div>
          </div>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 text-end'>
            <button className='btn btn-success'>Salvar</button>
          </div>
        </div>
      </div>



      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            {/* Passe a função buscarEscalados como uma propriedade */}
            <h3>Plantões</h3>
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
