import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import { findSemanaData } from '../services/DashBoardService';

const colunas = [
  "Profissionais",
  "Profissionais",
  "Técnicos",
  "Enfermeiros",
];
const options = {
  title: "Profissionais por dia",
  vAxis: { title: "Profissionais" },
  hAxis: { title: "Dias" },
  seriesType: "bars",
};

const Grafico = () => {
  const [dataAtual, setDataAtual] = useState(new Date().getDate());
  const [dataSemana, setDataSemana] = useState([]);
  const [dataMes, setDataMes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        var response = await findSemanaData();
        response = response.data;
      } catch (error) {
        console.log(error);
        return;
      }
      console.log(response)

      const graficoData = [];
      graficoData.push(colunas);
      response.forEach(objeto => {
        graficoData.push([`${objeto.data}`, objeto.enfermeiros, objeto.tecnicos, objeto.profissionais]);
      });
      setDataSemana(graficoData);
      console.log(dataSemana)
    }

    fetchData();
  }, []);

  return (
    <div className='GraficoBarras'>
      <h1>Olá</h1>
      <Chart
        chartType="ComboChart"
        width="80%"
        data={dataSemana}
        options={options}
      />
    </div>
  );
}

export default Grafico;