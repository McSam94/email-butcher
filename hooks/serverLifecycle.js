import ApiUtil from '@/services/index'

export const preFetchData = async (url, propName) => {
	const res = await ApiUtil.get(url)

	if (res?.status !== 200) {
		return {
			notFound: true,
		}
	}

	return {
		props: { [propName]: res?.data },
	}
}
