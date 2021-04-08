const mqtt = require("mqtt");

export default class MqttSender {
	address: string;
	client: any;
	connected: boolean = false;
	/**
	 *
	 */
	constructor(address: string) {
		this.address = address;
		this.client = mqtt.connect(this.address);

		this.client.on("connect", () => {
			this.connected = true;
			console.log("Connected to " + this.address);
		});

		this.client.on("message", (topic: string, message: string) => {
			// message is Buffer
			console.log(message.toString());
		});
	}

	publish(topic: string, payload: any, options?: any) {
		const msg = JSON.stringify(payload);
		this.client.publish(topic, msg, options);
		console.log(topic, msg);
	}
}
