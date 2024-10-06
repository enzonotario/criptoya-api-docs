import { OpenApi } from 'vitepress-openapi'
import spec from '../../public/colombia/openapi.json' assert { type: 'json' }

export default {
    paths() {
        const openapi = OpenApi({ spec })

        return openapi.getPathsByVerbs().map(({ operationId, summary }) => {
            return {
                params: {
                    operationId,
                    pageTitle: `${summary} - CriptoYa API`,
                },
            }
        })
    },
}
