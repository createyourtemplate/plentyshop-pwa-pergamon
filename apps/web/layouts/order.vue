<template>
  <UiNavbarTop />
  <main>
    <NarrowContainer>
      <slot />
    </NarrowContainer>
  </main>
  <ClientOnly>
    <Footer />
  </ClientOnly>
</template>
<script setup lang="ts">
import Footer from '~/modules/runtime/components/ui/Footer/Footer.vue';
</script>
