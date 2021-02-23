import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: 'Bebas Neue', cursive;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;
    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({cotizacion}) => {
    if(Object.keys(cotizacion).length === 0) return null;
    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{cotizacion.PRICE}</span></Precio>
            <Info>El precio mas alto del dia: <span>{cotizacion.HIGHDAY}</span></Info>
            <Info>El precio mas bajo del dia: <span>{cotizacion.LOWDAY}</span></Info>
            <Info>El porcentaje de variacion es: <span>{cotizacion.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualizacion: <span>{cotizacion.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    );
}

export default Cotizacion;