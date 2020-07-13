function timerToMs(timerElement) {
  const timer = timerElement.innerText.split(':').map(time => parseInt(time))

  return ((timer[0] * 3600) + (timer[1] * 60) + timer[2])
}

function notificationFormat({ iftttUrl, name, timeOut, action }) {
  console.table([iftttUrl, name, timeOut, action]);

  return `${iftttUrl}|${name}|${timeOut}|${action}`
}

function getIFTTTUrl(trigger) {
  let iftttKey = 'b1cVKD_-upDtH29Mbl4FLq'

  return `https://maker.ifttt.com/trigger/${trigger}/with/key/${iftttKey}`
}



function buildingNotification() {
  console.log('buildingNotification');

  const action = 'building_done'
  const iftttUrl = getIFTTTUrl(action)
  
  const name = document.querySelector('.boxes-contents .name').innerText
  const timerElement = document.querySelector('.boxes-contents .timer')
  
  const timeOut = timerToMs(timerElement)
  
  return notificationFormat({iftttUrl, name, timeOut, action})
}

function needRessourceNotification() {
  console.log('needRessourceNotification');

  const action = 'need_ressources'
  const iftttUrl = getIFTTTUrl(action)
  
  const name = document.querySelector('.titleInHeader').innerText
  const timerElement = document.querySelector('.upgradeBlocked .timer')
  
  const timeOut = timerToMs(timerElement)
  
  return notificationFormat({iftttUrl, name, timeOut, action})
}

// app
if(document.querySelector('.boxes-contents .timer')) {
  buildingNotification()
} else if (document.querySelector('.upgradeBlocked .timer')) {
  needRessourceNotification()
} else {
  console.log('nothing to do');
}