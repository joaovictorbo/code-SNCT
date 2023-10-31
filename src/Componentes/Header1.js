import React, { useState } from 'react';
import rectangle from './assets/Rectangle37.png';
import code2 from './assets/CODE2.png';
import grupo from './assets/Grupo.png';
import voteImage from './assets/Rectangle1.png';
import Modal from './modal.js';

export default function Header1() {

  
  return (
    <header>

      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${rectangle})`, height: '80px' }}
      >
        <div className='mask'>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
            <img src={code2} alt="Heading" className='mb-3' style={{ marginTop: '30px', height: '90px'}} />
              
          
            </div>
          </div>
        </div>
      </div>


      <div
        className='main-background bg-image'
        style={{
          backgroundImage: `url(${grupo})`,
          backgroundPosition: 'center 50%',
          backgroundSize: '180% auto',
          position: 'relative',
          height: '70vh',
          widht: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          flexDirection: 'column'
        }}
      >
        
        <p className='display-3  text-wrap '>Festival de Aplicativos da Iniciativa CODE</p>
        <p className='display-8  text-wrap'> O evento tem como objetivo promover a criatividade tecnológica dos </p>
        <p className='display-8  text-wrap'> alunos integrantes do Projeto CODE, através da construção</p>
        <p className='display-8  text-wrap'> de aplicativos para dispositivos Android </p>
        <p className='display-8 text-wrap'> na plataforma MIT App Inventor</p>
        <a className='border border-primary p-4 mb-20 rounded-pill' href="vota">Votação</a>

        

        
      </div>

    </header>
  );
}