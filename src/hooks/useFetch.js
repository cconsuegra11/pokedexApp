import axios from "axios"
import { useState } from "react"

const useFetch = () => {

    const [ apiData, setApiData ] = useState()

    const getApi = ( url ) => {
        axios.get( url )
        .then( resp => setApiData( resp.data ) )
        .catch(error => console.error( error ))
    }

    const getType = ( url ) => {
        axios.get( url )
        .then( resp => setApiData({ results: resp.data.pokemon.map(( poke ) => poke.pokemon )}))
        .catch(error => console.error( error ))
    }
    return [ apiData, getApi, getType ]
}

export default useFetch