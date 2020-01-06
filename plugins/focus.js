document.addEventListener('DOMContentLoaded', () => {
  const details = [].slice.call(
    document.querySelectorAll('[data-ice="anchor"]')
  )
  let observer
  details.map(detail => {
    observer = new MutationObserver(mutations => {
      hideAllDetails()
      mutations.map(mutation => {
        if (mutation.target.classList.contains('inner-link-active')) {
          console.log(mutation.target)
          mutation.target.parentNode.style.opacity = 1
        }
      })
    })
    observer.observe(detail, {
      attributes: true,
      attributeFilter: ['class']
    })
  })
})

function hideAllDetails() {
  ;[].slice
    .call(document.querySelectorAll('[data-ice="anchor"]'))
    .map(anchor => {
      if (!anchor.classList.contains('inner-link-active')) {
        anchor.parentNode.style.opacity = 0.3
      }
    })
}
