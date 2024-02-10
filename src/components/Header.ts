import '../css/header.css';

import rutaImgLaucha from '../assets/icons/laucha.png';

import rutaImgInicio from '../assets/icons/dashboard.png';
import rutaImgEmpleados from '../assets/icons/tarjeta_dni.png';
import rutaImgLiquidacion from '../assets/icons/dinero.png';
import rutaImgOtros from '../assets/icons/otros.png';

const rutaEmpleado =  '../pages/empleados.html';
const rutaInicio = '../pages/dashboard.html'
const rutaLiquidacion = '../pages/dashboard.html'
const rutaOtros = '../pages/dashboard.html'


export default function ComponenteHeader(){
    return `
    <div id="barra-navegacion">
    
    <div id="logo-navegacion">
    <h1>LAUCHA</h1>
    <img  src="${rutaImgLaucha}"/>
    </div>
    
    <div class="boton-navegacion">
    <a href="${rutaInicio}">
    <img  src="${rutaImgInicio}"/>
        <h5>INICIO</h5>
    </a>  
    </div>

    <div  class="boton-navegacion">
    <a href="${rutaEmpleado}">
    <img  src="${rutaImgEmpleados}"/>
        <h5>EMPLEADOS</h5>
    </a>
    </div>
    
    <div  class="boton-navegacion">
    <a href="${rutaLiquidacion}">
    <img  src="${rutaImgLiquidacion}"/>
        <h5>LIQUIDACION</h5>
    </a>
    </div>
    
    <div  class="boton-navegacion">
    <a href="${rutaOtros}">
    <img  src="${rutaImgOtros}"/>
        <h5>OTROS</h5>
    </a>
    </div>
    
    </div>
    `
}