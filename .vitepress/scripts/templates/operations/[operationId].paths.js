import { usePaths } from 'vitepress-openapi'
import spec from '../../public/REPLACE_REGION/openapi.json' assert { type: 'json' }

export default {
    paths() {
        return usePaths({ spec })
            .getPathsByVerbs()
            .map(({ operationId, summary }) => {
                return {
                    params: {
                        operationId,
                        pageTitle: `${summary} - CriptoYa API`,
                    },
                }
            })
    },
}
