import { CrearEmpleadoNuevo, ObtenerRetencionesFijas, CrearRetencionesFijasCuenta } from "../../TS/API/CrearEmpleado.ts";
import mostrarAlerta from "../utils/crearAlerta.js";
import { getEmpleado, saveEmpleado } from "../Services/EmpleadoService.ts";

const btnCrearEmpleado = document.getElementById('btn-crear');
const btnSetearRetenciones = document.getElementById('btn-cuenta-config');
const containerChecks = document.getElementsByClassName('container-retenciones-fijas')[0];
const respuesta = await ObtenerRetencionesFijas();
const retencionesFijas = Array.from(respuesta.data);

//pintar retenciones fijas
retencionesFijas.forEach((retencion)=> 
{
    crearCheckRetencion(retencion,containerChecks)
});

btnSetearRetenciones.addEventListener('click',async ()=>{

    const numeroCuenta = getEmpleado().numeroCuenta;
    let listaCodigos = generarListaRetenciones()
    let response = await CrearRetencionesFijasCuenta(numeroCuenta,listaCodigos)
    let codigoEstado = response.response.status

    //TODO: asegurarse de que sea un 201 como codigo de estado
    if(codigoEstado != 200)
    {
        mostrarAlerta('ocurrio un problema al configurar las retenciones',false)
        return
    }

    mostrarAlerta('se configuraron nuevas retenciones para este empleado',true);
    return
})

CrearEmpleado();


function CrearEmpleado()
{
    btnCrearEmpleado.addEventListener('click',async (e)=>{
        e.preventDefault();
    
        const empleadoNuevo = {
            dni: document.getElementById('dni-emp').value,
            nombre: document.getElementById('nombre-emp').value,
            apellido: document.getElementById('apellido-emp').value,
            fechaIngreso: document.getElementById('fecha-nac').value,
            fechaNacimiento: document.getElementById('fecha-ing').value,
        }
    
        let response = await CrearEmpleadoNuevo(empleadoNuevo)
    
        let codigoEstado = response.response.status;
        let empleado =response.data
    
        if(codigoEstado != 201){
            mostrarAlerta('ocurrio un problema mientras se creaba un empleado',false)
            return
        }
        
        await saveEmpleado(empleado)
        mostrarAlerta('TARAN!! se creo un empleado nuevo (NO OLVIDES CONFIGURAR SU CUENTA)',true);
        setearDatosCuenta(empleado)
    })
}


function setearDatosCuenta(empleadoCreado)
{
    const cuentaLabel = document.getElementById('num-cuenta');
    const dniLabel = document.getElementById('dni-cuenta');
    const nombreLabel = document.getElementById('empleado-cuenta');

    cuentaLabel.textContent = `Cuenta  N°: ${empleadoCreado.numeroCuenta}`;
    dniLabel.textContent = `DNI: ${empleadoCreado.dni}`;
    nombreLabel.textContent = `Nombre: ${empleadoCreado.nombre} ${empleadoCreado.apellido}`;
}

function crearCheckRetencion(retencionFijaDTO,containerChecks)
{
    let labelCheck = document.createElement('label');
    let checkBox = document.createElement('input');

    checkBox.classList.add('retencion-fija-cuenta');

    checkBox.type = 'checkbox'
    checkBox.value = retencionFijaDTO.codigo;
    checkBox.checked = true

    let porcentual = retencionFijaDTO.esPorcentual == true ? '%' : '$';
    let quincena = retencionFijaDTO.esQuinceal == true ? 'primera': 'segunda' 
    labelCheck.textContent = `(${retencionFijaDTO.codigo}) ${retencionFijaDTO.concepto} 
                            [${porcentual} ${retencionFijaDTO.unidades}]  se descuenta en ${quincena} quincena`

    labelCheck.appendChild(checkBox)

    containerChecks.appendChild(labelCheck)
}


function generarListaRetenciones()
{
    const retencionesLabels = document.getElementsByClassName('retencion-fija-cuenta');
    const listaLabels = Array.from(retencionesLabels);

    let listaCodigos = []

    listaLabels.forEach((retencion)=> 
    {
        if(retencion.checked == true)
        {
            listaCodigos.push(retencion.value) 
        }
    })

    return listaCodigos
}