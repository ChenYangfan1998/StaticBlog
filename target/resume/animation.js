let wideEnough = {
  value: window.innerWidth > 1345
}

window.addEventListener('resize', () => {
  wideEnough.value = window.innerWidth > 1345
  console.log(wideEnough.value)
})

let sections = document.getElementsByTagName("section")
let sectionsHeight, checkPoints, windowInnerHeight
let animating = false

function watchChanges() {
  window.addEventListener('resize', () => {
    if (wideEnough.value) {
      initHeightAndCheckPointer();
    }
  })
}

function initHeightAndCheckPointer() {
  windowInnerHeight = window.innerHeight;
  sectionsHeight = []
  checkPoints = [0]
  for (const section of sections) {
    sectionsHeight.push(section.scrollHeight)
  }

  let checkBuffer = 0

  /* todo some problems here if we set it as 0.8. It makes the last page not exactually as */
  const sliceRate = 1;
  sectionsHeight.forEach(height => {
    if (height <= windowInnerHeight) {
      checkBuffer += height
      checkPoints.push(checkBuffer);
    } else {
      checkBuffer += height % (windowInnerHeight * sliceRate);
      checkPoints.push(checkBuffer);
      [...Array(parseInt(height / (windowInnerHeight * sliceRate))).keys()].forEach(i => {
        checkBuffer += windowInnerHeight * sliceRate
        checkPoints.push(checkBuffer)
      })
    }
  })
}

function addListener() {
  window.addEventListener('wheel', e => {
    if (wideEnough.value) {
      e.preventDefault();
      if (!animating) {
        e.deltaY !== 0 ? e.deltaY > 0 ? nextCheckPoint() : lastCheckPoint() : ''
      }
    }
  }, {
    passive: false
  })

  let touchBeginY = null
  let touchMoveY = null
  window.addEventListener('touchstart', e => {
    touchBeginY = e.touches[0].screenY
  })
  window.addEventListener('touchmove', e => {
    if (wideEnough) {
      e.preventDefault()
      touchMoveY = e.touches[0].screenY
      if (!animating) {
        console.log(touchMoveY - touchBeginY)
        touchMoveY - touchBeginY !== 0 ? touchMoveY - touchBeginY < 0 ? nextCheckPoint() : lastCheckPoint() : ''
      }
    }
  }, {
    passive: false
  })
  window.addEventListener('touchend', () => {
    touchBeginY = null
    touchMoveY = null
  })
}

function nextCheckPoint() {
  const currentPosition = getCurrentScrollTop();
  checkPoints.some(checkPoint => {
    if (currentPosition < checkPoint) {
      scrollToY(currentPosition, checkPoint, 10, position => window.scrollTo(0, position))
      return true
    }
  })
}

function lastCheckPoint() {
  const currentPosition = getCurrentScrollTop();
  let target = currentPosition
  checkPoints.some(checkPoint => {
    if (currentPosition > checkPoint) {
      target = checkPoint
    } else {
      return true
    }
  })
  scrollToY(currentPosition, target, 10, position => window.scrollTo(0, position))
}

function getCurrentScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}

function scrollToY(start, end, rate = 10, callback) {
  animating = true

  let step = () => {
    if (Math.abs(end - start) < .5) {
      callback(end);
      animating = false
      return;
    }
    start = start + (end - start) / rate;
    callback(start);
    requestAnimationFrame(step);
  };

  step();
}

initHeightAndCheckPointer();
watchChanges();
addListener();