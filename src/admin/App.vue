<template>
  <div class="maincontent">
    <headline title="Панель администрирования">
      <avatar src="https://picsum.photos/300/300" title="Иван Филатов" />
    </headline>
    <navigation></navigation>
    <blockContent title="Блок 'Обо мне'">
      <iconed-btn slot="button" type="iconed" />
      <card slot="content" title="Заголовок">
        <h1 slot="title"></h1> 
        <h1 slot="content">Содержание</h1> 
      </card> 
      <card slot="content" title="Заголовок">
        <h1 slot="title"></h1> 
        <h1 slot="content">Содержание</h1> 
      </card> 
    </blockContent>
  </div>
</template>


<script>
import "../styles/main.pcss";
import avatar from "./components/avatar/avatar";
import headline from "./components/headline/headline";
import navigation from "./components/navigation/navigation";
import card from "./components/card/card";
import blockContent from "./components/blockContent/blockContent";
import iconedBtn from "./components/button/types/iconedBtn/iconedBtn";

export default {
  components: {
    avatar,
    headline,
    card,
    navigation,
    blockContent,
    iconedBtn,
  },
};
</script>