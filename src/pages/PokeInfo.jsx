import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch.js"
import "./styles/pokeinfo.css"

const PokeInfo = () => {

  const [pokemon, getPokemon] = useFetch()
  const { id } = useParams()
  
  useEffect(() => {    
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    getPokemon(url)
  }, [])
  

  return (
    <section className='pokeinfo'>
      <div className='pokeinfo_title'>
        <figure className='pokeinfo_img'>
          <img src={ pokemon?.sprites.other["official-artwork"].front_default } alt='imagen Pokemon' />
        </figure>
        <h1 className='pokeinfo_name'>{ pokemon?.name }</h1>
        <ul className='pokeinfo_types'>
              {
                  pokemon?.types.map( type => (
                      <li className={ `slot${type.slot}` } key={ type.type.url }>
                              { type.type.name }
                      </li>
                  ))
              }
          </ul>
      </div>
      <div className='pokeinfo_stat'>
        <h2>Estadísticas</h2>
        <hr />
      </div>
      <ul className='pokeinfo_stats'>
        {
          pokemon?.stats.map(stat => (
            <li className='pokeinfo_stats-item' key={stat.stat.url}>
              <span>{ stat.stat.name }</span><span>{ stat.base_stat} / 250</span>
              <div className='outbar'>
                <div className='inbar' style={{width: `${stat.base_stat/2.5}%`}}></div>
              </div>
            </li>
          ))
        }
      </ul>

      
    </section>
  )
}

export default PokeInfo