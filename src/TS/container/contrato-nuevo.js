import '../../css/contrato.css'
import {ObtenerAdicionalesExistentes} from '../../TS/API/CrearContrato.ts'

const barra = document.getElementById('barra-blanco');

barra.addEventListener('input', function() {
  const value = (barra.value - barra.min) / (barra.max - barra.min);
  const color = `linear-gradient(to right, var(--azul-marino) ${value * 100}%, var(--verde-claro) ${value * 100}%)`;
  barra.style.background = color;
});

obtenerLosAdicionales()

async function obtenerLosAdicionales(){

  const adicionales = await ObtenerAdicionalesExistentes();

  const select = document.getElementsByClassName('select-adicionales')
  const listaAdicionales =  Array.from(adicionales.data)

  let listaSelects = Array.from(select)

  listaAdicionales.forEach((adicional) => {
    crearOptionParaSelect(adicional,select[0])
  })
}


function crearOptionParaSelect(AdicionalDTO,selectPadre){

  const option = document.createElement('option')

  let unidad = AdicionalDTO.esPorcentual == true ? '%' : '$'

  option.text = `(${AdicionalDTO.codigo}) ${AdicionalDTO.concepto} (${unidad}) ${AdicionalDTO.cantidad}`

  selectPadre.appendChild(option);
}