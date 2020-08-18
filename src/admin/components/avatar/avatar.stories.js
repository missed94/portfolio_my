import avatar from "./avatar.vue";
import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "avatar",
  components: { avatar },
  decorators: [withKnobs]
};

export const defaultView = () => ({
  components: { avatar },
  props: {
    size: {
      default: text("size", "3.1")
    }
  },
  template: `
    <avatar 
    :size="size" 
    src="https://picsum.photos/300/300" 
    title="User Name"
    />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}
