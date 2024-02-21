import { API_URL } from "../../config";
import { RetencionFijaDTO } from "../Types/Cuenta.tipos";
import { CrearEmpleadoDTO, EmpleadoDTO } from "../Types/Empleados.tipos";

export const ObtenerRetencionesFijas = async () => 
{
    const enpoint = `${API_URL}/RetencionFija`
    const requestOptions = {method: `GET`,headers: {}}

    const response = await fetch(enpoint,requestOptions);
    const data : RetencionFijaDTO[] = await response.json();

    return {
        response,
        data
    }
}

export const CrearEmpleadoNuevo = async (empleado:CrearEmpleadoDTO) =>
{
    const enpoint = `${API_URL}/Empleado`
    const requestOptions = {method: `POST`,headers: {"Content-Type": "application/json"}}

    const requestBody = {body: JSON.stringify(empleado)}
    const message = {...requestOptions, ...requestBody}

    const response = await fetch(enpoint,message);
    const data : EmpleadoDTO = await response.json();

    return {
        response,
        data
    }
}