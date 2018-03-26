const notify = require('gulp-notify');
const browsersync = require('browser-sync').create();

module.exports = {
    plumber: function onError(err) {
        notify.onError({
            title: 'I am Error.',
            message: `There has been an error in [${err.plugin}]`,
        })(err);
        this.emit('end');
    },
    sync() {
        browsersync.init({
            server: '_tmp/',
            port: 3000,
            ui: {
                port: 3001,
            },
        });
    },
    reload() {
        browsersync.reload();
    },
};
