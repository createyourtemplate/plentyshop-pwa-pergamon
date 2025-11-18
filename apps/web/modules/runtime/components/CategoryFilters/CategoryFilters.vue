<template>
  <div class="flex flex-col md:flex-row md:gap-2">
    <CategoryFiltersFilter v-for="facet in facets" :key="facet.id" :facet="facet" />
  </div>
</template>

<script setup lang="ts">
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';

const props = defineProps<CategoryFiltersProps>();

const { facets } = toRefs(props);
</script>
