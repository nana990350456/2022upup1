<template>
  <div class="menu-main">
    <div
      class="menu-box"
      v-for="(item, index) in menuData"
      :key="`code${index}`"
      @mouseleave="isSon = false"
      @mousemove="isSon = true"
    >
      {{ item.name }}
      <div v-if="item.children.length && isSon" class="menu-box-son">
        <div
          v-for="(el, ind) in item.children"
          :key="`el${ind}`"
          class="menu-box-son-el"
          @click.stop="toPage(el, item)"
          :class="{
            'active-menu': el.url === url || menuCodeSon === el.menuCode
          }"
        >
          {{ el.name }}
          <div v-if="el.children.length" class="menu-box-sun">
            <div
              v-for="(cc, inde) in el.children"
              :key="`cc${inde}`"
              class="menu-box-sun-cc"
              @click.stop="toPage(cc, el)"
              :class="{ 'active-menu': cc.url === url }"
            >
              {{ cc.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <iframe
      ref="iframeRef"
      :src="`https://m.imooc.com/wenda/detail/503509`"
      class="iframeclass"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'JjjjFilePageMenu',

  data() {
    return {
      isSon: false,
      url: '',
      menuCodeSon: '',
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

  mounted() {
    this.$nextTick(() => {
      debugger
      console.log(
        this.$refs.iframeRef.contentWindow.localStorage.getItem('size')
      )
      console.log(localStorage.getItem('size'), 'ooooo')
    })
  },

  methods: {
    toPage(sun, father) {
      this.url = sun.url
      this.menuCodeSon = father.menuCode
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-main {
  display: flex;
  justify-content: space-between;
  width: 50%;
  .menu-box {
    position: relative;
    border: 2px solid rgb(1, 89, 1);
    padding: 12px;
    .menu-box-son {
      display: none;
      border: 2px solid rgb(1, 89, 1);
      position: absolute;
      left: 0;
      top: 100%;
      padding: 12px 0 12px 12px;
      white-space: nowrap;
      .menu-box-son-el {
        border-left: 2px solid transparent;
        padding-left: 12px;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        &:hover {
          border-left-color: rgb(1, 89, 1);
          background-image: linear-gradient(
            to right,
            rgba(1, 89, 1, 0.6),
            rgb(227, 234, 227)
          );
        }
      }
      .menu-box-sun {
        padding: 12px;
        border: 2px solid rgb(1, 89, 1);
        display: none;
        position: absolute;
        left: 100%;
        top: 5px;
        border-left: 2px solid transparent;
        .menu-box-sun-cc {
          border-left: 2px solid transparent;
          padding-left: 12px;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
          &:hover {
            border-left-color: rgb(1, 89, 1);
            background-image: linear-gradient(
              to right,
              rgba(1, 89, 1, 0.6),
              rgb(227, 234, 227)
            );
          }
        }
      }
      .menu-box-son-el:hover {
        .menu-box-sun {
          display: block;
        }
      }
    }
    &:nth-child(1):hover .menu-box-son {
      display: block;
    }
    &:nth-child(2):hover .menu-box-son {
      display: block;
    }
    .active-menu {
      border-left: 2px solid rgb(1, 89, 1) !important;
      background-image: linear-gradient(
        to right,
        rgba(1, 89, 1, 0.6),
        rgb(227, 234, 227)
      );
    }
  }
}
.iframeclass {
  position: absolute;
  top: 400px;
  width: 100%;
  height: 50%;
}
</style>
