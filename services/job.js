import ApiUtil from '@/services/index'
import { convertObjToParams } from '@/utilities/request'

const { post, get } = ApiUtil

const JobSrv = {
	instantJob: job => post('/job/run', job),
	createJob: job => post('/job', job),
	runJob: id => post(`/job/run/${id}`),
	getJobs: params => get(`/job${convertObjToParams(params)}`),
}

export default JobSrv
