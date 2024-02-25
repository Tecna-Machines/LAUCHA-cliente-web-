import '../css/header.css';

const rutaImgLaucha = new URL('/assets/icons/laucha.png',import.meta.url).href

const rutaImgInicio = new URL('/assets/icons/dashboard.png', import.meta.url).href;
const rutaImgEmpleados  = new URL('/assets/icons/tarjeta_dni.png',import.meta.url).href;
const rutaImgLiquidacion  = new URL('/assets/icons/dinero.png',import.meta.url).href;
const rutaImgOtros = new URL('/assets/icons/otros.png',import.meta.url).href;

const rutaEmpleado =  new URL('../pages/empleados.html',import.meta.url).href;
const rutaInicio = new URL('../pages/dashboard.html',import.meta.url).href;
const rutaLiquidacion = new URL('../pages/seleccionar-liquidacion.html',import.meta.url).href;
const rutaOtros = new URL('../pages/dashboard.html',import.meta.url).href;


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