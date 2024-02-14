import '../../css/contrato.css'
import {crearContratoEmpleado, ObtenerAdicionalesExistentes, ObtenerModalidadesExistentes} from '../../TS/API/CrearContrato.ts'
import {getEmpleado} from '../Services/EmpleadoService.ts'
import mostrarAlerta from '../utils/crearAlerta.js';
import crearModal from '../utils/crearModal.js';

const adicionales = await ObtenerAdicionalesExistentes();
const modalidades = await ObtenerModalidadesExistentes();
const listaAdicionales = adicionales.data
const listaModalidades = modalidades.data


const empleado = getEmpleado()
const barra = document.getElementById('barra-blanco');
let montoFijoSueldo = 10;
let montoAcuerdoBlanco = 0


pintarDatosEmpleado()
pintarLasModalidades(listaModalidades)

calcularMontoHora()

agregarOtroAdicional(listaAdicionales)


obtenerLosAdicionales(listaAdicionales)

crearContrato()


function pintarDatosEmpleado(){
    let nombreParrafo = document.getElementById('nombre')
    let dniParrafo = document.getElementById('dni')

    nombreParrafo.textContent = `EMPLEADO: ${empleado.nombre} ${ empleado.apellido}`
    dniParrafo.textContent  = `DNI: ${empleado.dni}`
}

function pintarLasModalidades(modalidades) {

  const selectModalidades = document.getElementById('select-modalidad');

  let modalidadesLista = Array.from(modalidades)

  modalidadesLista.forEach((modalidad) => {

    let option = document.createElement('option')
    option.textContent = modalidad.descripcion
    option.value = modalidad.codigo

    selectModalidades.appendChild(option)
  })
  
}

function funcionaMientoBarra(){

const barra = document.getElementById('barra-blanco');

barra.addEventListener('input', function() {
  const value = (barra.value - barra.min) / (barra.max - barra.min);
  const color = `linear-gradient(to right, var(--azul-marino) ${value * 100}%, var(--verde-claro) ${value * 100}%)`;
  barra.style.background = color;

  let esFijo = document.getElementById('tipo-blanco').checked;

  if (esFijo) {

    montoAcuerdoBlanco = barra.value
    pintarMontosBlanco(barra.value, montoFijoSueldo - barra.value);
  } else 
  {

    let porcentajeBarra = ((barra.value / (barra.max - barra.min)) *100).toFixed(2);
    montoAcuerdoBlanco = porcentajeBarra

    let porcentajeMontoFijo = (100 - porcentajeBarra).toFixed(2);
    pintarMontosBlanco(porcentajeBarra, porcentajeMontoFijo, true);
  }


});

}

function obtenerLosAdicionales(adicionales){


  let select = document.getElementsByClassName('select-adicionales')
  const listaAdicionales =  Array.from(adicionales)

  let listaSelects = Array.from(select)

  listaSelects.forEach((select)=>{

    listaAdicionales.forEach((adicional) => {
      crearOptionParaSelect(adicional,select)
    })

  })
}


function crearOptionParaSelect(AdicionalDTO,selectPadre){

  const option = document.createElement('option')

  let unidad = AdicionalDTO.esPorcentual == true ? '%' : '$'

  option.text = `(${AdicionalDTO.codigo}) ${AdicionalDTO.concepto} (${unidad}) ${AdicionalDTO.cantidad}`
  option.value = AdicionalDTO.codigo
  selectPadre.appendChild(option);
}

function agregarOtroAdicional(listaAdicionales){

  let  btnAgregarAdicional = document.getElementsByClassName('btn-agregar-adicional');
  let listaBtnsAdicional = Array.from(btnAgregarAdicional)

  listaBtnsAdicional.forEach((button)=> 
  {
    button.addEventListener('click',(evetn)=> {

      evetn.preventDefault()
      
      crearOtroAdicional(listaAdicionales)
    })
  })
}

function crearOtroAdicional(listaAdicionales){

  const divContenedor = document.getElementsByClassName('adicionales-contenedor')[0];
  const select = document.createElement('select')
  select.classList.add('select-adicionales')

  divContenedor.appendChild(select)
  
  listaAdicionales.forEach((adicional) => {
    crearOptionParaSelect(adicional,select)
  })

}


function calcularMontoHora(){

  const horasMensuales = 200;
  let montoFijo;

  const montoFijoInput = document.getElementById('monto-fijo')
  const montoHoraInput = document.getElementById('monto-hora')

  montoFijoInput.addEventListener('input',(e)=> 
  {
    e.preventDefault()

    montoFijo = e.target.value
    montoFijoSueldo = montoFijo
    montoHoraInput.value = montoFijo/horasMensuales

    //define el maximo de la barra
    barra.max = montoFijo

    funcionaMientoBarra()
  })
}

function pintarMontosBlanco(montoBlanco,montoEfectivo,esPorcentual)
{
 
  let montoBancoText = document.getElementById('monto-banco')
  let motoEfectivoText = document.getElementById('monto-efectivo')

  montoBancoText.textContent = `MONTO EN BANCO (bruto): $${montoBlanco}`
  motoEfectivoText.textContent = `MONTO EN EFECTIVO (bruto): $${montoEfectivo}`

  if(esPorcentual){
    montoBancoText.textContent = `MONTO EN BANCO (bruto): %${montoBlanco}`
    motoEfectivoText.textContent = `MONTO EN EFECTIVO (bruto): %${montoEfectivo}`
  }
}

function obtenerAdicionalesParaElContrato(){

  let agregarAdicionales = document.getElementById('check-adicional').checked;

  if(!agregarAdicionales){
    return []
  }

  const selectAdicionales = document.getElementsByClassName('select-adicionales')
  let listaCodigosAdicionales = []

  let listaSelects = Array.from(selectAdicionales)

  listaSelects.forEach((select) =>{
      let codigoAdicional = select.value;

      listaCodigosAdicionales.push(codigoAdicional)
  })

  return listaCodigosAdicionales

}

function crearContrato()
{
  const btnCrear = document.getElementById('btn-crear-contrato');

  btnCrear.addEventListener('click',async (e)=>
  {
      e.preventDefault()

      let listaAdi = obtenerAdicionalesParaElContrato()
      let acuerdoPorcentual = document.getElementById('tipo-blanco').checked;

      let acuerdoFormal = 
      {
          concepto: 'DEPOSITO EN EL BANCO',
          cantidad: montoAcuerdoBlanco,
          esPorcentual: !acuerdoPorcentual
      } 

      const crearContratoDTO = 
      {
        dni: empleado.dni,
        montoHora: document.getElementById('monto-hora').value,
        montoFijo: document.getElementById('monto-fijo').value,
        modalidad: document.getElementById('select-modalidad').value,
        tipo: document.getElementById('select-tipo-contrato').value,
        adicionales: listaAdi,
        acuerdoBlanco:  acuerdoFormal
      }

      let titulo= `Estas seguro de crear el contrato?`
      let mensaje = 'revisa bien los datos antes de continuar'

       crearModal(titulo,mensaje).then((confirmacion) => 
      {
          confirmacion === true ? confirmarcionContrato(crearContratoDTO) : alert('se cancelo el contrato')
      })
  })
}


async function confirmarcionContrato(crearContratoDTO)
{
    let respuesta = await crearContratoEmpleado(crearContratoDTO)

    let responseCode = respuesta.response.status

    if(responseCode == 201)
    {
      mostrarAlerta('se creo un contrato exitosamente!',true).then((confirm)=>{
        location.reload()
      })
    }

    mostrarAlerta('ocurrio un problema , vuelve a intentar',false)
}