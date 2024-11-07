(() => {
  const iframe = document.createElement("iframe");
  iframe.id = "harvest-iframe";
  const overlay = document.createElement("div");
  overlay.className = "harvest-overlay";
  overlay.appendChild(iframe);
  overlay.addEventListener("click", close);
  document.addEventListener("keyup", ({
    key
  }) => {
    if (key === "Escape")
      close();
  });
  function open(url) {
    iframe.src = url;
    document.body.appendChild(overlay);
  }
  function close() {
    var _a;
    (_a = overlay.parentNode) == null ? void 0 : _a.removeChild(overlay);
  }
  function adjustHeight(height) {
    iframe.style.height = `${height}px`;
  }
  const stylesheet = `.harvest-timer.styled {
    -webkit-font-smoothing: antialiased;
    background-image: linear-gradient(#fff, #eee);
    border: 1px solid #bbb;
    border-radius: 2px;
    color: #222;
    cursor: pointer;
    display: inline-block;
    font: inherit;
    font-size: 0;
    height: 12px;
    line-height: 1;
    margin: 0;
    padding: 3px;
    position: relative;
    vertical-align: top;
    width: 12px;
  }
  .harvest-timer.styled:hover {
    background-image: linear-gradient(#f8f8f8, #e8e8e8);
  }
  .harvest-timer.styled:active {
    background: #eee;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  .harvest-timer.styled::after {
    background: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20aria-label='Clock%20icon'%3e%3ccircle%20cx='12'%20cy='12'%20r='10'%20/%3e%3cpolyline%20points='12%206%2012%2012%2016%2014'%20/%3e%3c/svg%3e") 50% 50% no-repeat;
    content: "";
    display: inline-block;
    font: inherit;
    height: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .harvest-timer.styled.running {
    background-image: linear-gradient(#53b2fc, #1385e5);
    border-color: #075fa9;
    color: #fff;
  }
  .harvest-timer.styled.running:hover {
    background-image: linear-gradient(#49a4fd, #0e7add);
  }
  .harvest-timer.styled.running:active {
    background: #1385e5;
    box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  #harvest-iframe {
    background: white;
    border: none;
    border-radius: 6px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1);
    height: 300px;
    left: 50%;
    margin: 0;
    margin-left: -250px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 0;
    transition: height 150ms;
    width: 500px;
  }
  @media (min-height: 400px) {
    #harvest-iframe {
      top: 10%;
    }
  }
  @media (min-height: 550px) {
    #harvest-iframe {
      top: 20%;
    }
  }

  .harvest-overlay {
    background: rgba(0, 0, 0, 0.6);
    height: 100%;
    left: 0;
    opacity: 1;
    overflow: scroll;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: calc(infinity);
  }`;
  const scheme = "https";
  const baseUrl = `${scheme}://${"platform.harvestapp.com"}`;
  let lastRunningTimerData;
  let xdm = document.getElementById("harvest-messaging");
  if (!document.getElementById("harvest-worker")) {
    let worker = document.createElement("iframe");
    worker.hidden = true;
    worker.id = "harvest-worker";
    worker.src = `${baseUrl}/platform/worker`;
    document.body.appendChild(worker);
  }
  if (!xdm) {
    xdm = document.createElement("div");
    xdm.id = "harvest-messaging";
    xdm.hidden = true;
    document.body.appendChild(xdm);
  }
  let param = function(params) {
    let results = [];
    for (let name in params) {
      let value = params[name];
      if (value != null) {
        results.push(`${name}=${encodeURIComponent(value)}`);
      }
    }
    return results.join("&");
  };
  let config = function() {
    if (window._harvestPlatformConfig) {
      return window._harvestPlatformConfig;
    } else {
      return JSON.parse(document.querySelector("script[data-platform-config]").dataset.platformConfig);
    }
  };
  let getData = function(el) {
    let data = {};
    let attributes = ["account", "item", "group", "default", "skip-styling"];
    for (let i = 0; i < attributes.length; i++) {
      let key = attributes[i];
      if (el.getAttribute(`data-${key}`)) {
        data[key] = getValue(el, key);
      } else {
        data[key] = null;
      }
    }
    if (data.group == null) {
      data.group = getValue(el, "project");
    }
    data.permalink = el.getAttribute("data-permalink");
    return data;
  };
  let getValue = function(el, key) {
    let value;
    try {
      value = JSON.parse(el.getAttribute(`data-${key}`));
    } catch (error) {
    }
    if ((value == null ? void 0 : value.id) != null) {
      value.id = "" + value.id;
    }
    return value;
  };
  let setTimer = function(data) {
    var _a, _b, _c, _d;
    lastRunningTimerData = data;
    let lastRunningTimerGroup = ((_a = data == null ? void 0 : data.group) == null ? void 0 : _a.id) || void 0;
    let lastRunningTimerItem = ((_b = data == null ? void 0 : data.item) == null ? void 0 : _b.id) || void 0;
    let harvestTimers = document.querySelectorAll(".harvest-timer");
    let results = [];
    for (let i = 0; i < harvestTimers.length; i++) {
      let timer = harvestTimers[i];
      let timerData = getData(timer);
      let group = ((_c = timerData.group) == null ? void 0 : _c.id) || void 0;
      let item = ((_d = timerData.item) == null ? void 0 : _d.id) || void 0;
      if (lastRunningTimerData == null || group !== lastRunningTimerGroup || item !== lastRunningTimerItem) {
        timer.classList.remove("running");
        let removed = [];
        for (let j = 0; j < timer.children.length; j++) {
          let child = timer.children[j];
          removed.push(child.classList.remove("running"));
        }
        results.push(removed);
      } else {
        timer.classList.add("running");
        let added = [];
        for (let j = 0; j < timer.children.length; j++) {
          let child = timer.children[j];
          added.push(child.classList.add("running"));
        }
        results.push(added);
      }
    }
    return results;
  };
  let stopTimer = function() {
    return setTimer(null);
  };
  let createPermalink = function(template, data) {
    if (template != null && data != null) {
      if (data.account != null) {
        template = template.replace("%ACCOUNT_ID%", data.account.id);
      }
      if (data.group != null) {
        template = template.replace("%PROJECT_ID%", data.group.id);
      }
      if (data.group != null) {
        template = template.replace("%GROUP_ID%", data.group.id);
      }
      if (data.item != null) {
        template = template.replace("%ITEM_ID%", data.item.id);
      }
    }
    return template;
  };
  let listenForEvent = function(name, handler) {
    if (window.jQuery != null) {
      return window.jQuery(xdm).bind(name, handler);
    } else {
      return xdm.addEventListener(name, handler);
    }
  };
  window.addEventListener("message", function(evt) {
    if (evt.origin !== baseUrl) {
      return;
    }
    if (evt.data == null) {
      return;
    }
    const {
      type,
      value
    } = evt.data;
    switch (type) {
      case "frame:close":
        return close();
      case "frame:resize":
        return adjustHeight(value);
      case "timer:started":
        const {
          id,
          group_id
        } = value.external_reference;
        return setTimer({
          group: {
            id: group_id
          },
          item: {
            id
          }
        });
      case "timer:stopped":
        return stopTimer();
    }
  });
  let HarvestPlatform = class HarvestPlatform2 {
    constructor({
      stylesheet: stylesheet2
    }) {
      let event, styleNode;
      this.addTimers = this.addTimers.bind(this);
      this.findTimers = this.findTimers.bind(this);
      this.stylesheet = stylesheet2;
      styleNode = document.createElement("style");
      document.head.appendChild(styleNode);
      styleNode.appendChild(document.createTextNode(this.stylesheet));
      listenForEvent("harvest-event:timers:add", this.addTimers);
      listenForEvent("harvest-event:timers:chrome:add", this.findTimers);
      this.findTimers();
      xdm.setAttribute("data-ready", true);
      event = document.createEvent("CustomEvent");
      event.initCustomEvent("harvest-event:ready", true, true, {});
      (document.body || xdm).dispatchEvent(event);
    }
    addTimers(e) {
      let element, ref, ref1, ref2;
      element = e.element || ((ref = e.originalEvent) != null ? (ref1 = ref.detail) != null ? ref1.element : void 0 : void 0) || ((ref2 = e.detail) != null ? ref2.element : void 0);
      if ((element != null ? element.jquery : void 0) != null) {
        element = element.get(0);
      }
      if (element) {
        return this.findTimer(element);
      }
    }
    findTimers() {
      let element, elements, i, len, results, selector;
      selector = ".harvest-timer:not([data-listening])";
      elements = document.querySelectorAll(selector);
      results = [];
      for (i = 0, len = elements.length; i < len; i++) {
        element = elements[i];
        results.push(this.findTimer(element));
      }
      return results;
    }
    // Find the timer associated with the given element
    // element - HTMLElement representing a timer
    findTimer(element) {
      let skipAttr = element.getAttribute("data-skip-styling");
      let skipStyling = config().skipStyling || element.classList.contains("styled") || skipAttr != null && skipAttr !== false && skipAttr !== "false";
      if (!skipStyling) {
        element.classList.add("styled");
      }
      element.addEventListener("click", (e) => {
        e.stopPropagation();
        return this.openIframe(getData(element));
      });
      setTimer(lastRunningTimerData);
      return element.setAttribute("data-listening", true);
    }
    // Open a timer dialog for the given timer and pass the given timer data
    // timer - HTMLElement representing the harvest-timer
    // data - Object containing the timer data
    openIframe(data) {
      let ref, ref1, ref2, ref3, ref4, ref5, ref6;
      let getParams = {
        app_name: config().applicationName,
        service: data.service || window.location.hostname,
        permalink: data.permalink || createPermalink(config().permalink, data),
        external_account_id: (ref = data.account) != null ? ref.id : void 0,
        external_group_id: (ref1 = data.group) != null ? ref1.id : void 0,
        external_group_name: (ref2 = data.group) != null ? ref2.name : void 0,
        external_item_id: (ref3 = data.item) != null ? ref3.id : void 0,
        external_item_name: (ref4 = data.item) != null ? ref4.name : void 0,
        default_project_code: (ref5 = data.default) != null ? ref5.project_code : void 0,
        default_project_name: (ref6 = data.default) != null ? ref6.project_name : void 0
      };
      return open(`${baseUrl}/platform/timer?${param(getParams)}`);
    }
  };
  if (window.postMessage == null) {
    console.warn(`Harvest Platform is disabled.
  To start and stop timers, cross-domain messaging must be supported
  by your browser.`);
  } else if (!window.XMLHttpRequest || !("withCredentials" in new XMLHttpRequest())) {
    console.warn(`Harvest Platform is disabled.
  To check for running timers, xhr requests with credentials must be
  supported by your browser.`);
  } else if (self.HarvestPlatform != null) {
    self.HarvestPlatform.findTimers();
  } else {
    self.HarvestPlatform = new HarvestPlatform({
      stylesheet
    });
  }
  //# sourceMappingURL=platform.js.map
  })()
