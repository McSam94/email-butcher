import Layout from '@/components/layout'
import Providers from '@/components/providers'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import '../styles/globals.css'
// import { debugContextDevtool } from 'react-context-devtool';

function MyApp({ Component, pageProps }) {
	return (
		<Providers>
			<Layout>
				<DefaultSeo {...SEO} />
				<Component {...pageProps} />
			</Layout>
		</Providers>
	)
}

export default MyApp
