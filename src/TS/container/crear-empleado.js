import { CrearEmpleadoNuevo } from "../../TS/API/CrearEmpleado.ts";
import mostrarAlerta from "../utils/crearAlerta.js";

const btnCrearEmpleado = document.getElementById('btn-crear');



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

    mostrarAlerta('TARAN!! se creo un empleado nuevo (NO OLVIDES CONFIGURAR SU CUENTA)',true);
    setearDatosCuenta(empleado)
})

function setearDatosCuenta(empleadoCreado)
{
    const cuentaLabel = document.getElementById('num-cuenta');
    const dniLabel = document.getElementById('dni-cuenta');
    const nombreLabel = document.getElementById('empleado-cuenta');

    cuentaLabel.textContent = `Cuenta  N°: ${empleadoCreado.numeroCuenta}`;
    dniLabel.textContent = `DNI: ${empleadoCreado.dni}`;
    nombreLabel.textContent = `Nombre: ${empleadoCreado.nombre} ${empleadoCreado.apellido}`;
}

function crearCheckRetencion(retencionFijaDTO)
{

}