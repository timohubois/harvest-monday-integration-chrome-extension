import './platform.harvestapp.js'

window._harvestPlatformConfig = {
  applicationName: 'MondayIntegration',
  skipStyling: true
}

window.addEventListener("message", function (event) {
  if (event.origin != "https://platform.harvestapp.com") {
    return
  }

  if (event.data.type == "frame:resize") {
    document.querySelector("iframe").style.height = event.data.value + "px"
  }

  if (event.data.type == "frame:close") {
    window.close()
  }
})

window.addEventListener('load', () => {
  const iframe = document.querySelector('iframe.popup-iframe')
  initIframe(iframe)
})

async function initIframe (iframe) {
  try {
    const dataFromStore = await chrome.storage.sync.get('HarvestMondayIntegration')
    const {
      projectName,
      pulseName,
      pulseId,
      boardId,
      permalink,
      external_reference
    } = dataFromStore.HarvestMondayIntegration || {}

    const id = external_reference?.id
    const group_id = external_reference?.group_id

    const url = new URL('https://platform.harvestapp.com/platform/timer')
    url.searchParams.append('external_item_id', id || pulseId || '')
    url.searchParams.append('external_item_name', pulseName || '')
    url.searchParams.append('external_group_id', group_id || boardId || '')
    url.searchParams.append('permalink', permalink || '')
    url.searchParams.append('default_project_name', projectName || '')
    url.searchParams.append('closable', 'false')
    // url.searchParams.append('chromeless', 'true')

    for (const [key, value] of url.searchParams.entries()) {
      if (!value) {
        url.searchParams.delete(key)
      }
    }

    if (null === iframe) {
      return
    }

    iframe.src = ''
    iframe.src = url?.href || ''

    const newIframe = iframe.cloneNode(true)
    iframe.parentNode.replaceChild(newIframe, iframe)

    let harvestMessaging = document.getElementById('harvest-messaging')
    let harvestTimerObj = document.querySelector('iframe.popup-iframe')
    let event = new Event('harvest-event:timers:add')
    event.element = harvestTimerObj
    harvestMessaging.dispatchEvent(event)

  } catch (error) {
    console.error('Error setting up iframe:', error)
  }
}
