<template>
  <div>
    <UiSimplifiedHeader />
    <main>
      <slot />
    </main>
    <NuxtLazyHydrate when-idle>
      <Cookiebar />
      <PreviewMode />
    </NuxtLazyHydrate>
    <ClientOnly>
      <Footer />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Footer from '~/modules/runtime/components/ui/Footer/Footer.vue';

usePageTitle();
useStructuredData().setLogoMeta();
</script>
