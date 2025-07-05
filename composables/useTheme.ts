// composables/useTheme.ts
import { ref, onMounted, watch } from 'vue'

export const useTheme = () => {
  const theme = ref<'light' | 'dark'>('light')

  const getPreferredTheme = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (stored === 'dark' || stored === 'light') return stored
      // Préférence système si rien n'est stocké
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  const updateHtmlTheme = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme.value === 'dark')
    }
  }

  // Initialiser le thème en fonction de la classe HTML déjà présente (script head)
  if (typeof window !== 'undefined') {
    if (document.documentElement.classList.contains('dark')) {
      theme.value = 'dark'
    } else {
      theme.value = 'light'
    }
    // Pas besoin de réappliquer la classe ici
  }

  onMounted(() => {
    updateHtmlTheme()
  })

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    updateHtmlTheme()
    // Forcer un repaint pour Tailwind avec la même durée que le CSS global
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  })

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme
  }
}
