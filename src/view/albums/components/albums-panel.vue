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
								<FormItem label="权限" prop="status">
										<RadioGroup v-model="formModel.status" type="button">
                            <Radio :label="0">全部</Radio>
														<Radio :label="1">所有人可见</Radio>
														<Radio :label="2">仅自己可见</Radio>
										</RadioGroup>
								</FormItem>
						</Col>
            <Col span="7">
								<FormItem label="状态" prop="status">
										<RadioGroup v-model="formModel.status" type="button" class="w200">
														<Radio :label="0">全部</Radio>
														<Radio :label="1">已发布</Radio>
														<Radio :label="2">已删除</Radio>
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
		<router-link :to="'/photo-upload'">
			<Button size="large" icon="md-cloud-upload" type="primary" :class="'publish-btn'">上传相片</Button>
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

