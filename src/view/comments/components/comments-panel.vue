<template>
	<section class="comments-panel">
		<Card>
			<Form :model="formModel" :label-width="80">
				<Row>
						<Col span="7">
								<FormItem label="分类" prop="categorys">
										<Select v-model="formModel.categorys" multiple class="w200"></Select>
								</FormItem>
						</Col>
            <Col span="11">
								<FormItem label="状态" prop="status">
										<RadioGroup v-model="formModel.status" type="button">
														<Radio :label="0">全部</Radio>
														<Radio :label="1">已通过</Radio>
														<Radio :label="2">待审核</Radio>
                            <Radio :label="3">已删除</Radio>
										</RadioGroup>
								</FormItem>
						</Col>
				</Row>
				<Row>
						<Col span="7">
								<FormItem label="起始时间" prop="start">
										<DatePicker v-model="formModel.start" type="date" placeholder="请选择起始时间" class="w200"></DatePicker>
								</FormItem>
						</Col>
						<Col span="9">
								<FormItem label="终止时间" prop="end">
										<DatePicker v-model="formModel.end" type="date" placeholder="请选择终止时间" class="w200"></DatePicker>
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
				categorys: [],
				status: 0,
				start: '',
				end: '',
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.comments-panel {
	position: relative;
}
</style>

