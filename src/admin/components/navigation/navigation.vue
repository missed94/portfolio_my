<template>
  <nav class="navigation-component">
    <div class="container">
      <ul class="navigation__list">
        <li
          v-for="link in links"
          :key="link.id"
          :class="['navigation__item', {active: link.active}]"
        >
          <a :href="`/${link.alias}`" class="navigation__link">{{link.title}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
const links = [
  { id: 0, title: "Обо мне", alias: "about", active: true },
  { id: 1, title: "Работы", alias: "about", active: false },
  { id: 2, title: "Отзывы", alias: "about", active: false },
];
export default {
  data() {
    return {
      links,
    };
  },
};
</script>>
  
<style lang="postcss" scoped src="./navigation.pcss"></style>