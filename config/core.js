let search_term = "";
let results = document.getElementById("results");
let search = document.getElementById("search");
class addressFinder {
	targetAddress = document.querySelector("input");
	_url = "https://62e2906ee8ad6b66d85e7ac9.mockapi.io/products";
	constructor(
		_data,
		address,
		entrance,
		entranceNum,
		entranceAppartaments,
		minAp,
		maxAp
	) {
		this._data = _data;
		this.address = address;
		this.entrance = entrance;
		this.entranceNum = [];
		this.entranceAppartaments = [];
		this.minAp = this.minAp;
		this.maxAp = this.maxAp;
	}
	async request() {
		this._response = await fetch(this._url);
		this._data = await this._response.json();
	}
	getData() {
		for (let obj of this._data) {
			if (obj.address == this.targetAddress.value) {
				this.address = obj.address;
				this.entrance = obj.entrances;
				this.entrance.forEach((el, i, arr) => {
					this.entranceNum[i] = el.numEntrance;
					this.entranceAppartaments[i] = el.apartaments;
				});
				this.entrancesLenght = obj.entrances.length;
			} else if (this.targetAddress.value == "") {
				document.querySelector(".input-block").classList.add("err");
				break;
			}
		}
	}
	getResults() {
		// console.log(this._data);
		results.innerHTML = "";
		this._data
			.filter((item) => {
				return item.address.toLowerCase().includes(search_term);
			})
			.forEach((e) => {
				let li;
				for (let i = 0; i < 3; i++) {
					li = document.createElement("li");
				}
				li.innerHTML = `${e.address}`;
				results.appendChild(li);
				const list = document.querySelectorAll("li");
				list.forEach((el) => {
					el.addEventListener("click", () => {
						search.value = el.textContent;
						this.getData();
						this.generateTable();
					});
				});
			});
	}
	generateTable() {
		const table = document.querySelector("table");
		const tbody = document.querySelector("tbody");
		if (tbody.innerHTML == "") {
			for (let i = 0; i < this.entrancesLenght; i++) {
				const row = document.createElement("tr");
				const cell_1 = document.createElement("td");
				const cellContent_1 = document.createTextNode(`${this.entranceNum[i]}`);
				const cell_2 = document.createElement("td");
				const cellContent_2 = document.createTextNode(
					`${
						Math.min(...this.entranceAppartaments[i]) +
						"-" +
						Math.max(...this.entranceAppartaments[i])
					}`
				);
				cell_1.appendChild(cellContent_1);
				cell_2.appendChild(cellContent_2);
				row.appendChild(cell_1);
				row.appendChild(cell_2);
				tbody.appendChild(row);
			}
			table.appendChild(tbody);
		} else if (tbody.innerHTML != "") {
			tbody.innerHTML = "";
			for (let i = 0; i < this.entrancesLenght; i++) {
				const row = document.createElement("tr");
				const cell_1 = document.createElement("td");
				const cellContent_1 = document.createTextNode(`${this.entranceNum[i]}`);
				const cell_2 = document.createElement("td");
				const cellContent_2 = document.createTextNode(
					`${
						Math.min(...this.entranceAppartaments[i]) +
						"-" +
						Math.max(...this.entranceAppartaments[i])
					}`
				);
				cell_1.appendChild(cellContent_1);
				cell_2.appendChild(cellContent_2);
				row.appendChild(cell_1);
				row.appendChild(cell_2);
				tbody.appendChild(row);
			}
		}
	}
}
var obj = new addressFinder();

search.addEventListener("input", (event) => {
	search_term = event.target.value.toLowerCase();
	document.querySelector("ul").classList.add("show");
	obj.getResults();
});
document.addEventListener("DOMContentLoaded", async () => {
	await obj.request();
	obj.getResults();
});
document.querySelector(".btn").addEventListener("click", () => {
	obj.getData();
	obj.generateTable();
});
