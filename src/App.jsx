import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cryptomoneda, guardarCryptomoneda] = useState('');
  const [cotizacion, guardarCotizacion] = useState({});
  const [cargando, handleCargando] = useState(false);

  const componente = (cargando ) ? <Spinner/> : <Cotizacion cotizacion={cotizacion}/>;
  useEffect(()=>{
    const cotizarCryptomoneda = async () => {
      if(moneda === '') return null;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
      const data = await axios.get(url);
      handleCargando(true);
      setTimeout(()=>{
        handleCargando(false);
        guardarCotizacion(data.data.DISPLAY[cryptomoneda][moneda]) 
      },3000)
    }

    cotizarCryptomoneda()
  }, [moneda, cryptomoneda])
  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen crypto"
        />
      </div>
      <div>
        <Heading>
          Cotiza cryptomonedas al instante
        </Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCryptomoneda={guardarCryptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
