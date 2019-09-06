<template>
	<section class="users-panel">
		<Card>
			<Form :model="formModel" :label-width="80">
				<Row>
          <Col span="7">
            <FormItem label="关键字" prop="keywords">
              <Input v-model="formModel.keywords" placeholder="输入关键字"></Input>
            </FormItem>
          </Col>
				</Row>
        <Row>
          <Col span="7">
            <FormItem label="访问" prop="status">
                <RadioGroup v-model="formModel.status" type="button">
                        <Radio :label="0">最近一周</Radio>
                        <Radio :label="1">最近一月</Radio>
                        <Radio :label="2">最近半年</Radio>
                </RadioGroup>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="状态" prop="status">
                <RadioGroup v-model="formModel.status" type="button">
                        <Radio :label="0">全部</Radio>
                        <Radio :label="1">正常</Radio>
                        <Radio :label="2">已禁言</Radio>
                </RadioGroup>
            </FormItem>
          </Col>
				</Row>
			</Form>
		</Card>
	</section>
</template>

<script>
export default {
	data () {
		return {
			formModel: {
				keywords: '',
				status: 0,
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.users-panel {
  position: relative;
  
}
</style>

