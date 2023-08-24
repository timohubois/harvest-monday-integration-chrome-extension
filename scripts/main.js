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

  function initHarvestTimerButton () {
    try {
      const path = window.location.pathname
      const urlBase = window.location.href.replace(path, '')

      if (path.includes('/pulses/')) {
        document.querySelectorAll('.harvest-timer').forEach(e => e.remove())

        const projectName = document.querySelector('.home-control-base-item-component.selected .text-with-highlights > span').textContent
        const pulseName = document.querySelector('.pulse_title h2').textContent
        const pulseId = path.substring(path.lastIndexOf('/') + 1)
        const boardId = location.pathname.split('/')[2]
        const permalink = `${urlBase}/${boardId}/pulses/${pulseId}`

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
              display: grid !important;
              height: 30px !important;
              margin-inline-end: -3px !important;
              place-content: center !important;
              place-items: center !important;
              width: 30px !important;
            }
            .harvest-timer:before {
              color: var(--primary-text-color);
              content: 'Harvest';
              font-size: .85rem;
              left: -55px;
              position: absolute;
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
      console.log('Retrying to init Harvest Timber Button in 3 seconds...')
      setTimeout(initHarvestTimerButton, 3000)
    }
  }
}

window.addEventListener("message", function (event) {
  if (event.origin != "https://platform.harvestapp.com") {
    return;
  }

  if (event.data.type == "frame:resize") {
    document.querySelector("iframe").style.height = event.data.value + "px";
  }
});
