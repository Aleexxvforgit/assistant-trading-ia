<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js'
import { computed, toRefs } from 'vue'

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

const props = defineProps<{ trades: Array<any> }>()

const chartData = computed(() => {
  let capital = 0
  const labels: string[] = []
  const data: number[] = []
  props.trades.forEach((trade, i) => {
    capital += trade.exit - trade.entry
    labels.push(trade.asset + ' #' + (i + 1))
    data.push(capital)
  })
  return {
    labels,
    datasets: [
      {
        label: 'Évolution du capital',
        data,
        fill: false,
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
        tension: 0.2
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true }
  },
  scales: {
    x: { title: { display: true, text: 'Trade' } },
    y: { title: { display: true, text: 'Capital' } }
  }
}
</script>
