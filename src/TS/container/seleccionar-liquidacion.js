import { savePeriodoLiquidacion } from "../Services/PeriodoLiquidacionService";

const btnLiquidarPersona = document.getElementById('btn-persona');

btnLiquidarPersona.addEventListener('click',(e) => 
{
    e.preventDefault();

    const inicioPeriodo = document.getElementById('inicio-periodo').value;
    const finPeriodo = document.getElementById('fin-periodo').value;
    
    const fechaInicio = new Date(inicioPeriodo)
    const fechaFin = new Date(finPeriodo)

    if (isNaN(fechaInicio) || isNaN(fechaFin)) {
        alert('Por favor, ingrese fechas válidas');
        return;
    }

    // Calcula la diferencia en milisegundos entre las dos fechas
    const diferenciaMilisegundos = fechaFin - fechaInicio;

    // Calcula la diferencia en días dividiendo la diferencia en milisegundos por el número de milisegundos en un día
    const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    if (diferenciaDias > 31)
    {
        alert('El período no puede ser mayor a 31 días');
        return;
    }

    if(fechaInicio > fechaFin)
    {
        alert('la fecha de inicio debe ser mayor a la fecha de fin')
        return
    }

    if(fechaInicio.getTime() === fechaFin.getTime())
    {
        alert('las fechas no deben coincidir')
        return
    }


    savePeriodoLiquidacion({fechaInicio,fechaFin})
    
    location.href='../pages/liquidar-empleado.html'
})