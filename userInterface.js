/* DATE TIME */
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

const dateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
};

const now = new Date();
export const formattedDate = new Intl.DateTimeFormat('es-ES', dateOptions).format(now);
if (dateElement) {
  dateElement.textContent = formattedDate;
}

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true 
};

function updateTime() {
  const currentTime = new Date();
  const formattedTime = new Intl.DateTimeFormat('es-ES', timeOptions).format(currentTime);
  if (timeElement) {
    timeElement.textContent = formattedTime;
  }
}

setInterval(updateTime, 1000);

export function showLoadingPopup() {
  document.getElementById('loadingPopup').style.display = 'flex';
}

export function hideLoadingPopup() {
  document.getElementById('loadingPopup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded',(event)=>{
  let clientInfoComponent = document.querySelector('.clientInfoComponent')
    if(clientInfoComponent){
      clientInfoComponent.style.visibility = 'hidden'
    }
    else{
      console.log('no client component exists')
    }
})

// SEARCH CLIENT FULL INFORMATION
export function fillClientInfoCard(docName, docTelefono, docEmail, docClienteDesde, docTotalPuntos,docPuntosDisponibles, docTotalVisitas, docProdReclamados, docProdComprados){
  const nameElement = document.getElementById('nameElement')
  const telefonoElement = document.getElementById('telefonoElement')
  const emailElement = document.getElementById('emailElement')
  const clienteDesdeElement = document.getElementById('clienteDesdeElement')
  const totalDePuntosElement = document.getElementById('totalDePuntosElement')
  const puntosDisponiblesElement = document.getElementById('puntosDisponiblesElement')
  const totalDeVisitasElement = document.getElementById('totalDeVisitasElement')
  const productosReclamadosElement = document.getElementById('productosReclamadosElement')
  const productosCompradosElement = document.getElementById('productosCompradosElement')

  nameElement.textContent = docName;
  telefonoElement.textContent = docTelefono;
  emailElement.textContent = docEmail;
  clienteDesdeElement.textContent = docClienteDesde;
  totalDePuntosElement.textContent = docTotalPuntos
  puntosDisponiblesElement.textContent = docPuntosDisponibles
  totalDeVisitasElement.textContent = docTotalVisitas;
  productosReclamadosElement.textContent = docProdReclamados;
  productosCompradosElement.textContent = docProdComprados

}

// SEARCH CLIENT SHORT INFO
export function fillClientInfoCardShort(docName, docTelefono, docPuntosDisponibles){
  const nameElement = document.getElementById('nameElement')
  const telefonoElement = document.getElementById('telefonoElement')
  const puntosDisponibles = document.getElementById('puntosDisponiblesElement')

  nameElement.textContent = docName;
  telefonoElement.textContent = docTelefono;
  puntosDisponibles.textContent = docPuntosDisponibles;

}

export function showClientInfoComponent(){
  let clientInfoComponent = document.querySelector('.clientInfoComponent')
  clientInfoComponent.style.visibility = 'visible'
}

export function hideSearchClientComponent(){
  let searchClientComponent = document.querySelector('.searchClientComponent')
  searchClientComponent.style.display = 'none'
}

