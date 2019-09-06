<template>
  <div class="users">
		<users-panel />
		<users-list />
	</div>
</template>

<script>
import usersPanel from './components/users-panel'
import usersList from './components/users-list'
export default {
	components: {
		usersPanel,
		usersList,
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

