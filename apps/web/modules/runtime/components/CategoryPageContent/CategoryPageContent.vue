<template>
  <NarrowContainer class="mb-20 px-4 md:px-0" data-testid="category-layout">
    <div class="flex md:justify-between items-end md:items-center my-6 md:my-10 gap-2">
      <h1 class="font-semibold !font-[CormorantGaramond] mb-0 leading-none text-2xl md:text-[40px]">{{ title }}</h1>
      <div>
        <span class="text-sm md:text-2xl">{{ totalProducts }} Artikel</span>
      </div>
    </div>
    <div data-testid="category-page-content">
      <CategorySidebar :is-open="isOpen" @close="close">
        <NuxtLazyHydrate when-visible>
          <slot name="sidebar" />
        </NuxtLazyHydrate>
      </CategorySidebar>
      <div>
        <SelectedFilters :facets="productsCatalog.facets" />
      </div>
      <div class="flex-1">
        <div class="fixed bottom-0 left-0 w-full z-10 flex justify-between items-center">
          <UiButton variant="primary" class="!rounded-none text-sm w-full md:hidden whitespace-nowrap" @click="open">
            <template #prefix>
              <SfIconTune />
            </template>
            Filtern & Sortieren
          </UiButton>
        </div>
        <section
          v-if="products?.length"
          class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-y-[30px] md:gap-y-[20px] md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-5 mb-10 md:mb-5"
          data-testid="category-grid"
        >
          <NuxtLazyHydrate
            v-for="(product, index) in products"
            :key="productGetters.getVariationId(product)"
            when-visible
          >
            <UiProductCard
              :product="product"
              :name="productGetters.getName(product) ?? ''"
              :rating-count="productGetters.getTotalReviews(product)"
              :rating="productGetters.getAverageRating(product, 'half')"
              :image-url="addModernImageExtension(productGetters.getCoverImage(product))"
              :image-alt="
                productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) ||
                productGetters.getName(product) ||
                ''
              "
              :image-title="productImageGetters.getImageName(productImageGetters.getFirstImage(product)) || ''"
              :image-height="productGetters.getImageHeight(product) || 600"
              :image-width="productGetters.getImageWidth(product) || 600"
              :slug="productGetters.getSlug(product) + `-${productGetters.getId(product)}`"
              :priority="index < 5"
              :base-price="productGetters.getDefaultBasePrice(product)"
              :unit-content="productGetters.getUnitContent(product)"
              :unit-name="productGetters.getUnitName(product)"
              :show-base-price="productGetters.showPricePerUnit(product)"
            />
          </NuxtLazyHydrate>
        </section>
        <LazyCategoryEmptyState v-else />
        <UiPagination
          v-if="totalProducts > 0"
          :key="`${totalProducts}-${itemsPerPage}`"
          :current-page="getFacetsFromURL().page ?? 1"
          :total-items="totalProducts"
          :page-size="itemsPerPage"
          :max-visible-pages="maxVisiblePages"
        />
      </div>
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfIconTune, useDisclosure } from '@storefront-ui/vue';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';

const { data: productsCatalog } = useProducts();

const { title, totalProducts, itemsPerPage = 24, products = [] } = defineProps<CategoryPageContentProps>();

const { t } = useI18n();
const { getFacetsFromURL } = useCategoryFilter();
const { addModernImageExtension } = useModernImage();


const { isOpen, open, close } = useDisclosure();
const viewport = useViewport();

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 5 : 2));

if (viewport.isLessThan('md')) close();
</script>
