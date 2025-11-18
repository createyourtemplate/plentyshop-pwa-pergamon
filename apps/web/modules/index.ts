import { defineNuxtModule, createResolver, addImportsDir, extendPages, addComponent } from '@nuxt/kit';
import type { NuxtPage } from 'nuxt/schema';

export default defineNuxtModule({
  async setup(options, nuxt) {

    /**
     * register components
     */
    const {resolve} = createResolver(import.meta.url);

    await addComponent({
      name: 'SelectedFilters',
      filePath: resolve('./runtime/components/CategoryFilters/SelectedFilters.vue'),
    });

    await addComponent({
      name: 'SelectedFilter',
      filePath: resolve('./runtime/components/CategoryFilters/SelectedFilter.vue'),
    });

    /**
     * override components
     */
    nuxt.hook('components:extend', (components) => {

      // NarrowContainer
      const NarrowContainer = components.find((c) => c.pascalName === 'NarrowContainer');
      if (NarrowContainer) {
        NarrowContainer.filePath = resolve('./runtime/components/NarrowContainer/NarrowContainer.vue');
      }

      const Gallery = components.find((c) => c.pascalName === 'Gallery');
      if (Gallery) {
        Gallery.filePath = resolve('./runtime/components/Gallery/Gallery.vue');
      }

      // CategoryPageContent
      const CategoryPageContent = components.find((c) => c.pascalName === 'CategoryPageContent');
      if (CategoryPageContent) {
        CategoryPageContent.filePath = resolve('./runtime/components/CategoryPageContent/CategoryPageContent.vue');
      }

      // CategoryPageContent
      const WishlistPageContent = components.find((c) => c.pascalName === 'WishlistPageContent');
      if (WishlistPageContent) {
        WishlistPageContent.filePath = resolve('./runtime/components/WishlistPageContent/WishlistPageContent.vue');
      }

      // CategorySidebar
      const CategorySidebar = components.find((c) => c.pascalName === 'CategorySidebar');
      if (CategorySidebar) {
        CategorySidebar.filePath = resolve('./runtime/components/CategorySidebar/CategorySidebar.vue');
      }

      // CategoryFilters
      const CategoryFilters = components.find((c) => c.pascalName === 'CategoryFilters');
      if (CategoryFilters) {
        CategoryFilters.filePath = resolve('./runtime/components/CategoryFilters/CategoryFilters.vue');
      }

      // CategorySorting
      const CategorySorting = components.find((c) => c.pascalName === 'CategorySorting');
      if (CategorySorting) {
        CategorySorting.filePath = resolve('./runtime/components/CategorySorting/CategorySorting.vue');
      }

      // Filter
      const Filter = components.find((c) => c.pascalName === 'CategoryFiltersFilter');
      if (Filter) {
        Filter.filePath = resolve('./runtime/components/CategoryFilters/Filter.vue');
      }

      // Pagination
      const Pagination = components.find((c) => c.pascalName === 'UiPagination');
      if (Pagination) {
        Pagination.filePath = resolve('./runtime/components/ui/Pagination/Pagination.vue');
      }

      // PurchaseCard
      const PurchaseCard = components.find((c) => c.pascalName === 'UiPurchaseCard');
      if (PurchaseCard) {
        PurchaseCard.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCardCyt.vue');
      }

      // ProductCard
      const ProductCard = components.find((c) => c.pascalName === 'UiProductCard');
      if (ProductCard) {
        ProductCard.filePath = resolve('./runtime/components/ui/ProductCard/ProductCardCustom.vue');
      }

      // WishListButton
      const WishlistButton = components.find((c) => c.pascalName === 'WishlistButton');
      if (WishlistButton) {
        WishlistButton.filePath = resolve('./runtime/components/WishlistButton/WishlistButton.vue');
      }

      const Header = components.find((c) => c.pascalName === 'UiHeader');
      if (Header) {
        Header.filePath = resolve('./runtime/components/ui/Header/Header.vue');
      }

      // MegaMenu
      const MegaMenu = components.find((c) => c.pascalName === 'MegaMenu');
      if (MegaMenu) {
        MegaMenu.filePath = resolve('./runtime/components/MegaMenu/MegaMenu.vue');
      }
      
      const Footer = components.find((c) => c.pascalName === 'Footer');
      if (Footer) {
        Footer.filePath = resolve('./runtime/components/ui/Footer/Footer.vue');
      }
    });

    extendPages((pages: NuxtPage[]) => {

      // Homepage
      const overrideHomePage = pages.find((p) => p.name === 'index');
      if (overrideHomePage) {
        overrideHomePage.file = resolve('./runtime/pages/homepage/indexCyt.vue');
      }

      // CategoryPage
      const overrideCategoryPage = pages.find((p) => p.name === 'slug');
      if (overrideCategoryPage) {
        overrideCategoryPage.file = resolve('./runtime/pages/category/[...slug]Cyt.vue');
      }

      // ProductPage
      const overrideProductPage = pages.find((p) => p.name === 'product-slug');
      if (overrideProductPage) {
        overrideProductPage.file = resolve('./runtime/pages/product/[slug]Cyt.vue');
      }
    });

    nuxt.hook('tailwindcss:config', (config) => {
      // Screens
      if (config?.theme?.extend?.screens) {
        (config.theme.extend.screens as any).xl = '1200px';
        (config.theme.extend.screens as any)['4xl'] = '2000px';
      }
    });

    /**
     * extend i18n Cormorant Garamond
     */
    nuxt.hook('i18n:registerModule', (register) => {
      register({
        langDir: resolve('./runtime/lang'),
        locales: [
          {
            code: 'en',
            file: 'en.json',
          },
          {
            code: 'de',
            file: 'de.json',
          },
        ],
      });
    });

    /**
     * add composable imports
     */
    addImportsDir(resolve('./runtime/composables'));

    /**
     * Override composables
     */
    nuxt.options.alias['~/composables/defaults'] = resolve(
      __dirname,
      './runtime/composables/defaultsCyt.ts'
    )
  }
});
