import { useOpenapi } from 'vitepress-theme-openapi'
import spec from '../../public/mexico/openapi.json' assert { type: 'json' }

export default {
    paths() {
        const openapi = useOpenapi()
        openapi.setSpec(spec)

        if (!openapi?.spec?.paths) {
            return []
        }

        return Object.keys(openapi.spec.paths)
            .map((path) => {
                const { operationId } = openapi.spec.paths[path].get
                const summary = openapi.spec.paths[path].get.summary
                return {
                    params: {
                        operationId,
                        pageTitle: `${summary} - CriptoYa API`,
                    },
                }
            })
    },
}
