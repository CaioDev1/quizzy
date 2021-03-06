import React from 'react'
import './CreatePageStyle.css'

import CreateQuestion from '../../components/CreateQuestion/CreateQuestion'
import Button from '../../components/Button/Button'

function CreatePage() {
    return (
        <div className='container' id='create-page'>
            <h1>Sala de criação</h1>
            <div className='create-question-container'>
                <CreateQuestion />
                <CreateQuestion />
                <button id='add-question'>+</button>
            </div>
            <div id='create-question-menu'>
                <div id='question-menu-rows'>
                    <h3>Quizz de <strong>Caio Felipe</strong></h3>
                    <h3>Perguntas: <strong>2</strong></h3>
                    <input type="text" name="" id="" placeholder='CÓDIGO GERADO' />
                </div>
                <div id='question-menu-buttons'>
                    <Button to='/' color='#3EACEA'>VOLTAR</Button>
                    <Button type='button' color='#55EC3D'>CRIAR</Button>
                </div>
            </div>
        </div>
    )
}

export default CreatePage