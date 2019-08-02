const fs = require("fs");
const { promisify } = require("util");
const moment = require('moment');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const main = async () => {
	let files = [];

	try {
		fs.readdirSync("../sales/not-format").forEach(nameFile => {
			files.push(nameFile);
		});

		let json;
		let finalJson = "";
		for (let i = 0; i < files.length; i++) {
			json = await readFileAsync(
				`../sales/not-format/${files[i]}`,
				"utf-8"
			);
            json = JSON.parse(json);
            json.dateOperationISO = moment(json.dateOperation, 'DD-MM-YYYY HH:mm:ss', true).toISOString();
            finalJson += JSON.stringify(json) + '\n';
		}
		await writeFileAsync(`../sales/format/consolidate.json`, finalJson);
	} catch (error) {
		console.error(error);
	}

	console.log("\nFinish");
};

main();
