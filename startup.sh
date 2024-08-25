#!/bin/sh

ContainerSetup="/cma/Container.init"

if [ ! -e "$ContainerSetup" ];
then
    touch "$ContainerSetup"
    echo "-- First Startup --"
    npm run prisma:init
    npm run prisma:gen
    sleep 1
    npm run start
else
    echo "-- Not First Startup --"
    npm run prisma:gen
    sleep 1
    npm run start
fi