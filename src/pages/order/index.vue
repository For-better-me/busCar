<template>
	<view class="content">
        <image class="logo" src="../../static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
        </view>
	</view>
</template>

<script lang="ts">
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				title: 'Hello--order'
			}
		},
		onLoad() {

		},
		methods: {

		}
	});
</script>

<style scoped lang = 'less'>
    @import url("./style");
    
</style>
