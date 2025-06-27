<template>
  <div
    v-if="content"
    class="bg-gray-800 p-4 rounded shadow mt-6 whitespace-pre-wrap text-sm"
  >
    {{ content }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ content: string }>()
</script>
