import { EmpleadoDTO } from "../Types/Empleados.tipos"

export const saveEmpleado = (empleado:EmpleadoDTO) => 
{   
    const empleadoString = JSON.stringify(empleado)
    sessionStorage.setItem('empleado',empleadoString)
}

export const getEmpleado = ():EmpleadoDTO =>
{
    const empleadoJson = sessionStorage.getItem('empleado')

    if(empleadoJson != null)
    {
        const objEmpleado : EmpleadoDTO = JSON.parse(empleadoJson)
        return objEmpleado
    }

    throw new Error('empleado fue nulo')
}