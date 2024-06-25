import React, { useRef } from 'react'
import { setTrainer } from '../store/slices/trainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./styles/homepage.css"

const HomePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const textInput = useRef()

  const handleSubmit = ( event ) => {
    event.preventDefault()
    dispatch(setTrainer(textInput.current.value.trim())) 
    textInput.current.value = ""
    navigate( "/pokedex" )
  }

  return (
    <div className='homepage'>
      <img className='homepage_img' src='/pokedex.png' alt='imagen pokedex'/>
      <div className='homepage_wr'>
        <h2 className='homepage_welcome'> Hola Entrenador! </h2>
        <p className='homepage_register'> Para comenzar, registra tu nombre </p>
      </div>

      <form className='homepage_btns' onSubmit = { handleSubmit }>
        <input className='homepage_input' ref = { textInput } type='text' />
        <button className='homepage_btn'> Comenzar </button>
      </form>
    </div>
  )
}

export default HomePage