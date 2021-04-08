import { SqlClient } from "msnodesqlv8";
import IFullRecord from "../model/model";
import IData from "../model/model";
import MqttSender from "../mqtt/mqtt-sender";

const sql: SqlClient = require("msnodesqlv8");

const query = "exec usp_DataGet ";

export default class MerlReader {
	/**
	 *
	 */
	private conString: string;
	constructor(conString: string) {
		this.conString = conString;
	}
	init() {}

	getNext(ts: Date): Promise<IFullRecord> {
		const prom = new Promise<IFullRecord>((resolve, reject) => {
			const sqlQuery = query.concat(" '", ts.toISOString(), " '");

			sql.query(this.conString, sqlQuery, (err, rows) => {
				const result = {
					nextRecord: rows[0].NextRecordTime,
					data: rows,
				};
				resolve(result);
			});
		});

		return prom;
	}
}
