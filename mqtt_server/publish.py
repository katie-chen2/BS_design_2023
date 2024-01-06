# python 3.6
 
import random
import time
 
from paho.mqtt import client as mqtt_client
  
broker = 'broker.emqx.io'
port = 1883
topic = "Device Activity"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'
 
import random

import pymysql

def connect_mysql():
    connect=pymysql.connect(host='localhost',user='root',password='123456',port=3306,db='IoT_Platform',charset='utf8')
    cursor=connect.cursor()
    sql ='select * from houses where user_id = 1'
    cursor.execute(sql)
    return (cursor,connect)
 
def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
 
    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def close_mysql(cursor,connect):
    cursor.close()
    connect.close()  

def publish(client):
    msg_count = 0
    (cursor,connect )= connect_mysql()
    row=cursor.fetchone()
    while row:
        time.sleep(1)
        flag=random.randint(0,1)
        if flag == 0:
            print(f"skip {row}")
            row=cursor.fetchone()
            continue
        msg = f"message: {row}"
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send messages `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
        row=cursor.fetchone()
    close_mysql(cursor,connect)
    
 
 
def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)
  
if __name__ == '__main__':
    run()
