import { API_URL } from "../../config"
import { EmpleadoDTO } from "../Types/Empleados.tipos"

export const obtenerTodosLosEmpleados = async () => 
{
    const enpoint = `${API_URL}/Empleado`
    const requestOptions = {method: `GET`,headers: {}}

    const response = await fetch(enpoint,requestOptions);
    const data : EmpleadoDTO[] = await response.json();

    return {
        response,
        data
    }

}