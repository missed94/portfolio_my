import blockContent from "./blockContent.vue";

export default {
  title: "blockContent",
  components: {blockContent}

}

export const defaultView = () => ({
components: {blockContent},  
template:`
  <blockContent title="Блок о чем-либо">
    <h3>содержимое</h3>
  </blockContent>
`
})

defaultView.story = {
  name: "Стандартный вид"
}