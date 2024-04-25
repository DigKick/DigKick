import {DkMqttClient} from "./src/mqtt/client/client";
import {SoccerTableRegisterHandler} from "./src/mqtt/soccerTable/register/handler/soccerTableRegisterHandler";

DkMqttClient.getInstance();
new SoccerTableRegisterHandler();
