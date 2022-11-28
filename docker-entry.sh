#!/bin/sh

until nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

# echo -e "\e[34m >>> Running migrations \e[97m"
# npx sequelize-cli db:migrate
# if [ $? -eq 0 ]; then
#     echo -e "\e[32m >>> Migration successful \e[97m"
# else
#     echo -e "\e[31m >>> Migration failed \e[97m"
#     exit 1
# fi

# echo -e "\e[34m >>> Seed Data \e[97m"
# npx sequelize-cli db:seed:all
# if [ $? -eq 0 ]; then
#     echo -e "\e[32m >>> Seeding successful \e[97m"
# else
#     echo -e "\e[31m >>> Seeding failed \e[97m"
#     exit 1
# fi

echo "\e[34m >>> Starting the server \e[97m"
node index.js