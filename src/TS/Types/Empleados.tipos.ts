export type EmpleadoDTO = {
  dni: string;
  nombre: string;
  apellido: string;
  fechaIngreso: Date;
  fechaNacimiento: Date;
  numeroCuenta: string;
  fechaCreacion: Date;
  estadoCuenta: boolean;
};

export type CrearEmpleadoDTO = {
  dni:string
  nombre:string
  apellido:string
  fechaIngreso:Date
  fechaNacimiento:Date
}