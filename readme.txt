 - code 源代码文件夹
 - videos 操作演示视频，分为4部分，按顺序命名为part1, 2, 3, 4
 - report 报告，包含设计文档、使用手册、测试报告、开发体会等部分
 
 环境配置与运行：
 //获取镜像
docker pull katiechen282/my_platform

//运行容器
docker run -dit -p 3000:3000 --name demo katiechen282/my_platform:latest /bin/sh /start.sh

程序运行：
数据库：
//启动本地mysql
sudo service mysql start
sudo mysql -uroot -p

//运行建表脚本建立数据表
mysql > source create_table/house.sql;
mysql > source create_table/user.sql;
mysql > source create_table/count.sql;
mysql > source create_table/activity.sql;


前后端：
//使用yarn管理前后端工程
//linux terminal
yarn build
yarn start

yarn run v1.22.19
$ nodemon server.js
[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
/home/katie/Desktop/IoT/public
listening on port 3000......


终端
//安装依赖包
pip install pymysql
pip install paho

cd mqtt_server

//发布端
//terminal 1
python3 subscribe.py

Connected to MQTT Broker!
Received `message: (3, 1, '5', 'iPod')` from `Device Activity` topic
(3, 1, '5', 'iPod')
......

//接收端
//terminal 2
python3 publish.py

Connected to MQTT Broker!
skip (1, 1, '0', 'Macbook Pro')
skip (2, 1, '2', 'Huawei Nova 11')
Send messages `message: (3, 1, '5', 'iPod')` to topic `Device Activity`
......
