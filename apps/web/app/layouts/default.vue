<template>
  <div>
    <UiHeader />
    <NarrowContainer v-if="breadcrumbs?.length" class="hidden md:block p-4 md:px-0">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </NarrowContainer>
    <main>
      <slot />
    </main>
    <Cookiebar />
    <PreviewMode />
    <ClientOnly>
      <Footer />
    </ClientOnly>
    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';
import Footer from '~/modules/runtime/components/ui/Footer/Footer.vue';

defineProps<DefaultLayoutProps>();

const { setLogoMeta } = useStructuredData();
const { isOpen, product } = useQuickCheckout();
const viewport = useViewport();
const route = useRoute();

setLogoMeta();
</script>
