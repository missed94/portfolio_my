import tagAdder from "./tagAdder.vue"

export default {
  title:"taggAdder",
  components: {tagAdder}
}

export const defaultView = () => ({
  components: {tagAdder},
  data() {
    return{
      tags:"One, two, three"
    }
  },
  template: `
  <tag-adder v-model="tags"/>
  `
})

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    backgrounds: [
      { name: 'grey', value: '#8395a7', default:true},
    ]
  },
}