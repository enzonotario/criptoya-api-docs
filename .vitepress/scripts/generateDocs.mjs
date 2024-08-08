import spec from './templates/openapi.json' assert { type: 'json' };
import specArgentina from './templates/openapi-argentina.json' assert { type: 'json' };
import regions from '../regions.json' assert { type: 'json' };
import fs from 'fs/promises';

async function init() {
    try {
        await generateOpenApi();
        await generateOperations();
        await copyRegions();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

async function generateOpenApi() {
    for (const region of regions) {
        const { slug } = region;
        const path = `public/${slug}`;
        await fs.mkdir(path, { recursive: true });

        const regionsByExchanges = await fetch('https://criptoya.com/api/exchanges')
            .then(response => response.json())

        const regionExchanges = regionsByExchanges[region.code.toLowerCase()] || [];

        const specToUse = slug === 'argentina' ? specArgentina : spec;
        const specString = JSON.stringify(specToUse)
            .replace('"REPLACE_COTIZACION_EXCHANGE_ENUMS"', regionExchanges.map(exchange => `"${exchange}"`).join(','))
            .replace('"REPLACE_COTIZACION_EXCHANGE_EXAMPLE"', `"${regionExchanges[0] || ''}"`);

        await fs.writeFile(`${path}/openapi.json`, JSON.stringify(JSON.parse(specString), null, 4));
    }
}

async function generateOperations() {
    for (const region of regions) {
        const { name, slug } = region;
        const path = `${slug}/operations`;

        await fs.mkdir(path, { recursive: true });

        const indexContent = await fs.readFile(`.vitepress/scripts/templates/index.md`, 'utf8');
        await fs.writeFile(`${slug}/index.md`, indexContent.replace('REPLACE_REGION', name));

        const operationContent = await fs.readFile(`.vitepress/scripts/templates/operations/[operationId].md`, 'utf8');
        await fs.writeFile(`${path}/[operationId].md`, operationContent.replace('REPLACE_REGION', slug));

        const pathsContent = await fs.readFile(`.vitepress/scripts/templates/operations/[operationId].paths.js`, 'utf8');
        await fs.writeFile(`${path}/[operationId].paths.js`, pathsContent.replace('REPLACE_REGION', slug));
    }
}

async function copyRegions() {
    await fs.copyFile('.vitepress/regions.json', 'public/regions.json');
}

init();
