<template>
  <div class="comments">
		<comments-panel />
		<comments-list />
	</div>
</template>

<script>
import commentsPanel from './components/comments-panel'
import commentsList from './components/comments-list'
export default {
	components: {
		commentsPanel,
		commentsList,
	},
	data () {
		return {
		}
	},
}
</script>

<style lang="scss" scoped>

@import './index.scss';

</style>

