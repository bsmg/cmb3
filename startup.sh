#!/bin/sh

CONTAINER_ALREADY_STARTED="/cma/Container.init"

if [ ! -e "$CONTAINER_ALREADY_STARTED" ];
then
    touch "$CONTAINER_ALREADY_STARTED"
    echo "-- First Startup --"
    npm run prisma:init
    npx prisma generate
    npm run start
else
    echo "-- Not First Startup --"
    npm run start
fi