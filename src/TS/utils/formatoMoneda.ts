export function formatearComoMoneda(numero: number): string {
    
    return numero.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });
}