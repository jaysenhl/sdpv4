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

