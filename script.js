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

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-infor span");
const backBtn = document.querySelector("#back-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

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
    //limpar inputs 
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = "";
    imcInfo.classList = "";
};

function validDigits(text) {
    return text.replace(/[^0-9,]/g,"");
    // validação de texto: Permitindo apenas escrever números e com vírgulas
};

function calcImc(weight, height){
    // calculo do imc
    const imc = (weight /(height * height)).toFixed(1);
    return imc;
};

function showHide(){
    // exibir e ocultar próxima tela
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
};

creatTable(data);


[heightInput, weightInput].forEach((el) => {
    // validando os valores dos inputs baseado no tratamento com expressão regular
    el.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value);
        e.target.value = updateValue;
    });
});

calcBtn.addEventListener("click", (e)=>{
    // excução da ação de calculo e mudança de tala
    e.preventDefault();
    const weight = +weightInput.value.replace(",", "."); // tratamento de "," para "."
    const height = +heightInput.value.replace(",", ".");

    if(!weight || !height) return;

    const imc = calcImc(weight, height); // executando calculo

    let info;
    
    data.forEach((item)=>{
        // buscando informações no data
        if(imc >= item.min && imc <= item.max){
            info = item.infor;
        };
    });
    
    if(!info) return; // verificação de valor não valido
    
    imcNumber.innerText = imc; // saída de informações precessadas
    imcInfo.innerText = info;

    switch(info){
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break;
        case "Obesidade grave":
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");
            break;    

    }

    showHide();

});

cleaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
});

backBtn.addEventListener("click", () =>{
    // a função está sem o parametro de "e" pois o botão está fora do form
    clearInputs();
    showHide();
});