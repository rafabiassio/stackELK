const fs = require("fs");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);

const restaurants = ["1098", "1047", "1010"];
const dates = [
	"2019-07-29T17:50:56.109Z",
	"2019-07-28T17:50:56.109Z",
	"2019-07-27T17:50:56.109Z",
];
const ingredients = [
	"201010000301",
	"201030000119",
	"201080000000",
	"201010000268",
	"201010000265",
	"201010000302",
	"201030000105",
	"201010000212",
	"201010000327",
	"201010000304"
];

const main = async () => {
	let sale = randomSale();

	if (!sale) {
		return main();
	}
	try {
		const json = JSON.stringify(sale);
		const nameFile = new Date().toISOString();
		await writeFileAsync(`../sales/${nameFile}.json`, json + "\n");
		console.log(`Json de venda criado: ${nameFile}.json \n`, sale);
	} catch (err) {
		console.error("Erro em criação do json: ", err);
	}
};

const randomSale = () => {
    let date = String(Math.floor(Math.random() * 32))
    if(date < 10) {
        date = "0" + date;
    }
	const sale = {
		restaurant_id: restaurants[Math.floor(Math.random() * 4)],
		creation_date: `2019-07-${date}T17:50:56.109Z`,
		// ingredient_id: ingredients[Math.floor(Math.random() * 11)],
		ingredient_id: "201010000304",
		quantity: Math.floor(Math.random() * 7)
	};
	for (const att of Object.values(sale)) {
		if (!att) {
			return false;
		}
	}
	return sale;
};

main();
