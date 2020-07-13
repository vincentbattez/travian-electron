function timerToMs(timerElement) {
  const timer = timerElement.innerText.split(':').map(time => parseInt(time))

  return ((timer[0] * 3600) + (timer[1] * 60) + timer[2])
}

function notificationFormat(notifObj) {
  if(!notifObj) {
    console.log('nothing to do');
    return
  }
  const { iftttUrl, name, timeOut, action } = notifObj

  console.table([iftttUrl, name, timeOut, action]);

  return `${iftttUrl}|${name}|${timeOut}|${action}`
}

function notificationObjectFormat({ iftttUrl, name, timeOut, action }) {
  return {
    iftttUrl,
    name,
    timeOut,
    action
  }
}

function getIFTTTUrl(trigger) {
  let iftttKey = 'b1cVKD_-upDtH29Mbl4FLq'

  return `https://maker.ifttt.com/trigger/${trigger}/with/key/${iftttKey}`
}

function buildNotification(action, nameElement, timerElement) {
  console.log('buildNotification - ' + action);

  const iftttUrl = getIFTTTUrl(action)  
  const name = nameElement.innerText
  const timeOut = timerToMs(timerElement)
  
  return notificationObjectFormat({iftttUrl, name, timeOut, action})
}

// app
function getSoonNotification() {
  const notificationCollection = []

  // Building
  if(document.querySelector('.buildingList .timer')) {
    notificationCollection.push(
      buildNotification(
        'building_done',
        document.querySelector('.buildingList .name'),
        document.querySelector('.buildingList .timer'),
      )
    )
  }

  // Mouvement HP
  if (document.querySelector('#movements .timer')) {
    notificationCollection.push(
      buildNotification(
        'mouvement',
        document.querySelector('#movements .timer'),
        document.querySelector('#movements .timer'),
      )
    )
  }

  // Mouvement
  if (document.querySelector('.troop_details .timer')) {
    notificationCollection.push(
      buildNotification(
        'mouvement',
        document.querySelector('.troopHeadline a'),
        document.querySelector('.troop_details .timer'),
      )
    )
  }

  // Need more ressource
  if (document.querySelector('.upgradeBlocked .timer')) {
    notificationCollection.push(
      buildNotification(
        'need_ressources',
        document.querySelector('.titleInHeader'),
        document.querySelector('.upgradeBlocked .timer'),
      )
    )
  }

  const timeOutCollection = notificationCollection.map(notification => notification.timeOut)

  return notificationCollection.find(notif => notif.timeOut === Math.min(...timeOutCollection))
}

console.log(getSoonNotification());

notificationFormat(getSoonNotification()) || null