export const linking = {
    prefixes: ['https://mall38.com'],
    config: {
        screens: {
            DetailProduk: {
                path: 'product/data-produk/:idProdukDeep',
                parse: {
                    idProdukDeep: (idProdukDeep) => `${idProdukDeep}`,
                },
            },
        },
    },
};
