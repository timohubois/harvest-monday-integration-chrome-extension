async function initMain () {
  if (window.location.href.includes('monday.com')) {
    import('./platform.harvestapp.js').then(() => {
      window._harvestPlatformConfig = {
        applicationName: 'MondayIntegration',
        skipStyling: false
      }
    })

    await resetStorage()
    await updateStorage()

    window.addEventListener('load', monitorLocationChanges)
    window.addEventListener('blur', resetStorage)
    window.addEventListener('focus', updateStorage)
    window.addEventListener('pagehide', resetStorage)
    window.addEventListener('beforeunload', resetStorage)
  }
}

let initialLocation = window.location.href

async function monitorLocationChanges () {
  if (initialLocation !== window.location.href) {
    initialLocation = window.location.href
    await updateStorage()
    await maybeAddTimerButtonToPulse()
  }
  setTimeout(monitorLocationChanges, 2000)
}

async function maybeAddTimerButtonToPulse () {
  try {
    const path = window.location.pathname

    if (path.includes('/pulses/')) {
      document.querySelectorAll('.harvest-timer').forEach(e => e.remove())
      await updateStorage()
      const data = await chrome.storage.sync.get('HarvestMondayIntegration')
      const {
        projectName,
        pulseName,
        pulseId,
        boardId,
        permalink
      } = data.HarvestMondayIntegration || {}

      const timerButtonHtml = `
        <div class='harvest-timer' id='harvest-timer-obj'
          data-default='{"project_name": "${projectName}" }'
          data-item='{"id":"${pulseId}", "name": "${pulseName}"}'
          data-group='{"id": "${boardId}" }'
          data-permalink='${permalink}'
          >
        </div>`

      // Overwrites the default Harvest CSS styles, will also be used as fallback if Harvest CSS fails to load.
      const styles = `
        <style>
        .harvest-timer {
          -webkit-font-smoothing: antialiased;
          background-image: linear-gradient(#fff, #eee);
          border: 1px solid #bbb;
          border-radius: 2px;
          color: var(--primary-text-color) !important;
          cursor: pointer;
          display: grid !important;
          font: inherit;
          font-size: 0;
          height: 30px !important;
          line-height: 1;
          margin-block-start: -7px !important;
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
      if (!pulseActionsWrapper) {
        setTimeout(await maybeAddTimerButtonToPulse(), 3000)
        return
      }
      pulseActionsWrapper.insertAdjacentHTML('beforeend', styles)
      pulseActionsWrapper.insertAdjacentHTML('beforeend', timerButtonHtml)

      // Trigger Harvest event to add the Timer button.
      let harvestMessaging = document.getElementById('harvest-messaging')
      let harvestTimerObj = document.getElementById('harvest-timer-obj')
      let event = new Event('harvest-event:timers:add')
      event.element = harvestTimerObj
      harvestMessaging.dispatchEvent(event)
    }
  } catch (e) {
    setTimeout(maybeAddTimerButtonToPulse, 3000)
  }
}

async function getDataFromMonday () {
  const path = window.location.pathname
  const urlBase = new URL(window.location.href).origin

  const selectedProject = document.querySelector('.home-control-base-item-component.selected')
  const projectName = selectedProject?.querySelector('.text-with-highlights > span')?.textContent || ''

  const pulseNameElement = document.querySelector('.pulse_title h2')
  const pulseName = pulseNameElement?.textContent || ''

  const pulseId = path.substring(path.lastIndexOf('/') + 1) || ''
  const boardId = path.split('/')[2] || ''

  const permalink = (urlBase && boardId && pulseId)
    ? `${urlBase}/boards/${boardId}/pulses/${pulseId}`
    : (urlBase && boardId && pulseId) ? `${urlBase}/boards/${boardId}` : ''

  if (path.includes('/pulses/')) {
    return { projectName, pulseName, pulseId, boardId, permalink }
  } else if (path.includes('/boards/')) {
    return { projectName, pulseName: 'Miscellaneous > REPLACE_THIS_WITH_A_DESCRIPTION', pulseId: 'miscellaneous', boardId, permalink }
  } else {
    return {}
  }
}

async function updateStorage () {
  try {
    const data = await getDataFromMonday()
    const { HarvestMondayIntegration } = await chrome.storage.sync.get('HarvestMondayIntegration')
    Object.assign(HarvestMondayIntegration, data)
    await chrome.storage.sync.set({ HarvestMondayIntegration })
  } catch (e) { }
}

async function resetStorage () {
  try {
    chrome.storage.sync.set({ HarvestMondayIntegration: { projectName: 'Internal' } })
  } catch (e) { }
}

initMain()
