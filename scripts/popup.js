initPopup()

function initPopup () {
  window.addEventListener('load', onLoad)
  window.addEventListener('message', onMessage)

  return () => {
    window.removeEventListener('load', onLoad)
    window.removeEventListener('message', onMessage)
  }
}

function onMessage (event) {
  if (event.origin != "https://platform.harvestapp.com") {
    return
  }

  if (event.data.type == "frame:resize") {
    document.querySelector("iframe").style.height = event.data.value + "px"
  }

  if (event.data.type == "frame:close" && window.document.title == "Harvest") {
    window.close()
  }
}

function onLoad () {
  window._harvestPlatformConfig = {
    applicationName: 'MondayIntegration',
    skipStyling: true
  }

  const iframe = document.querySelector('iframe.popup-iframe')
  initIframe(iframe)
}

async function initIframe (iframe) {
  if (!iframe) {
    return
  }

  try {
    const dataFromStore = await chrome.storage.sync.get('HarvestMondayIntegration')
    const {
      projectName,
      pulseName,
      pulseId,
      boardId,
      permalink
    } = dataFromStore.HarvestMondayIntegration || {}

    const url = new URL('https://platform.harvestapp.com/platform/timer')
    if (pulseId) url.searchParams.append('external_item_id', pulseId)
    if (pulseName) url.searchParams.append('external_item_name', pulseName)
    if (boardId) url.searchParams.append('external_group_id', boardId)
    if (permalink) url.searchParams.append('permalink', permalink)
    if (projectName) url.searchParams.append('default_project_name', projectName)

    url.searchParams.append('closable', 'false')

    for (const [key, value] of url.searchParams.entries()) {
      if (!value) {
        url.searchParams.delete(key)
      }
    }

    if (null === iframe) {
      return
    }

    iframe.src = url?.href || ''

    document.body.innerHTML = ''
    document.body.appendChild(iframe)

  } catch (error) {
    console.error('Error setting up iframe:', error)
  }
}

// Sync storage changes to popup.
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName === 'sync' && changes.HarvestMondayIntegration) {
    onLoad()
  }
})
