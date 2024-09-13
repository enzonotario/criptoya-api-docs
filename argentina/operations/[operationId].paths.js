import { OpenApi } from 'vitepress-theme-openapi'
import spec from '../../public/argentina/openapi.json' assert { type: 'json' }

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
