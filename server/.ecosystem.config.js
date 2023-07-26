module.exports = {
    apps: [
        {
            name: 'challenge-node',
            script: 'server.js',
            cwd: '/var/www/html/server/server/',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
