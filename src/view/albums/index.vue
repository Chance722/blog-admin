<template>
  <div class="albums">
		<albums-panel />
		<albums-list />
	</div>
</template>

<script>
import albumsPanel from './components/albums-panel'
import albumsList from './components/albums-list'
export default {
	components: {
		albumsPanel,
		albumsList,
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