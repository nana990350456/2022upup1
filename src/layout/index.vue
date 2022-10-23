<template>
	<div class="container">
		<el-container class="main-container">
			<!-- 头部 -->
			<el-header>顶部导航栏</el-header>
			<!-- 主体 -->
			<el-container class="bottom-container">
				<!-- 侧边导航栏 -->
				<el-aside style="width:210px">
					<siderbar />
				</el-aside>

				<!-- 内容区域 -->
				<el-main class="main-box">
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import siderbar from "./Sidebar";
export default {
	name: "Page",
	components: { siderbar },
	props: {},
	data() {
		return {
		};
	},
	watch: {},
	computed: {},
	created() { },
	mounted() { },
	methods: {},
};
</script>
<style lang="less" scoped>
// 左侧菜单栏设置
.el-aside {
	width: 100%;
	overflow-x: hidden;
	min-height: calc(100vh - 60px);
	background-color: #999;
	color: rgb(255, 255, 255);
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
}

/deep/.el-container.is-vertical {
	-webkit-box-orient: vertical;
	height: 100%;
	overflow: hidden;
}
.container {
	width: 100%;
	height: 100%;
}
.bottom-container {
	height: calc(100% - 60px);
}
.el-header {
	background-color: pink;
	color: rgb(255, 255, 255);
	text-align: center;
	line-height: 60px;
}

/deep/.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>