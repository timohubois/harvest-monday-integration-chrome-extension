import './platform.harvestapp.js'

window._harvestPlatformConfig = {
  applicationName: 'MondayIntegration',
  skipStyling: false
}

window.addEventListener('load', addHarvestButtonTimerToPulse)

function addHarvestButtonTimerToPulse () {
  let initialLocation = window.location.href

  initHarvestTimerButton()
  monitorLocationChanges()

  function monitorLocationChanges () {
    if (initialLocation !== window.location.href) {
      initialLocation = window.location.href
      initHarvestTimerButton()
    }
    setTimeout(monitorLocationChanges, 1500)
  }

  async function initHarvestTimerButton () {
    try {
      const path = window.location.pathname

      if (path.includes('/pulses/')) {
        document.querySelectorAll('.harvest-timer').forEach(e => e.remove())

        const data = getDataFromMonday()
        const { projectName } = data
        const { pulseName } = data
        const { pulseId } = data
        const { boardId } = data
        const { permalink } = data

        const dataFromStore = await chrome.storage.sync.get('HarvestMondayIntegration')
        dataFromStore.projectName = projectName
        dataFromStore.pulseName = pulseName
        dataFromStore.pulseId = pulseId
        dataFromStore.boardId = boardId
        dataFromStore.permalink = permalink

        chrome.storage.sync.set({ HarvestMondayIntegration: dataFromStore })

        const timerButtonHtml = `
          <div class='harvest-timer' id='harvest-timer-obj'
            data-default='{"project_name": "${projectName}" }'
            data-item='{"id":"${pulseId}", "name": "${pulseName}"}'
            data-group='{"id": "${boardId}" }'
            data-permalink='${permalink}'
            >
          </div>`

        const styles = `
          <style>
          .harvest-timer {
            -webkit-font-smoothing: antialiased;
            background-image: linear-gradient(#fff, #eee);
            border: 1px solid #bbb;
            border-radius: 2px;
            color: var(--primary-text-color);
            cursor: pointer;
            display: grid !important;
            font: inherit;
            font-size: 0;
            height: 30px !important;
            line-height: 1;
            margin-inline-end: -3px !important;
            padding: 3px;
            place-content: center !important;
            place-items: center !important;
            position: relative;
            width: 30px !important;
          }

          .harvest-timer:hover {
            background-image: linear-gradient(#f8f8f8, #e8e8e8)
          }

          .harvest-timer:active {
            background: #eee;
            box-shadow: inset 0 1px 4px rgba(0, 0, 0, .1)
          }

          .harvest-timer:before {
            color: var(--primary-text-color);
            content: 'Harvest';
            font-size: .85rem;
            left: -55px;
            position: absolute;
          }

          .harvest-timer::after {
            background: url(//platform.harvestapp.com/img/icon-timer.dzg2GEgNRsgn.svg) 50% 50% no-repeat;
            content: "";
            display: inline-block;
            font: inherit;
            height: 100%;
            left: 0;
            margin: 0;
            padding: 0;
            position: absolute;
            top: 0;
            width: 100%
          }

          .harvest-timer.running {
            background-image: linear-gradient(#53b2fc, #1385e5);
            border-color: #075fa9;
            color: #fff
          }

          .harvest-timer.running:hover {
            background-image: linear-gradient(#49a4fd, #0e7add)
          }

          .harvest-timer.running:active {
            background: #1385e5;
            box-shadow: inset 0 1px 5px rgba(0, 0, 0, .2)
          }

          #harvest-iframe {
            background: white;
            border: none;
            border-radius: 6px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, .2), 0 0 0 1px rgba(0, 0, 0, .1);
            height: 300px;
            left: 50%;
            margin: 0;
            margin-left: -250px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            top: 0;
            transition: height 150ms;
            width: 500px
          }

          @media (min-height: 400px) {
            #harvest-iframe {
              top: 10%
            }
          }

          @media (min-height: 550px) {
            #harvest-iframe {
              top: 20%
            }
          }

          .harvest-overlay {
            background: rgba(0, 0, 0, .6);
            height: 100%;
            left: 0;
            opacity: 1;
            overflow: scroll;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 9998
          }
        </style>`

        const pulseActionsWrapper = document.querySelector('.pulse_actions_wrapper')
        pulseActionsWrapper.insertAdjacentHTML('beforeend', styles)
        pulseActionsWrapper.insertAdjacentHTML('beforeend', timerButtonHtml)

        // Trigger Harvest event to add the timber button.
        let harvestMessaging = document.getElementById('harvest-messaging')
        let harvestTimerObj = document.getElementById('harvest-timer-obj')
        let event = new Event('harvest-event:timers:add')
        event.element = harvestTimerObj
        harvestMessaging.dispatchEvent(event)
      }
    }
    catch (e) {
      console.warn(e)
      console.warn('Retrying to init Harvest Timber Button in 3 seconds...')
      setTimeout(initHarvestTimerButton, 3000)
    }
  }
}

function getDataFromMonday () {
  function wait (ms) {
    let start = new Date().getTime()
    let end = start
    while (end < start + ms) {
      end = new Date().getTime()
    }
  }
  wait(150)


  const path = window.location.pathname
  const urlBase = window.location.href.replace(path, '') || ''

  const projectNameElement = document.querySelector('.home-control-base-item-component.selected .text-with-highlights > span')
  const projectName = projectNameElement ? projectNameElement.textContent : ''

  const pulsNameElement = document.querySelector('.pulse_title h2')
  const pulseName = pulsNameElement ? pulsNameElement.textContent : ''

  const pulseId = path.substring(path.lastIndexOf('/') + 1) || ''
  const boardId = location.pathname.split('/')[2] || ''
  const permalink = urlBase && boardId && pulseId
    ? `${urlBase}/${boardId}/pulses/${pulseId}` : urlBase && boardId ? `${urlBase}/${boardId}` : ''

  if (path.includes('/pulses/')) {
    return { projectName, pulseName, pulseId, boardId, permalink }
  }
  else {
    return {}
  }
}

window.addEventListener("message", function (event) {
  if (event.origin != "https://platform.harvestapp.com") {
    return
  }

  if (event.data.type == "timer:started") {
    let data = getDataFromMonday()
    data.event = 'timer:started'
    data.external_reference = event.data.value?.external_reference || ''
    chrome.storage.sync.set({ HarvestMondayIntegration: data })
  }

  if (event.data.type == "timer:stopped") {
    let data = getDataFromMonday()
    data.event = 'timer:stopped'
    data.external_reference = event.data.value?.external_reference || ''
    chrome.storage.sync.set({ "HarvestMondayIntegration": data })
  }

  if (event.data.type == "frame:resize") {
    document.querySelector("iframe").style.height = event.data.value + "px"
  }
})
