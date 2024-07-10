#include <CONFIG.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define LED_PIN 2

WiFiClient wifiClient;
PubSubClient client(wifiClient);

void setup_wifi() {
	delay(10);
	Serial.println();
	Serial.print("Connecting to ");
	Serial.println(SSID);
    WiFi.setHostname(HOSTNAME);
	WiFi.begin(SSID, WLAN_PASSWORD);
    Serial.print("Connecting to WiFi ..");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print('.');
        delay(1000);
    }
    digitalWrite(LED_PIN, HIGH);
    Serial.println(WiFi.localIP());
}

void messageFromTopicReceived(char* topic, byte *payload, unsigned int length) {
    Serial.println("--- new message from broker ---");
    Serial.print("Topic:    ");
    Serial.print(topic);
    Serial.print("Message:  ");
    Serial.write(payload, length);
    Serial.println();
}

void setup_mqtt() {
	client.setServer(MQTT_BROKER_ADRRESS, MQTT_PORT);
  	client.setCallback(messageFromTopicReceived);
  
  	// Loop until we're (re)connected
  	while (!client.connected()) {
    	Serial.print("Attempting MQTT connection...");
    
    	if (client.connect(MQTT_CLIENT_ID, MQTT_USERNAME, MQTT_PASSWORD)) {
      		Serial.println("connected");
			char registerPayload[] = "{\"id\": \"hiqs_01\"}"; 
      		client.publish("/table/register", registerPayload);
			client.subscribe("/table/hiqs_01/team/white/display");
			client.subscribe("/table/hiqs_01/team/white/leds");
    	} else {
      		Serial.print("failed, rc=");
      		Serial.print(client.state());
      		Serial.println(" try again in 5 seconds");
      		delay(5000);
    	}
  	}
}


void setup() {
    pinMode(LED_PIN, OUTPUT);
	Serial.begin(9600);
	setup_wifi();
	setup_mqtt();
}

void loop() {
	client.loop();
}