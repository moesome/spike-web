var fs = require('fs')
module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    devServer: {
        allowedHosts: [
            'spike.moesome.com',
        ],

    }
}