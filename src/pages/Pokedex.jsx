import React from 'react'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from "react"
import { useRef } from "react"
import PokeCard from '../components/shared/pokedex/PokeCard'
import PokeSelect from "../components/shared/pokedex/PokeSelect"
import "./styles/pokedex.css"

const Pokedex = () => {

  const trainer = useSelector(( store ) => store.trainer )
  const [ inputValue, setInputValue ] = useState("")
  const [ pokemons, getPokemons, getType ] = useFetch()
  const [ typeFilter, setTypeFilter ] = useState("")
  
  useEffect(() => {
    if ( typeFilter ) {
      getType( typeFilter )
    } else {
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=10" 
      getPokemons( url ) 
    }
  }, [ typeFilter ])
  
  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    setInputValue(textInput.current.value.trim().toLowerCase())
    textInput.current.value = ""
  }

  const cbFilter = ( poke ) => {
    return poke.name.includes( inputValue )
  }

  return (
    <div className='pokedex'>
      <h3 className='pokedex_welcome'><span>Bienvenid@ { trainer }, </span> aquí podrás encontrar tu pokemón favorito </h3>
      <div className='pokedex_filters'>
        <form className='pokedex_filters-search' onSubmit={ handleSubmit }>
          <input className='pokedex_filters-search-input' ref={ textInput } type= "text" />
          <button className='pokedex_filters-search-btn'> Buscar </button>
        </form >
          <PokeSelect
            setTypeFilter= { setTypeFilter } />
      </div>
      <div className='pokedex_container'>
        {
          pokemons?.results.filter( cbFilter ).map(( poke ) => (
          < PokeCard 
            key = { poke.url }
            url = { poke.url } />))
        }        
      </div>
    </div>
  )
}

export default Pokedex