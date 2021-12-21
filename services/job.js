import ApiUtil from '@/services/index'

const { post } = ApiUtil

const JobSrv = {
	instantJob: job => post('/job/run', job),
	createJob: job => post('/job', job),
	runJob: id => post(`/job/run/${id}`),
}

export default JobSrv
