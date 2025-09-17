function mostrarDiv(id) {
    document.getElementById("login-div").classList.add("hidden");
    document.getElementById("dados-div").classList.add("hidden");
    document.getElementById("dieta-div").classList.add("hidden");
    document.getElementById(id).classList.remove("hidden");
}

function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if(usuario && senha){
        alert("Login realizado com sucesso!");
        mostrarDiv("dados-div");
    } else alert("Preencha usuário e senha!");
}

function sugerirObjetivo() {
    const peso = parseFloat(document.getElementById('peso').value);
    const sugestao = document.getElementById('sugestao-objetivo');
    const selectObjetivo = document.getElementById('objetivo');

    if(!peso){
        sugestao.innerText = 'Seu objetivo será sugerido automaticamente com base no peso.';
        selectObjetivo.value = '';
        return;
    }
    if(peso < 60){
        sugestao.innerText = 'Sugestão: ganhar massa muscular.';
        selectObjetivo.value = 'ganhar';
    } else if(peso > 100){
        sugestao.innerText = 'Sugestão: emagrecer.';
        selectObjetivo.value = 'emagrecer';
    } else {
        sugestao.innerText = 'Escolha manualmente seu objetivo.';
        selectObjetivo.value = '';
    }
}

function salvarDados() {
    const nome = document.getElementById("nome").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const objetivo = document.getElementById("objetivo").value;

    if(!nome || !peso || !altura || !objetivo){
        alert("Preencha todos os campos!");
        return;
    }

    localStorage.setItem("nome", nome);
    localStorage.setItem("peso", peso);
    localStorage.setItem("altura", altura);
    localStorage.setItem("objetivo", objetivo);

    mostrarDiv("dieta-div");
    carregarDieta();
}

function carregarDieta() {
    const nome = localStorage.getItem("nome");
    const objetivo = localStorage.getItem("objetivo");

    document.getElementById("boas-vindas").innerText = `Olá, ${nome}!`;

    let infoObjetivo = "", cards = [];

    if(objetivo==="ganhar"){
        infoObjetivo="Seu objetivo é ganhar massa muscular.";
        cards=[
            {ref:"Café da manhã", itens:["Ovos mexidos","Aveia","Frutas"]},
            {ref:"Almoço", itens:["Arroz integral","Frango","Legumes"]},
            {ref:"Lanche", itens:["Shake de proteína","Castanhas"]},
            {ref:"Jantar", itens:["Batata-doce","Peixe","Legumes"]}
        ];
    } else if(objetivo==="emagrecer"){
        infoObjetivo="Seu objetivo é emagrecer.";
        cards=[
            {ref:"Café da manhã", itens:["Frutas","Chá","Ovos cozidos"]},
            {ref:"Almoço", itens:["Salada","Peito de frango","Arroz integral"]},
            {ref:"Lanche", itens:["Iogurte natural","Frutas"]},
            {ref:"Jantar", itens:["Sopa de legumes","Salada"]}
        ];
    } else {
        infoObjetivo="Seu objetivo é manter peso.";
        cards=[
            {ref:"Café da manhã", itens:["Iogurte natural","Frutas","Granola"]},
            {ref:"Almoço", itens:["Arroz integral","Frango/Peixe","Salada"]},
            {ref:"Lanche", itens:["Frutas","Castanhas"]},
            {ref:"Jantar", itens:["Legumes","Proteína magra"]}
        ];
    }

    document.getElementById("info-objetivo").innerText = infoObjetivo;

    const container = document.getElementById("cards");
    container.innerHTML = "";

    cards.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<h3>${card.ref}</h3><ul>${card.itens.map(i=>`<li>${i}</li>`).join('')}</ul>`;
        container.appendChild(div);
    });
}









