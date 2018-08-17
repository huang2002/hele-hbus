import rollupPluginBabel from "rollup-plugin-babel";

const input = 'raw/index.js';

export default [
    {
        input,
        external: [
            'hele',
            'hbus'
        ],
        output: {
            format: 'es',
            file: 'dist/hele-hbus.js'
        }
    },
    {
        input,
        plugins: [
            rollupPluginBabel()
        ],
        external: [
            'hele',
            'hbus'
        ],
        output: {
            format: 'umd',
            name: 'HEle',
            extend: true,
            globals: {
                hele: 'HEle',
                hbus: 'HBus'
            },
            file: 'dist/hele-hbus.umd.js'
        }
    }
];
