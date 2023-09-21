import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalPlantao from './ModalPlantao';
import './Escalados.css';
import { getPlantaoEscalados, deleteEnfermeiroEscalado } from '../services/PlantaoService';

const Escalados = ({ plantao }) => {
  const [show, setShow] = useState(false);
  const [listaEscalados, setListaEscalados] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const atualizarLista = async () => {
    try {
      if (plantao) {
        const response = await getPlantaoEscalados(plantao.idPlantao);
        setListaEscalados(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deletarEnfermeiro = async (idEnfermeiro) => {
    try {
      await deleteEnfermeiroEscalado(plantao.idPlantao, idEnfermeiro);
      // Atualize a lista após a exclusão do enfermeiro
      atualizarLista();
    } catch (error) {
      console.log(error);
    }
  };

  // Use useEffect para atualizar a lista de escalados quando idPlantao mudar ou quando o componente for montado
  useEffect(() => {
    atualizarLista();
  }, [plantao]);

  return (
    <div className='rectangle'>
      <h1>Escalados</h1>
      {plantao !== null ? (<div className='plantaoAtivo'>
        <div className='plantaoDataHora'>
          <h6>{plantao.dia}</h6>
          <h6>{plantao.horario}</h6>
        </div>
        <Button variant="primary" onClick={handleShow}>
          Adicionar
        </Button>
      </div>
      ) : null}
      <div>
      <table className='tabelaEscalados'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Coren</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listaEscalados.map((enfermeiro) => (
            <tr key={enfermeiro.enfermeiro.idEnfermeiro}>
              <td>{enfermeiro.enfermeiro.nome}</td>
              <td>{enfermeiro.enfermeiro.coren}</td>
              <td>
                <button
                  onClick={() => deletarEnfermeiro(enfermeiro.enfermeiro.idEnfermeiro)}
                  className='excluirEscalado'
                  style={{ justifyContent: 'center' }}
                >
                  <h5>X</h5>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <ModalPlantao show={show} handleShow={handleShow} handleClose={handleClose}
        plantao={plantao} atualizarLista={atualizarLista} />
    </div>
  );
};

export default Escalados;
