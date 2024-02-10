export default function ComponenteEmpleadoItem(nombre: string, dni: string): HTMLElement {
    
    const div = document.createElement('div');
    div.classList.add('empleado-item');
  
    const nombreParrafo = document.createElement('p');
    nombreParrafo.textContent = nombre;
  
    const dniParrafo = document.createElement('p');
    dniParrafo.textContent = `Dni: ${dni}`;
  
    const boton = document.createElement('button');
    boton.classList.add('btn-empleado');
    boton.textContent = 'seleccionar';
    boton.value=dni
  
    div.appendChild(nombreParrafo);
    div.appendChild(dniParrafo);
    div.appendChild(boton);
  
    return div;
  }
  