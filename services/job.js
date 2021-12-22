import ApiUtil from '@/services/index'
import { convertObjToParams } from '@/utilities/request'

const { post, get, patch, delete: deleteMethod } = ApiUtil

const JobSrv = {
	instantJob: job => post('/job/run', job),
	createJob: job => post('/job', job),
	runJob: id => post(`/job/run/${id}`),
	getJobs: params => get(`/job${convertObjToParams(params)}`),
	editJob: (id, job) => patch(`/job/${id}`, job),
	deleteJob: id => deleteMethod(`/job/${id}`),
}

export default JobSrv
