import axios from 'axios';
import { useEffect, useState } from 'react';
import pokedex from './assets/pokedex.png'
import './App.scss';

function App() {
  const [foto, setFoto] = useState('')
  const [nomePokemon, setNomePokemon] = useState('')
  const [buscarPokemon, setBuscarPokemon] = useState('')
  const [mostrarErro, setMostrarErro] = useState(false)

  useEffect(()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`)
    .then(resposta=>{
      setFoto(resposta.data.sprites.front_default)
      setNomePokemon(resposta.data.name)
    })
    .catch(erro=>console.log(erro))

  }, [])

  const funcaoBuscarPokemon = (nome) =>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`)
    .then(resposta=>{
      setFoto(resposta.data.sprites.front_default)
      setNomePokemon(resposta.data.name[0].toUpperCase() + resposta.data.name.substr(1))
      setBuscarPokemon('')
      setMostrarErro(false)
    })
    .catch(()=>setMostrarErro(true))
  }


  return (
    <div className="App">
      <div className="conteiner">
        <img className='pokedex' src={pokedex} alt="imagem da pokedex"/>
        <div className='conteiner-pokemon'>
            <img className='pokemon' src={foto} alt="foto do pokemon"/>
        </div>
        <h1 className='nome-pokemon'>{nomePokemon}</h1>
        <input type="text" className='busca-pokemon' placeholder='Escreva o nome do pokemon' value={buscarPokemon} onChange={e => setBuscarPokemon(e.target.value)}/>
        <p className='erro' style={mostrarErro ? {visibility: 'visible'} : {visibility: 'hidden'}}>Pokemon não encontrado!!</p>
        <button className='btn-busca-pokemon' onClick={()=>funcaoBuscarPokemon(buscarPokemon)}>Buscar Pokemon</button>
      </div>
    </div>
  );
}

export default App;
