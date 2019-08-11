<template>
  <div class="articles">
		<articles-panel />
		<articles-list />
	</div>
</template>

<script>
import articlesPanel from './components/articles-panel'
import articlesList from './components/articles-list'
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

