<template>
  <div class="menu-main">
    <MenuSonPageCeshi :list="menuData" />
    <iframe :src="`http://localhost:8080${url}`" class="iframeclass"></iframe>
  </div>
</template>

<script>
import MenuSonPageCeshi from '@/views/file/components/MenuSonPageCeshi'
export default {
  name: 'filePageMenuDigui',
  components: {
    MenuSonPageCeshi
  },
  data() {
    return {
      url: '',
      menuData: [
        {
          menuCode: '001',
          url: '/wxn/file/filePageOne',
          name: '菜单1',
          children: [
            {
              menuCode: '001-001',
              url: '/wxn/file/filePageTransfer',
              name: '菜单1的儿子',
              children: [
                {
                  menuCode: '001-001-001',
                  url: '/wxn/time/scrollPage',
                  name: '菜单1的孙子1'
                },
                {
                  menuCode: '001-001-002',
                  url: '/wxn/time/pall',
                  name: '菜单1的孙子2'
                }
              ]
            },
            {
              menuCode: '001-002',
              url: '/wxn/time/data',
              name: '菜单1的儿子2',
              children: [
                {
                  menuCode: '002-001-001',
                  url: '/wxn/time/pall',
                  name: '菜单1的孙子2'
                }
              ]
            }
          ]
        },
        {
          menuCode: '002',
          url: '/wxn/file/filePageTwo',
          name: '菜单2',
          children: [
            {
              menuCode: '002-001',
              url: '/wxn/time/data',
              name: '菜单2的儿子',
              children: [
                {
                  menuCode: '002-001-001',
                  url: '/wxn/time/pall',
                  name: '菜单2的孙子'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  mounted() {},

  methods: {
    toPage(sun, father) {
      this.url = sun.url
      this.menuCodeSon = father.menuCode
    }
  }
}
</script>

<style lang="scss" scoped>
.iframeclass {
  position: absolute;
  top: 400px;
  width: 100%;
  height: 50%;
}
</style>
