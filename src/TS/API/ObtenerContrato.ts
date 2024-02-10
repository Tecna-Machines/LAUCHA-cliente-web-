import { API_URL } from "../../config"
import { ContratoDTO } from "../Types/Contrato.tipos"

export const obtenerContratoEmpleado = async (dni:string) => 
{
    const enpoint = `${API_URL}/Empleado/${dni}/contrato`
    const requestOptions = {method: `GET`,headers: {}}

    const response = await fetch(enpoint,requestOptions);
    const data : ContratoDTO = await response.json();

    return {
        response,
        data
    }

}