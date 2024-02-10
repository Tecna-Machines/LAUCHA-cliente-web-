export type AdicionalDTO = {
    codigo:string
    concepto:string
    cantidad:number
    esPorcentual:boolean
}

type ModalidadDTO = {
    codigo:string
    descripcion:string
}

export type AcuerdoBlancoDTO = {
    concepto:string
    cantidad:number
    esPorcentual:boolean
}

export type ContratoDTO = {
    codigo:string
    dni:string
    empleado:string
    fecha:string
    montoHora:number
    montoFijo:number
    tipo:string
    acuerdoBlanco:AcuerdoBlancoDTO
    modalidad:ModalidadDTO
    adicionales: AdicionalDTO[]
}