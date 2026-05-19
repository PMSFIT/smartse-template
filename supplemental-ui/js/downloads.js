(() => {
  const dropdowns = document.querySelectorAll('[data-downloads-dropdown]')
  if (!dropdowns.length) return

  const formatDate = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const renderMessage = (menu, message, extraClass = '') => {
    const node = document.createElement('div')
    node.className = `navbar-item is-disabled downloads-status${extraClass ? ` ${extraClass}` : ''}`
    node.textContent = message
    menu.replaceChildren(node)
  }

  const createArtifactLink = (item) => {
    const link = document.createElement('a')
    link.className = 'navbar-item downloads-artifact'
    link.href = item.url
    link.setAttribute('download', item.download || '')

    const label = document.createElement('span')
    label.className = 'downloads-artifact-label'
    label.textContent = item.label || item.name || 'Download artifact'
    link.appendChild(label)

    const metaParts = []
    if (item.platform) metaParts.push(item.platform)
    if (item.run_number) metaParts.push(`Run #${item.run_number}`)
    const createdAt = formatDate(item.created_at)
    if (createdAt) metaParts.push(createdAt)
    if (metaParts.length) {
      const meta = document.createElement('span')
      meta.className = 'downloads-artifact-meta'
      meta.textContent = metaParts.join(' • ')
      link.appendChild(meta)
    }

    return link
  }

  const renderManifest = (menu, manifest) => {
    const sections = Array.isArray(manifest?.sections) ? manifest.sections : []
    const fragment = document.createDocumentFragment()
    let hasArtifacts = false

    sections.forEach((section) => {
      const items = Array.isArray(section?.items)
        ? section.items.filter((item) => item?.url && !item?.expired)
        : []
      if (!items.length) return

      if (hasArtifacts) {
        const divider = document.createElement('hr')
        divider.className = 'navbar-divider'
        fragment.appendChild(divider)
      }

      const title = document.createElement('div')
      title.className = 'navbar-item is-disabled downloads-section-title'
      title.textContent = section.title || 'Downloads'
      fragment.appendChild(title)

      items.forEach((item) => {
        fragment.appendChild(createArtifactLink(item))
      })

      hasArtifacts = true
    })

    if (!hasArtifacts) {
      renderMessage(menu, 'No downloads available for this branch or pull request.')
      return
    }

    menu.replaceChildren(fragment)
  }

  const closeDropdown = (container, toggle, focusToggle = false) => {
    container.classList.remove('is-active')
    toggle.setAttribute('aria-expanded', 'false')
    if (focusToggle) toggle.focus()
  }

  const openDropdown = (container, toggle, focusFirst = false) => {
    container.classList.add('is-active')
    toggle.setAttribute('aria-expanded', 'true')
    if (focusFirst) {
      const firstLink = container.querySelector('.downloads-artifact')
      if (firstLink) firstLink.focus()
    }
  }

  dropdowns.forEach((container) => {
    const toggle = container.querySelector('.downloads-toggle')
    const menu = container.querySelector('[data-downloads-menu]')
    const manifestUrl = container.dataset.manifestUrl
    if (!toggle || !menu || !manifestUrl) return

    const absoluteManifestUrl = new URL(manifestUrl, window.location.href)

    toggle.addEventListener('click', () => {
      if (container.classList.contains('is-active')) {
        closeDropdown(container, toggle)
      } else {
        openDropdown(container, toggle)
      }
    })

    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openDropdown(container, toggle, true)
      } else if (event.key === 'Escape') {
        event.preventDefault()
        closeDropdown(container, toggle)
      }
    })

    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDropdown(container, toggle, true)
      }
    })

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeDropdown(container, toggle)
    })

    document.addEventListener('click', (event) => {
      if (!container.contains(event.target)) closeDropdown(container, toggle)
    })

    fetch(absoluteManifestUrl, {
      headers: { Accept: 'application/json' },
      cache: 'no-cache',
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Manifest request failed with ${response.status} ${response.statusText}`)
        return response.json()
      })
      .then((manifest) => {
        const normalizedSections = (manifest.sections || []).map((section) => ({
          ...section,
          items: (section.items || []).map((item) => ({
            ...item,
            url: new URL(item.url, absoluteManifestUrl).toString(),
          })),
        }))
        renderManifest(menu, { ...manifest, sections: normalizedSections })
      })
      .catch(() => {
        renderMessage(menu, 'Downloads are currently unavailable.', 'is-error')
      })
  })
})()
