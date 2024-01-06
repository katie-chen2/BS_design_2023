# python3.6
from publish import close_mysql

import random
 
from paho.mqtt import client as mqtt_client
 
 
broker = 'broker.emqx.io'
port = 1883
topic = "Device Activity"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 100)}'

import pymysql
def connect_mysql():  
    connect=pymysql.connect(host='localhost',user='root',password='123456',port=3306,db='IoT_Platform',charset='utf8')
    cursor=connect.cursor()
    return (cursor,connect)
 
def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
 
    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


 
def subscribe(client: mqtt_client):
    (cursor,connect) = connect_mysql()
    def on_message(client, userdata, msg):
        temp=msg.payload.decode()
        print(f"Received `{temp}` from `{msg.topic}` topic")
        row = temp[9:]
        print(row)
        #print(type(row))
        #insert into table activity
        insert='INSERT INTO activity(hid,user_id,h_type,h_name) values '
        try:
            cursor.execute(insert+row)
            connect.commit()
            #print('1')
        except:
            connect.rollback()
            #print('2')
        
    client.subscribe(topic)
    client.on_message = on_message
 
 
def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()
 
 
if __name__ == '__main__':
    run()
