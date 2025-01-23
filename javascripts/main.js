document.addEventListener('DOMContentLoaded', () => {
  // createHeader()
  createPosters()
  zoomPoster()
})

// function createHeader() {
//   const header = document.querySelector('header')
//   const text = '#we_made_bad_posters_every_day'

//   for (let i = 0; i < text.length; i++) {
//     const symbol = `<span>${text[i]}</span>`
//     header.innerHTML = header.innerHTML + symbol
//   }
// }

function moveHeaderLetters() {
  let letter = document.querySelector('.draggable')
  letter.onmousedown = function (event) {
    let shiftX = event.clientX - letter.getBoundingClientRect().left
    let shiftY = event.clientY - letter.getBoundingClientRect().top

    letter.style.position = 'absolute'
    letter.style.zIndex = 1000
    document.body.append(letter)

    moveAt(event.pageX, event.pageY)

    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
      letter.style.left = pageX - shiftX + 'px'
      letter.style.top = pageY - shiftY + 'px'
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY)
    }

    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove)

    // отпустить мяч, удалить ненужные обработчики
    letter.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove)
      letter.onmouseup = null
    }
  }

  letter.ondragstart = function () {
    return false
  }
}

function createPosters() {
  const wrapper = document.querySelector('#wrapper')

  for (let i = 1; i < 720; i++) {
    const posterItem = document.createElement('img')
    posterItem.classList.add('posterItem')
    posterItem.setAttribute('data-src', `images/all/poster${i}.jpg`)
    posterItem.src = 'images/blur.jpg'
    posterItem.loading = 'lazy'

    wrapper.appendChild(posterItem)

    posterItem.onload = function () {
      posterItem.src = posterItem.getAttribute('data-src')
    }
  }
}

function zoomPoster() {
  const zoom = document.querySelector('#zoom')
  const posters = document.querySelectorAll('.posterItem')

  posters.forEach((poster) => {
    poster.addEventListener('click', () => {
      let clone = poster.cloneNode()
      clone.classList.add('zoom')
      zoom.appendChild(clone)
      zoom.style.display = 'block'
    })
  })

  zoom.addEventListener('click', () => {
    zoom.style.display = 'none'
    while (zoom.firstChild) {
      zoom.removeChild(zoom.firstChild)
    }
  })
}
