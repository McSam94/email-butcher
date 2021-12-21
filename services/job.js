import ApiUtil from '@/services/index'

const { post } = ApiUtil

const JobSrv = {
	createJob: job => post('/job', job),
	runJob: id => post(`/job/run/${id}`),
}

export default JobSrv
