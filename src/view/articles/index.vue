<template>
  <div class="articles">
		<articles-panel />
		<articles-list />
	</div>
</template>

<script>
import articlesPanel from './articles-panel'
import articlesList from './articles-list'
export default {
	components: {
		articlesPanel,
		articlesList,
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

