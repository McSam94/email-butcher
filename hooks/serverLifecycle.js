import axios from 'axios'

export const preFetchData = async url => {
	const res = await axios.get(url)

	if (res?.status !== 200) {
		return {
			notFound: true,
		}
	}

	return {
		props: { posts: res?.data },
	}
}
