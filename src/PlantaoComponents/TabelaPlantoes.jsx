import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './TabelaPlantoes.css';
import { getPlantoes } from '../services/PlantaoService';

const TabelaPlantoes = ({ buscarEscalados }) => {
  const [listaPlantoes, setPlantoes] = useState([]);
  const [plantaoSelecionado, setPlantaoSelecionado] = useState(null);
  
  useEffect(() => {
    findPlantoes();
  }, []);

  async function findPlantoes() {
    try {
      const result = await getPlantoes();
      setPlantoes(result.data);
    } catch (error) {
        console.log("token inválido");
      
    }
  }

  async function selecionarPlantao(plantao) {
    setPlantaoSelecionado(plantao);
    sessionStorage.setItem("plantaoExibido", plantao.idPlantao.toString());
    buscarEscalados(plantao);
  }

  return (
    <div className="table-plantoes">
      <Table responsive>
        <thead>
          <tr>
            <th>Horário</th>
            <th>Dia</th>
            <th>Escalados</th>
          </tr>
        </thead>
        <tbody>
          {listaPlantoes.map((plantao) => (
            <tr
              key={plantao.idPlantao}
              className={`plantaoModel ${sessionStorage.getItem("plantaoExibido") === plantao.idPlantao.toString() ? 'plantaoSelecionado' : ''}`}
            >
              <td>{plantao.horario}</td>
              <td>{plantao.dia}</td>
              <td>
                <button onClick={() => selecionarPlantao(plantao)}>Listar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TabelaPlantoes;
