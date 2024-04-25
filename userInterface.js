const dateTimeElement = document.getElementById('date')
const fecha = new Date(); 
const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);

if (dateTimeElement) {
    dateTimeElement.textContent = fechaFormateada;
}
