<template>
	<section class="articles-panel">
		<Card>
			<Form :model="formModel" :label-width="80">
				<Row>
						<Col span="7">
								<FormItem label="分类" prop="categorys">
										<Select v-model="formModel.categorys" multiple class="w200"></Select>
								</FormItem>
						</Col>
						<Col span="9">
								<FormItem label="标签" prop="tags">
										<Select v-model="formModel.tags" multiple class="w200"></Select>
								</FormItem>
						</Col>
				</Row>
				<Row>
						<Col span="7">
								<FormItem label="状态" prop="status">
										<RadioGroup v-model="formModel.status" type="button" class="w200">
														<Radio :label="0">全部</Radio>
														<Radio :label="1">未发布</Radio>
														<Radio :label="2">已发布</Radio>
										</RadioGroup>
								</FormItem>
						</Col>
						<Col span="15">
								<FormItem label="来源" prop="resource">
										<RadioGroup v-model="formModel.resource" type="button">
														<Radio :label="0">全部</Radio>
														<Radio :label="1">原创</Radio>
														<Radio :label="2">转载</Radio>
														<Radio :label="3">混撰</Radio>
														<Radio :label="4">翻译</Radio>
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
		<router-link :to="'/articles-publish'">
			<Button size="large"  icon="ios-paper-plane" type="primary" :class="'publish-btn'">发布文章</Button>
		</router-link>
	</section>
</template>

<script>
export default {
	data () {
		return {
			formModel: {
				categorys: [],
				tags: [],
				status: 0,
				resource: 0,
				start: '',
				end: '',
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.articles-panel {
	position: relative;
}
.publish-btn {
	position: absolute;
	right: 50px;
	transform: translateY(-50%);
	top:50%;
}
</style>

