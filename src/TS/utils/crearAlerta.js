export default function mostrarAlerta(mensaje, exito) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop');
  
    const modal = document.createElement('div');
    modal.classList.add('modal');
  
    const emoji = document.createElement('span');
    emoji.textContent = exito ? '✅✅✅' : '🚫🚫🚫';
  
    const modalMensaje = document.createElement('p');
    modalMensaje.textContent = mensaje;
  
    const cerrarBtn = document.createElement('button');
    cerrarBtn.textContent = 'Cerrar';
    cerrarBtn.addEventListener('click', () => {
      modalBackdrop.remove();
    });
  
    modal.appendChild(emoji);
    modal.appendChild(modalMensaje);
    modal.appendChild(cerrarBtn);
  
    modalBackdrop.appendChild(modal);
    document.body.appendChild(modalBackdrop);
  }