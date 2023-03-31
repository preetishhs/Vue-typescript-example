<template>
  <div class="not-found">Page not found</div>
</template>

<style lang="scss" scoped>
.not-found {
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundPage',
  // ...
})
</script>
