import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';
import Error from './Error';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCryptomoneda}) => {

    const [listaCrypto, guarsarCryptomonedas] = useState([]);
    const [error, guardarError] = useState(false);
    
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'EUR', nombre: 'Euro'}
    ]

    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [cryptomoneda, SelectCrypto] = useCryptomoneda('Elige tu cryptomoneda', '', listaCrypto);

    useEffect(()=>{
        const consultarAPI = async()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url);
            guarsarCryptomonedas(result.data.Data);
        }

        consultarAPI();
    },[])

    const cotizarMoneda = e => {
        e.preventDefault();
        if(moneda === '' || cryptomoneda === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        guardarCryptomoneda(cryptomoneda);
    }
    return (
        <form>
            {error ? <Error mensaje='Todos los campos deben completarse'/> : null}
            <SelectMoneda/>
            <SelectCrypto/>
            <Boton
                type="submit"
                value="Calcular"
                onClick={cotizarMoneda}
            />
        </form>
    );
}

export default Formulario;