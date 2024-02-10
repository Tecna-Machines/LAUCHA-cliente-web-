import { EmpleadoDTO } from '../Types/Empleados.tipos';
import ComponenteEmpleadoItem from '../../components/Empleado.item';


//#regiont pintar lista de empleado
export function pintarItemsEmpleados(empleados:EmpleadoDTO[],contenedorListaEmpleados:HTMLElement)
{   
    if (contenedorListaEmpleados) {
        // Limpiar el contenedor antes de pintar los nuevos elementos
        while (contenedorListaEmpleados.firstChild) {
            contenedorListaEmpleados.removeChild(contenedorListaEmpleados.firstChild);
        }
    }

    empleados.forEach((empleado: EmpleadoDTO) => {

        const nombreCompleto = `${empleado.nombre} ${empleado.apellido}`;
        const dni = empleado.dni;
        const itemHTML = ComponenteEmpleadoItem(nombreCompleto, dni);
        
        if (contenedorListaEmpleados !== null) {
          contenedorListaEmpleados.appendChild(itemHTML);
        } else {
          console.error("No se encontró el elemento con ID 'empleados-lista'.");
        }
          
      })
}


//#region = filtrar empleados por nombre
export function pintaFiltrandoEmpleados(todosLosempleados:EmpleadoDTO[],contendorLista:HTMLElement,barraBusqueda:HTMLElement){
  if(barraBusqueda !=null)
  {
    barraBusqueda.addEventListener('input',(event) =>{
        event.preventDefault();
        let barra = event.target as HTMLInputElement
        let nombre = barra.value

        let empleados = todosLosempleados.filter(empleado => empleado.nombre.toLowerCase().includes(nombre.toLowerCase()))
        console.log(nombre)
        pintarItemsEmpleados(empleados,contendorLista)

    })
  }

}
