import Layout from '@/components/layout'
import Providers from '@/components/providers'
import '../styles/globals.css'
// import { debugContextDevtool } from 'react-context-devtool';

function MyApp({ Component, pageProps }) {
	return (
		<Providers>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Providers>
	)
}

export default MyApp
