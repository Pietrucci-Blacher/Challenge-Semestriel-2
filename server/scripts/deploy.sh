#!/bin/bash

# Stop PM2
pm2 stop all

# Remove
pm2 delete all

#Forward to directory
# shellcheck disable=SC2164
cd /var/www/html/server/server

# Start PM2 again
pm2 start server.js --name "Challenge Server"

