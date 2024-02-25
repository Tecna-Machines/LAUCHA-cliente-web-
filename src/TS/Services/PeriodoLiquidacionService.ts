export const savePeriodoLiquidacion = (periodo: { inicioPeriodo: Date, finPeriodo: Date }) =>
{
    const periodoString = JSON.stringify(periodo)
    sessionStorage.setItem('periodo-liquidar',periodoString);
}

export const getPeriodoLiquidacion = () => 
{
    const periodoJSON = sessionStorage.getItem('periodo-liquidar');

    if(periodoJSON != null)
    {
        const objPeriodo = JSON.parse(periodoJSON)
        return objPeriodo
    }

    throw new Error('periodo fue nulo')
}
