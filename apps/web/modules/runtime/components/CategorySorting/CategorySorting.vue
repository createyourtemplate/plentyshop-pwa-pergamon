<template>
  <div data-testid="category-sorting">
    <div class="px-2 md:px-0 border-b-2 border-black md:border-0">
      <SfSelect id="sortBy" v-model="selected" :aria-label="t('sortBy')" data-testid="select-sort-by" class="!px-0 border-none !ring-0">
        <option v-for="option in options" :key="option" :value="option">
          {{ t(`sortType.${option}`) }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfSelect } from '@storefront-ui/vue';

const { updateSorting } = useCategoryFilter();
const { t } = useI18n();
const { getJsonSetting: availableSortingOptions } = useSiteSettings('availableSortingOptions');
const { getSetting: defaultSortingOption } = useSiteSettings('defaultSortingOption');

const options = computed(() => availableSortingOptions());

const selected = computed({
  get: () => {
    return (useNuxtApp().$router.currentRoute.value.query.sort || defaultSortingOption() || options.value[0]) as string;
  },
  set: (selectedOption) => {
    updateSorting(selectedOption);
  },
});
</script>
