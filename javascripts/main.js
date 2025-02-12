document.addEventListener('DOMContentLoaded', () => {
  createHeaderImages()
  adaptiveHeader()
  pausedAnimOnHover()
  showAbout()
  createPosters()
  zoomPoster()
})

function showAbout() {
  const button = document.querySelector('.about p')
  const about = document.querySelector('.about div')

  button.addEventListener('click', () => {
    about.classList.toggle('aboutText')
    button.classList.toggle('active')
  })
}

function createHeaderImages() {
  const header = document.querySelector('header')

  for (let i = 1; i < 41; i++) {
    const img = document.createElement('img')
    img.className = `img-${i} pic fall`
    let random = Math.random() * i
    img.style = `animation-delay: -${random}s; left: ${i * 2.4}vw; `
    img.setAttribute('data-src', `images/pic_webp/pic-${i}.webp`)
    img.src = 'images/stickerBlur.png'
    img.loading = 'lazyimg'

    header.appendChild(img)

    img.onload = function () {
      img.src = img.getAttribute('data-src')
    }
  }
}

function pausedAnimOnHover() {
  const pictures = document.querySelectorAll('.pic')
  pictures.forEach((pic) => {
    pic.onmouseover = (event) => {
      pic.classList.remove('fall')
      pic.classList.add('hover')
      pic.style.top = `${event.pageY - 10}px`
    }
    pic.onmouseout = (event) => {
      pic.classList.add('fall')
      pic.classList.remove('hover')
    }
  })
}

function adaptiveHeader() {
  let width = window.innerWidth
  const header = document.querySelector('header')

  resizeHeader()

  window.onresize = () => {
    resizeHeader()
  }

  function resizeHeader() {
    if (width < 700) {
      header.classList.add('mobile')
      header.classList.remove('desktop')
    } else {
      header.classList.remove('mobile')
      header.classList.add('desktop')
    }
  }
}

function createPosters() {
  const wrapper = document.querySelector('#wrapper')

  for (let i = 1; i < 720; i++) {
    const posterItem = document.createElement('img')
    posterItem.classList.add('posterItem')
    posterItem.setAttribute('data-src', `images/tiny/poster${i}.jpg`)
    posterItem.setAttribute('data-srcFull', `images/all/poster${i}.jpg`)
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
      clone.src = clone.getAttribute('data-srcFull')
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
