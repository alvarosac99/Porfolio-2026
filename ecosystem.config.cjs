module.exports = {
    apps: [{
        name: 'porfolio',
        script: './dist/server/entry.mjs',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '300M',
        env: {
            NODE_ENV: 'production',
            HOST: '0.0.0.0',
            PORT: 4322
        },
        error_file: './logs/error.log',
        out_file: './logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true
    }]
};
