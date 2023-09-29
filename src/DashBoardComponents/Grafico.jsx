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
        graficoData.push([`${objeto.data}`, objeto.profissionais, objeto.tecnicos, objeto.enfermeiros]);
      });
      setDataSemana(graficoData);
      console.log(dataSemana)
    }

    fetchData();
  }, []);

  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      data={dataSemana}
      options={options}
    />
  );
}

export default Grafico;