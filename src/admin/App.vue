<template>
  <headline title="Панель администрирования">
    <avatar 
    src="https://picsum.photos/300/300" 
    title="Иван Филатов"
    />
  </headline>
</template>


<script>
import "../styles/main.pcss"
import avatar from "./components/avatar/avatar"
import headline from "./components/headline/headline"
export default {
  components: {
    avatar, headline
  },
}
</script>