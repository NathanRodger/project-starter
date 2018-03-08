const browserSync = require('browser-sync');

const notifyStyles = [
    'display: none',
    'z-index: 9999',
    'position: fixed',
    'left: 0',
    'bottom: 0',
    'width: 100%',
    'margin: 0',
    'padding: 10px',
    'font-family: sans-serif',
    'font-size: 12px',
    'text-align: center',
    'color: #fff',
    'background-color: #2a2a2a',
];

class SetupSync {
    constructor() {
        this.sync = browserSync.create();
    }
    init() {
        this.sync.init({
            server: '_tmp/',
            port: 3000,
            ui: {
                port: 3001,
            },
            notify: {
                styles: notifyStyles,
            },
        });
    }
    reload() {
        this.sync.reload();
    }
}

module.exports = new SetupSync();
