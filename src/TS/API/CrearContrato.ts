import { API_URL } from "../../config"
import { AdicionalDTO, ContratoDTO, CrearContratoDTO, ModalidadDTO } from "../Types/Contrato.tipos"

export const crearContratoEmpleado = async (contrato:CrearContratoDTO) => 
{
    const enpoint = `${API_URL}/Contrato`
    const requestOptions = {method: `POST`,headers: {"Content-Type": "application/json"}}

    const requestBody = {body: JSON.stringify(contrato)}
    const message = {...requestOptions, ...requestBody}

    const response = await fetch(enpoint,message);
    const data : ContratoDTO = await response.json();

    return {
        response,
        data
    }

}

export const ObtenerAdicionalesExistentes = async () =>
{
    const enpoint = `${API_URL}/Adicional`
    const requestOptions = {method: `GET`,headers: {}}

    const response = await fetch(enpoint,requestOptions);
    const data : AdicionalDTO[] = await response.json();

    return {
        response,
        data
    }
}

export const ObtenerModalidadesExistentes = async () => 
{
    const enpoint = `${API_URL}/Modalidad`
    const requestOptions = {method: `GET`,headers: {}}

    const response = await fetch(enpoint,requestOptions);
    const data : ModalidadDTO[] = await response.json();

    return {
        response,
        data
    }
}