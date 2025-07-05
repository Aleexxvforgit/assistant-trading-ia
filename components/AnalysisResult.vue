<template>
  <div v-if="content">
    {{ content }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ content: string }>()
</script>
