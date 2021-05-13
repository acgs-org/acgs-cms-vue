<template>
  <div class="home">
    <my-layout />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import MyLayout from '@/components/MyLayout.vue'

@Options({
  components: {
    MyLayout
  }
})
export default class Home extends Vue {
}
</script>

<style lang="less">
</style>
