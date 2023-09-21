import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Enfermeiros.css';
import { getEnfermeiros, deletarEnfermeiro, pesquisarEnfermeiros } from '../services/EnfermeiroService';
import Button from 'react-bootstrap/Button';
import ModalEnfermeiro from '../EnfermeiroComponents/ModalEnfermeiro';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { sessionValidate } from '../services/UserService';

function Enfermeiros() {
  sessionValidate();
  const [listaEnfermeiros, setListaEnfermeiros] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [nomeEnfermeiro, setNomeEnfermeiro] = useState(null);
  const [corenEnfermeiro, setCorenEnfermeiro] = useState(null);
  const [nivelEnfermeiro, setNivelEnfermeiro] = useState(null);
  const [idEnfermeiro, setIdEnfermeiro] = useState(null);
  const [verbo, setverbo] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [inputChanges, setInputChanges] = useState(0); // Contador de mudanças no input

  useEffect(() => {
    fetchEnfermeiros();
  }, []);

  const handleShowPost = () => {
    setNomeEnfermeiro(null);
    setCorenEnfermeiro(null);
    setNivelEnfermeiro(null);
    setverbo("Cadastro");
    setShow(true);
  }

  const handleShowPut = (enfermeiro) => {
    sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUb2tlbkdlcmVuY2lhZG9yIiwic3ViIjoidmljdG9yQGdtYWlsLmNvbSIsImV4cCI6MTY5NTE1OTEzNH0.eXWTskQeGc9CBEhIRjqfj7eeXOjb2kN5og3cuk21RWM")
    setNomeEnfermeiro(enfermeiro.nome);
    setCorenEnfermeiro(enfermeiro.coren);
    setNivelEnfermeiro(enfermeiro.enfermeiroTecnico);
    setIdEnfermeiro(enfermeiro.idEnfermeiro);
    setverbo("Edição");
    setShow(true);
  }
  
  async function fetchEnfermeiros() {
    try {
      console.log("Requisição feita");
      const result = await getEnfermeiros();
      setListaEnfermeiros(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removerEnfermeiro(id) {
    const excluir = confirm("Deseja deletar o enfermeiro?");
    if(excluir){
      try {
        const result = await deletarEnfermeiro(id);
        setListaEnfermeiros(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    }
   

  const limparPesquisa = () => {
    setPesquisa("");
    fetchEnfermeiros();
  }

  const handleChange = (e) => {
    setPesquisa(e.target.value);
    setInputChanges(inputChanges + 1);
  }

  useEffect(() => {
    async function fetchPesquisa() {
      if (inputChanges % 2 === 0 && inputChanges > 1) {
        console.log(pesquisa);
        try {
          if (pesquisa.length > 1) {
            const result = await pesquisarEnfermeiros(pesquisa);
            setListaEnfermeiros(result.data);
          }else{
            fetchEnfermeiros();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchPesquisa();
  }, [inputChanges, pesquisa]);

  return (
    <div>
      <ColorSchemesExample />
      <h2>Enfermeiros</h2>
      <div className='listagem'>
        <div className='anexosTabelaEnfermeiro'>
          <div className='input-group'>
            <input
              type="text"
              className='barraPesquisa'
              placeholder="Pesquisar..."
              value={pesquisa}
              onChange={handleChange}
            />
            {pesquisa && (
              <button
                className="limparPesquisaBtn"
                onClick={limparPesquisa}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          <Button variant="primary" onClick={handleShowPost} className='adicionarEnfermeiro'>
            Adicionar
          </Button>
        </div>
        <Table striped bordered hover responsive className='EnfermeirosTable'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Enfermeiro Técnico</th>
              <th>COREN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listaEnfermeiros && listaEnfermeiros.map((enfermeiro) => (
              <tr key={enfermeiro.idEnfermeiro}>
                <td>{enfermeiro.nome}</td>
                <td>{enfermeiro.enfermeiroTecnico}</td>
                <td>{enfermeiro.coren}</td>
                <td><button onClick={() => handleShowPut(enfermeiro)} className='editarEnfermeiro'>Editar</button></td>
                <td><button onClick={() => removerEnfermeiro(enfermeiro.idEnfermeiro)} className='excluirEnfermeiro'><h5>X</h5></button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ModalEnfermeiro
        show={show}
        handleClose={handleClose}
        verbo={verbo}
        nomeEnfermeiro={nomeEnfermeiro}
        corenEnfermeiro={corenEnfermeiro}
        nivelEnfermeiro={nivelEnfermeiro}
        idEnfermeiro={idEnfermeiro}
        fetchEnfermeiros={fetchEnfermeiros}
      />
    </div>
  );
}

export default Enfermeiros;
