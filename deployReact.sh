#!/bin/bash

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployFiles.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying files for $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package.\n"
rm -rf dist
mkdir dist
cp -r public dist
cp *.js dist
cp package* dist

# Step 2
printf "\n----> clearing out previousdistribution on the target.\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH

#step 3
printf "\n----> Copy the distribution package to the target.\n"
scp -r -i "$key" dist/* ubuntu@$hostname:services/$service

#step 4
printf "\n----> deploy the service on the target.\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH

#step 5
printf "\n----> remove local copy of distribution package.\n"
rm -rf dist