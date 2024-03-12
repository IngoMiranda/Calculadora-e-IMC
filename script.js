// IMC DATA

const data = [{
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        infor: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre que 18,5 e 24,9",
        infor: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre que 25 e 29,9",
        infor: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre que 30 e 39,9",
        infor: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        infor: "Obesidade grave",
        obesity: "III",
    }
];

// Seleção de elementos

const imcTabe = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const cleaBtn = document.querySelector("#clear-btn");

//função
function creatTable(data) {
    data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const infor = document.createElement("p");
        infor.innerText = item.infor;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(infor);
        div.appendChild(obesity);

        imcTabe.appendChild(div);
    });
};

function clearInputs() {
    heightInput.value = "";
    weightInput.value = "";
};

function validDigits(text) {
    return text.replace(/[^0-9,]/g,"");
    // validação de texto: Permitindo apenas escrever números e com vírgulas
};


[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value);
        e.target.value = updateValue;
    });
});


creatTable(data);

cleaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
});