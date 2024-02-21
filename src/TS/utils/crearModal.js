export default function crearModal(titulo, mensaje) {
    return new Promise((resolve) => {

      // Crear elementos del modal
      const modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add('modal-backdrop');
  
      const modal = document.createElement('div');
      modal.classList.add('modal');
  
      // Crear título
      const modalTitulo = document.createElement('h3');
      modalTitulo.textContent = titulo;
  
      // Línea divisoria
      const hr = document.createElement('hr');
  
      const modalMensaje = document.createElement('p');
      modalMensaje.textContent = mensaje;
  
      const btnConfirmar = document.createElement('button');
      btnConfirmar.textContent = 'Confirmar';
      btnConfirmar.addEventListener('click', () => {
        resolve(true); // Resuelve la promesa con true al confirmar
        modalBackdrop.remove();
      });
  
      const btnCancelar = document.createElement('button');
      btnCancelar.textContent = 'Cancelar';
      btnCancelar.addEventListener('click', () => {
        resolve(false); // Resuelve la promesa con false al cancelar
        modalBackdrop.remove();
      });
  
      // Agregar elementos al modal
      modal.appendChild(modalTitulo);
      modal.appendChild(hr);
      modal.appendChild(modalMensaje);
      modal.appendChild(btnConfirmar);
      modal.appendChild(btnCancelar);
  
      modalBackdrop.appendChild(modal);
      document.body.appendChild(modalBackdrop);
    });
  }
  