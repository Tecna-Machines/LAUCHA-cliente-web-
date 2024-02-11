import '../../css/empleados.css'
import { obtenerContratoEmpleado } from '../API/ObtenerContrato';
import { obtenerTodosLosEmpleados } from '../API/ObtenerEmpleado';
import { saveEmpleado } from '../Services/EmpleadoService';
import { AcuerdoBlancoDTO, AdicionalDTO } from '../Types/Contrato.tipos';
import { EmpleadoDTO } from '../Types/Empleados.tipos';
import formatoFecha from '../utils/formatoFecha';
import { formatearComoMoneda } from '../utils/formatoMoneda';
import { pintaFiltrandoEmpleados,pintarItemsEmpleados } from '../utils/pintarListaEmpleados';
import $ from 'jquery';

//#region = pintar lista de empleados 
const contenedorListaEmpleados: HTMLElement | null = document.getElementById('empleados-lista');
const barraBusqueda: HTMLElement | null = document.getElementById('barra-busqueda-empleado');
let todosLosempleados : EmpleadoDTO[];

prepararCreacionContrato()

if (contenedorListaEmpleados != null && barraBusqueda !=null) {
    
    const empleadosPeticion = await obtenerTodosLosEmpleados()
     todosLosempleados = empleadosPeticion.data
    
    pintarItemsEmpleados(todosLosempleados,contenedorListaEmpleados) 
    pintaFiltrandoEmpleados(todosLosempleados,contenedorListaEmpleados,barraBusqueda)

} 

let botonesSeleccionar = $('.btn-empleado')

botonesSeleccionar.on('click',async (e)=>{
    const dniEmp = $(e.currentTarget).attr('value');

    let empleadoSeleccionado = todosLosempleados.filter(empleado => empleado.dni == dniEmp)[0]

    let dniDato = $('#dni-emp')
    let nombreDato = $('#nombre-emp')
    let apellidoDato = $('#apellido-emp')
    let fechaNacDato = $('#fecha-nac')
    let fechaIngreDato = $('#fecha-ing')
    let cuentaDato = $('#num-cuenta')

    if(dniEmp !=null){
        dniDato.text(`DNI: ${empleadoSeleccionado.dni}`)
        nombreDato.text(`Nombres(s): ${empleadoSeleccionado.nombre}`)
        apellidoDato.text(`Apellido(s): ${empleadoSeleccionado.apellido}`)
        fechaNacDato.text(`Fecha Nacimiento: ${formatoFecha(new Date(empleadoSeleccionado.fechaNacimiento))}`)
        fechaIngreDato.text(`Fecha Ingreso: ${formatoFecha(new Date(empleadoSeleccionado.fechaIngreso))}`)
        cuentaDato.text(`Cuenta N°: ${empleadoSeleccionado.numeroCuenta}`)
        
        //guardo el empleado en memoria para operar sobr el despues
        saveEmpleado(empleadoSeleccionado)

        limpiarDatosDelContrato()
        pintarLosDatosContrato(dniEmp)
    }
    
})

async function pintarLosDatosContrato(dni:string){

    let respuesta = await obtenerContratoEmpleado(dni)
    let contrato = respuesta.data
    
    let numeroContrato = $('#numero-contrato')
    let fechaContrato = $('#fecha-contrato')
    let modalidadContrato = $('#modalidad-contrato')

    numeroContrato.text(`CONTRATO N°: ${contrato.codigo}`)
    fechaContrato.text(`FECHA DEL CONTRATO ${contrato.fecha}`)
    modalidadContrato.text(`MODALIDAD: ${contrato.modalidad.descripcion}`)

    let montoHora = contrato.montoHora
    let montoFijo = contrato.montoFijo
    
    let tbody = document.getElementsByClassName('cuerpo-tabla')[0]

    let itemHora = crearElementoTabla('MONTO HORA',formatearComoMoneda(montoHora))
    let itemFijo = crearElementoTabla('MONTO FIJO',formatearComoMoneda(montoFijo))


    tbody.appendChild(itemHora)
    tbody.appendChild(itemFijo)

    pintarAcuerdoBlanco(contrato.acuerdoBlanco)

    let listaAdicionales = contrato.adicionales

    let cuerpoTablaAdicional: HTMLElement | null = document.getElementById('cuerpo-tabla-adicional')

    if(cuerpoTablaAdicional != null){

        listaAdicionales.forEach((adicional : AdicionalDTO)=>{
            let tr = pintarLosAdicionales(adicional)
            cuerpoTablaAdicional?.appendChild(tr)
    })
    }
    
}

function crearElementoTabla(concepto:string,monto:string) : HTMLElement
{
   const tr = document.createElement('tr')

   const tdConcepto = document.createElement('td');
   const tdMonto = document.createElement('td'); 

   tdConcepto.textContent = concepto;
   tdMonto.textContent = monto

   tr.appendChild(tdConcepto)
   tr.appendChild(tdMonto)

   return tr;
}

function pintarAcuerdoBlanco(acuerdo:AcuerdoBlancoDTO)
{
    let concepto = $('#tabla-banco-concept')
    let unidad = $('#tabla-banco-uni')
    let monto = $('#tabla-banco-mont')

    concepto.text(acuerdo.concepto)
    monto.text(acuerdo.cantidad)

    if(acuerdo.esPorcentual === true){
        unidad.text('%')
    }else{
        unidad.text('($)')
        monto.text(formatearComoMoneda(acuerdo.cantidad))

    }

}

function pintarLosAdicionales(adicional:AdicionalDTO):HTMLElement{

    const tdCodigo = document.createElement('td');
    const tdConcepto = document.createElement('td');
    let tdUni = document.createElement('td');
    const tdCantidad = document.createElement('td');

    tdCodigo.textContent = adicional.codigo;
    tdConcepto.textContent = adicional.concepto;
    tdUni.textContent = '(%)'
    tdCantidad.textContent = adicional.cantidad.toString()

    if(!adicional.esPorcentual){
        tdUni.textContent = '($)'
        tdCantidad.textContent = formatearComoMoneda(adicional.cantidad)
    }

    const tr = document.createElement('tr')

    tr.appendChild(tdCodigo)
    tr.appendChild(tdConcepto)
    tr.appendChild(tdUni)
    tr.appendChild(tdCantidad)

    return tr
}

function limpiarDatosDelContrato() {
    const tablasContrato: NodeListOf<Element> = document.querySelectorAll('.tabla-borrar');

    tablasContrato.forEach((tabla: Element) => {
        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
    });
}


function prepararCreacionContrato(){

    const btnCrearContrato = $('#btn-crear-contrato')

    btnCrearContrato.on('click',(event)=>{
        event.preventDefault()
        location.href = 'contrato-nuevo.html'
    })
}
