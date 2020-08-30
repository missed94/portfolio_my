<template lang="pug">
  <nav class="navigation-component">
    <div class="container">
      <ul class="navigation__list">
          li(:class="['item']" ).navigation__item
            router-link(to="/" ).navigation__link Обо мне
          li(:class="['item']").navigation__item
            router-link(to="/works").navigation__link Работы
          li(:class="['item']").navigation__item
            router-link(to="/reviews").navigation__link Отзывы
      </ul>
    </div>
  </nav>
</template>


<script>

export default {
  
}
  

</script>>
  
<style lang="postcss" scoped src="./navigation.pcss"></style>