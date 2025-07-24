// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  // 防止.vue文件名称只有一个单词而报错 (nuxt项目允许 default.vue文件名)
  {
    rules: {
      "vue/multi-word-component-names": "off",
    },
  }
);
