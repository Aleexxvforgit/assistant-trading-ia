<template>
  <section class="analysis-box" v-if="content">
    <h2>Analyse IA du trade</h2>
    <div v-for="(section, index) in sections" :key="index" class="section">
      <h3>{{ section.title }}</h3>
      <ul>
        <li v-for="(item, i) in section.points" :key="i" v-html="item"></li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const sections = computed(() => {
  // Sépare le texte en parties : "1. ...", "2. ...", "3. ..."
  const parts = props.content.split(/^\d\./m).filter(Boolean)

  // Titre des sections
  const titles = [
    "Ce qui a bien fonctionné",
    "Ce qui aurait pu mal tourner",
    "Conseils personnalisés pour l’avenir"
  ]

  return parts.map((part, i) => {
    // Découpe chaque partie en lignes, en retirant retours à la ligne superflus
    const lines = part.trim().split(/\n+/).map(line => line.trim()).filter(Boolean)

    // Nettoie les numéros en début (ex: "- **Stratégie...**" devient la ligne directe)
    const points = lines.map(line => line.replace(/^[-*]\s?/, ''))

    return {
      title: titles[i] ?? `Section ${i + 1}`,
      points
    }
  })
})
</script>

<style scoped>
.analysis-box {
  margin-top: 3rem;
  padding: 1.75rem 2rem;
  background-color: #1e293b;
  border-radius: 24px;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  line-height: 1.6;
  color: #dbeafe;
  text-align: left;
  font-feature-settings: "liga" 1;
}

.analysis-box h2 {
  font-size: 1.8rem;
  margin-bottom: 1.25rem;
  color: #3b82f6;
  font-weight: 700;
  text-align: center;
}

.analysis-box h3 {
  font-size: 1.3rem;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  color: #93c5fd;
  font-weight: 600;
}

.analysis-box ul {
  list-style: disc inside;
  padding-left: 0;
}

.analysis-box li {
  margin-bottom: 0.7rem;
  font-size: 1.05rem;
}
</style>
