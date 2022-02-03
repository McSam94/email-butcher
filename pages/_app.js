import Layout from '@/components/layout'
import Providers from '@/components/providers'
import { ThemeProvider } from '@mui/material'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import theme from '../styles/_theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<Providers>
			<ThemeProvider theme={theme}>
				<Layout>
					<DefaultSeo {...SEO} />
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</Providers>
	)
}

export default MyApp
