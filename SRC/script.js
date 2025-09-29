<<<<<<< HEAD

// LÓGICA DO CADASTRO DE FAMÍLIAS 
function iniciarFormularioCadastro() {
const formCadastro = document.getElementById("family-registration-form");
if (!formCadastro) return;
formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();

    // Coleta TODOS os dados do formulário para index_Familia.html
    const familia = {
        nome: document.getElementById("nome-completo").value.trim(),
        dataNascimento: document.getElementById("data-nascimento")?.value || '',
        sexo: (document.querySelector('select[name="sexo Masculino / Feminino"]')?.value || ''),
        escolaridade: document.getElementById("escolaridade")?.value || '',
        profissao: document.getElementById("profissao")?.value.trim() || '',
        estadoCivil: document.getElementById("estado-civil")?.value || '',
        rg: document.getElementById("rg")?.value || '',
        cpf: document.getElementById("cpf")?.value.trim() || '',
        email: document.getElementById("email")?.value || '',
        telefone: document.getElementById("telefone")?.value || '',
        rua: document.getElementById("rua")?.value || '',
        numero: document.getElementById("numero")?.value || '',
        complemento: document.getElementById("complemento")?.value || '',
        bairro: document.getElementById("bairro")?.value || '',
        cidade: document.getElementById("cidade")?.value || '',
        estado: document.getElementById("estado")?.value || '',
        cep: document.getElementById("cep")?.value || '',
        referencia: document.getElementById("referencia")?.value || '',
        rendaFamiliar: document.getElementById("renda-familiar")?.value || '',
        membros: document.getElementById("pessoas-casa")?.value || '',
        tipoMoradia: document.getElementById("tipo-moradia")?.value || '',
        condicoesCasa: document.getElementById("condicoes-casa")?.value || '',
        aguaSaneamento: document.getElementById("agua-saneamento")?.value || '',
        beneficiosSociais: document.getElementById("beneficios-sociais")?.value || '',
        condicoesSaude: Array.from(document.querySelectorAll('input[name="condicoesSaude[]"]:checked')).map(e => e.value),
        mensagem: document.getElementById("mensagem")?.value || '',
        dependentes: Array.from(document.querySelectorAll('#dependentes-container .dependente-item')).map(div => {
            return {
                nome: div.querySelector('input[name*="[nome]"]')?.value || '',
                idade: div.querySelector('input[name*="[idade]"]')?.value || '',
                parentesco: div.querySelector('select[name*="[parentesco]"]')?.value || ''
            };
        }),
        dataCadastro: new Date().toLocaleDateString("pt-BR"),
        ultimaDoacao: null,
        acoesPendentes: 0
    };

    // Salva no localStorage
    let familias = JSON.parse(localStorage.getItem("familias")) || [];
    familias.push(familia);
    localStorage.setItem("familias", JSON.stringify(familias));

    alert("Família cadastrada com sucesso! em breve você sera notificado no seu celular.");
    
    window.location.href = "index_inicio.html";
});
}


// Responsável por carregar todos os dados e exibi em uma tabela na
// página 'index_familia.html'. Também permite aplicar um buscar por nome, CPF ou telefone.

function carregarFamiliasCompleto(filtro = "") {
    const familias = JSON.parse(localStorage.getItem("familias")) || [];
    const tbody = document.getElementById("familias-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    let listaFiltrada = familias;
    if (filtro && filtro.trim() !== "") {
        const termo = filtro.trim().toLowerCase();
        listaFiltrada = familias.filter(f =>
            (f.nome && f.nome.toLowerCase().includes(termo)) ||
            (f.cpf && f.cpf.toLowerCase().includes(termo)) ||
            (f.telefone && f.telefone.toLowerCase().includes(termo))
        );
    }
    if (listaFiltrada.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 28;
        cell.textContent = "Nenhuma família encontrada.";
        cell.style.textAlign = "center";
    } else {
        listaFiltrada.forEach(familia => {
            const row = tbody.insertRow();
            row.insertCell().textContent = familia.nome || "-";
            row.insertCell().textContent = familia.dataNascimento || "-";
            row.insertCell().textContent = familia.sexo || "-";
            row.insertCell().textContent = familia.escolaridade || "-";
            row.insertCell().textContent = familia.profissao || "-";
            row.insertCell().textContent = familia.estadoCivil || "-";
            row.insertCell().textContent = familia.rg || "-";
            row.insertCell().textContent = familia.cpf || "-";
            row.insertCell().textContent = familia.email || "-";
            row.insertCell().textContent = familia.telefone || "-";
            row.insertCell().textContent = familia.rua || "-";
            row.insertCell().textContent = familia.numero || "-";
            row.insertCell().textContent = familia.complemento || "-";
            row.insertCell().textContent = familia.bairro || "-";
            row.insertCell().textContent = familia.cidade || "-";
            row.insertCell().textContent = familia.estado || "-";
            row.insertCell().textContent = familia.cep || "-";
            row.insertCell().textContent = familia.referencia || "-";
            row.insertCell().textContent = familia.rendaFamiliar || "-";
            row.insertCell().textContent = familia.membros || "-";
            row.insertCell().textContent = familia.tipoMoradia || "-";
            row.insertCell().textContent = familia.condicoesCasa || "-";
            row.insertCell().textContent = familia.aguaSaneamento || "-";
            row.insertCell().textContent = familia.beneficiosSociais || "-";
            row.insertCell().textContent = (familia.condicoesSaude ? familia.condicoesSaude.join(", ") : "-");
            row.insertCell().textContent = familia.mensagem || "-";
            // Dependentes (exibe nomes separados por vírgula)
            let dep = "-";
            if (Array.isArray(familia.dependentes) && familia.dependentes.length > 0) {
                dep = familia.dependentes.map(d => d.nome).join(", ");
            }
            row.insertCell().textContent = dep;
            row.insertCell().textContent = familia.dataCadastro || "-";
        });
    }
}



// Função para adicionar dependente
//Cria dinamicamente um novo formulário de dependente (nome, idade, parentesco) dentro da página de
//cadastro de família. Cada dependente pode ser removido individualmente.

window.adicionarDependente = function() {
        const container = document.getElementById('dependentes-container');
        if (!container) return;
        const dependenteCount = container.children.length;
        const div = document.createElement('div');
        div.className = 'form-group dependente-item';
        div.innerHTML = `
            <h4>Dependente ${dependenteCount + 1}</h4>
            <label>Nome do Dependente:</label>
            <input type="text" name="dependentes[${dependenteCount}][nome]" required>
            <label>Idade:</label>
            <input type="number" name="dependentes[${dependenteCount}][idade]" min="0" required>
            <label>Parentesco:</label>
            <select name="dependentes[${dependenteCount}][parentesco]" required>
                <option value="Filho(a)">Filho(a)</option>
                <option value="Pai/Mãe">Pai/Mãe</option>
                <option value="Irmão(ã)">Irmão(ã)</option>
                <option value="Conjuge">Cônjuge</option>
                <option value="Outro">Outro</option>
            </select>
            <button type="button" class="btn-remover" onclick="this.parentElement.remove()">Remover</button>
        `;
        container.appendChild(div);
}
// INICIALIZADOR GERAL - Detecta em qual página estamos

document.addEventListener('DOMContentLoaded', () => {
const path = window.location.pathname;

if (path.includes('Index_Sobre.html')) {
    iniciarCarousel();
} else if (path.includes('Index_CadastroF.html')) {
    iniciarFormularioCadastro();
} else if (path.includes('index_Login.html')) {
    iniciarFormularioLogin();
} else if (path.includes('index_dashboard.html')) {
    carregarDashboard();
    // Adiciona evento de busca
    const searchInput = document.querySelector('.search-bar');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            carregarDashboard(this.value);
        });
    }
} else if (path.includes('index_familia.html') || path.includes('index_Familia.html')) {
    carregarFamiliasCompleto();
    const searchInput = document.querySelector('.search-Familia');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            carregarFamiliasCompleto(this.value);
        });
    }
}
});




// LÓGICA DO LOGIN (Página de Login)

function loginDeAcesso() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");

    if (username === "funcionario" && password === "1234") {
        alert("Login realizado com sucesso!");
        window.location.href = "index_dashboard.html";
    } else {
        errorMsg.textContent = "Usuário ou senha inválidos.";
    }
}


// LÓGICA DO DASHBOARD (Página do Dashboard)

let familiasCache = [];
function carregarDashboard(filtro = "") {
    const familias = JSON.parse(localStorage.getItem("familias")) || [];
    familiasCache = familias; // Salva para busca
    const tbody = document.getElementById("families-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = ""; // Limpa a tabela antes de preencher

    // Filtro de busca
    let listaFiltrada = familias;
    if (filtro && filtro.trim() !== "") {
        const termo = filtro.trim().toLowerCase();
        listaFiltrada = familias.filter(f =>
            (f.nome && f.nome.toLowerCase().includes(termo)) ||
            (f.cpf && f.cpf.toLowerCase().includes(termo)) ||
            (f.telefone && f.telefone.toLowerCase().includes(termo))
        );
    }

    if (listaFiltrada.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 10;
        cell.textContent = "Nenhuma família encontrada.";
        cell.style.textAlign = "center";
    } else {
        listaFiltrada.forEach((familia, index) => {    // Adiciona item na tabela dados cadastras mais importantes
            const row = tbody.insertRow();
            row.insertCell(0).textContent = familia.nome;
            row.insertCell(1).textContent = familia.cpf;
            row.insertCell(2).textContent = familia.telefone;
            row.insertCell(3).textContent = familia.membros;
            row.insertCell(4).textContent = familia.profissao || '-';
            row.insertCell(5).textContent = familia.dataCadastro;
            // Exibe o número de doações feitas
            let totalDoacoes = 0;
            if (Array.isArray(familia.doacoes)) {
                totalDoacoes = familia.doacoes.length;
            } else if (familia.ultimaDoacao && familia.ultimaDoacao !== "N/A") {
                totalDoacoes = 1;
            }
            row.insertCell(6).textContent = totalDoacoes;
            // Exibe 1 se está pendente, 0 se não está
            const pendente = (!familia.ultimaDoacao || familia.ultimaDoacao === "N/A") ? 1 : 0;
            row.insertCell(7).textContent = pendente;
            // Mensagem: mostra o último tipo de doação feita, se houver
            let mensagem = "-";
            if (Array.isArray(familia.doacoes) && familia.doacoes.length > 0) {
                mensagem = familia.doacoes[familia.doacoes.length-1].tipo || "-";
            } else if (familia.tipoUltimaDoacao) {
                mensagem = familia.tipoUltimaDoacao;
            }
            row.insertCell(8).textContent = mensagem;
            row.insertCell(9).innerHTML = `
                <button class="btn-action btn-edit" onclick="editarFamilia(${index})">Editar</button>
                <button class="btn-action btn-delete" onclick="deletarFamilia(${index})">Deletar</button>
                <button class="btn-action btn-donate" onclick="registrarDoacao(${index})">Doação</button>
            `;
        });
    }
    // Atualiza os contadores corretamente
    atualizarContadores(listaFiltrada);
}


    // Garante que os elementos existem antes de atualizar
function atualizarContadores(familias) {
    const totalFamilies = document.getElementById("total-families");
    const totalDonations = document.getElementById("total-donations");
    const pendingActions = document.getElementById("pending-actions");
    if (!totalFamilies || !totalDonations || !pendingActions) return;

    totalFamilies.textContent = familias.length;
    // Conta todas as doações feitas (total geral)
    let doacoes = 0;
    familias.forEach(f => {
        if (Array.isArray(f.doacoes)) {
            doacoes += f.doacoes.length;
        } else if (f.ultimaDoacao && f.ultimaDoacao !== "N/A") {
            doacoes += 1;
        }
    });
    totalDonations.textContent = doacoes;
    // Ações pendentes: número de famílias sem doação registrada
    const pendentes = familias.filter(f => !f.ultimaDoacao || f.ultimaDoacao === "N/A").length;
    pendingActions.textContent = pendentes;
}

// Funções de Ação do Dashboard 

window.editarFamilia = function(index) {
    const familias = JSON.parse(localStorage.getItem("familias")) || [];
    const familia = familias[index];
    const novoNome = prompt("Editar Nome:", familia.nome);   //Para Editar Cadastro
    const novoTele = prompt("Editar Telefone:", familia.telefone);
    const novoProf = prompt("Editar Profissão:", familia.profissao);
    const novoMembros = prompt("Editar Nº de Membros na Família:", familia.membros);
    if (novoMembros) familia.membros = novoMembros.trim();


    if (novoNome) familia.nome = novoNome.trim();      // Atualiza informações
    familias[index] = familia;
    if (novoTele) familia.telefone = novoTele.trim();
    familias[index] = familia;
    if (novoProf) familia.profissao = novoProf.trim();
    localStorage.setItem("familias", JSON.stringify(familias));
    carregarDashboard();
}

window.deletarFamilia = function(index) {
    if (confirm("Tem certeza que deseja deletar esta família?")) {
        let familias = JSON.parse(localStorage.getItem("familias")) || [];
        familias.splice(index, 1);
        localStorage.setItem("familias", JSON.stringify(familias));
        carregarDashboard();
    }
}

window.registrarDoacao = function(index) {
    let familias = JSON.parse(localStorage.getItem("familias")) || [];
    const familia = familias[index];
    // Pergunta o tipo de doação
    const tipo = prompt("Qual o tipo de doação? (Alimento, Roupas e Sapato, Outros)", "Alimento");
    if (!tipo) return;
    // Adiciona um array de doações se não existir
    if (!Array.isArray(familia.doacoes)) {
        familia.doacoes = [];
    }
    // Adiciona a nova doação
    const data = new Date().toLocaleDateString("pt-BR");
    familia.doacoes.push({ data, tipo });
    familia.ultimaDoacao = data;
    familia.tipoUltimaDoacao = tipo;
    familias[index] = familia;
    localStorage.setItem("familias", JSON.stringify(familias));
    carregarDashboard();
}




=======

// LÓGICA DO CADASTRO DE FAMÍLIAS 
function iniciarFormularioCadastro() {
const formCadastro = document.getElementById("family-registration-form");
if (!formCadastro) return;
formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();

    // Coleta TODOS os dados do formulário para index_Familia.html
    const familia = {
        nome: document.getElementById("nome-completo").value.trim(),
        dataNascimento: document.getElementById("data-nascimento")?.value || '',
        sexo: (document.querySelector('select[name="sexo Masculino / Feminino"]')?.value || ''),
        escolaridade: document.getElementById("escolaridade")?.value || '',
        profissao: document.getElementById("profissao")?.value.trim() || '',
        estadoCivil: document.getElementById("estado-civil")?.value || '',
        rg: document.getElementById("rg")?.value || '',
        cpf: document.getElementById("cpf")?.value.trim() || '',
        email: document.getElementById("email")?.value || '',
        telefone: document.getElementById("telefone")?.value || '',
        rua: document.getElementById("rua")?.value || '',
        numero: document.getElementById("numero")?.value || '',
        complemento: document.getElementById("complemento")?.value || '',
        bairro: document.getElementById("bairro")?.value || '',
        cidade: document.getElementById("cidade")?.value || '',
        estado: document.getElementById("estado")?.value || '',
        cep: document.getElementById("cep")?.value || '',
        referencia: document.getElementById("referencia")?.value || '',
        rendaFamiliar: document.getElementById("renda-familiar")?.value || '',
        membros: document.getElementById("pessoas-casa")?.value || '',
        tipoMoradia: document.getElementById("tipo-moradia")?.value || '',
        condicoesCasa: document.getElementById("condicoes-casa")?.value || '',
        aguaSaneamento: document.getElementById("agua-saneamento")?.value || '',
        beneficiosSociais: document.getElementById("beneficios-sociais")?.value || '',
        condicoesSaude: Array.from(document.querySelectorAll('input[name="condicoesSaude[]"]:checked')).map(e => e.value),
        mensagem: document.getElementById("mensagem")?.value || '',
        dependentes: Array.from(document.querySelectorAll('#dependentes-container .dependente-item')).map(div => {
            return {
                nome: div.querySelector('input[name*="[nome]"]')?.value || '',
                idade: div.querySelector('input[name*="[idade]"]')?.value || '',
                parentesco: div.querySelector('select[name*="[parentesco]"]')?.value || ''
            };
        }),
        dataCadastro: new Date().toLocaleDateString("pt-BR"),
        ultimaDoacao: null,
        acoesPendentes: 0
    };

    // Salva no localStorage
    let familias = JSON.parse(localStorage.getItem("familias")) || [];
    familias.push(familia);
    localStorage.setItem("familias", JSON.stringify(familias));

    alert("Família cadastrada com sucesso! em breve você sera notificado no seu celular.");
    
    window.location.href = "index_inicio.html";
});
}


// Responsável por carregar todos os dados e exibi em uma tabela na
// página 'index_familia.html'. Também permite aplicar um buscar por nome, CPF ou telefone.

function carregarFamiliasCompleto(filtro = "") {
    const familias = JSON.parse(localStorage.getItem("familias")) || [];
    const tbody = document.getElementById("familias-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    let listaFiltrada = familias;
    if (filtro && filtro.trim() !== "") {
        const termo = filtro.trim().toLowerCase();
        listaFiltrada = familias.filter(f =>
            (f.nome && f.nome.toLowerCase().includes(termo)) ||
            (f.cpf && f.cpf.toLowerCase().includes(termo)) ||
            (f.telefone && f.telefone.toLowerCase().includes(termo))
        );
    }
    if (listaFiltrada.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 28;
        cell.textContent = "Nenhuma família encontrada.";
        cell.style.textAlign = "center";
    } else {
        listaFiltrada.forEach(familia => {
            const row = tbody.insertRow();
            row.insertCell().textContent = familia.nome || "-";
            row.insertCell().textContent = familia.dataNascimento || "-";
            row.insertCell().textContent = familia.sexo || "-";
            row.insertCell().textContent = familia.escolaridade || "-";
            row.insertCell().textContent = familia.profissao || "-";
            row.insertCell().textContent = familia.estadoCivil || "-";
            row.insertCell().textContent = familia.rg || "-";
            row.insertCell().textContent = familia.cpf || "-";
            row.insertCell().textContent = familia.email || "-";
            row.insertCell().textContent = familia.telefone || "-";
            row.insertCell().textContent = familia.rua || "-";
            row.insertCell().textContent = familia.numero || "-";
            row.insertCell().textContent = familia.complemento || "-";
            row.insertCell().textContent = familia.bairro || "-";
            row.insertCell().textContent = familia.cidade || "-";
            row.insertCell().textContent = familia.estado || "-";
            row.insertCell().textContent = familia.cep || "-";
            row.insertCell().textContent = familia.referencia || "-";
            row.insertCell().textContent = familia.rendaFamiliar || "-";
            row.insertCell().textContent = familia.membros || "-";
            row.insertCell().textContent = familia.tipoMoradia || "-";
            row.insertCell().textContent = familia.condicoesCasa || "-";
            row.insertCell().textContent = familia.aguaSaneamento || "-";
            row.insertCell().textContent = familia.beneficiosSociais || "-";
            row.insertCell().textContent = (familia.condicoesSaude ? familia.condicoesSaude.join(", ") : "-");
            row.insertCell().textContent = familia.mensagem || "-";
            // Dependentes (exibe nomes separados por vírgula)
            let dep = "-";
            if (Array.isArray(familia.dependentes) && familia.dependentes.length > 0) {
                dep = familia.dependentes.map(d => d.nome).join(", ");
            }
            row.insertCell().textContent = dep;
            row.insertCell().textContent = familia.dataCadastro || "-";
        });
    }
}



// Função para adicionar dependente
//Cria dinamicamente um novo formulário de dependente (nome, idade, parentesco) dentro da página de
//cadastro de família. Cada dependente pode ser removido individualmente.

window.adicionarDependente = function() {
        const container = document.getElementById('dependentes-container');
        if (!container) return;
        const dependenteCount = container.children.length;
        const div = document.createElement('div');
        div.className = 'form-group dependente-item';
        div.innerHTML = `
            <h4>Dependente ${dependenteCount + 1}</h4>
            <label>Nome do Dependente:</label>
            <input type="text" name="dependentes[${dependenteCount}][nome]" required>
            <label>Idade:</label>
            <input type="number" name="dependentes[${dependenteCount}][idade]" min="0" required>
            <label>Parentesco:</label>
            <select name="dependentes[${dependenteCount}][parentesco]" required>
                <option value="Filho(a)">Filho(a)</option>
                <option value="Pai/Mãe">Pai/Mãe</option>
                <option value="Irmão(ã)">Irmão(ã)</option>
                <option value="Conjuge">Cônjuge</option>
                <option value="Outro">Outro</option>
            </select>
            <button type="button" class="btn-remover" onclick="this.parentElement.remove()">Remover</button>
        `;
        container.appendChild(div);
}
// INICIALIZADOR GERAL - Detecta em qual página estamos

document.addEventListener('DOMContentLoaded', () => {
const path = window.location.pathname;

if (path.includes('Index_Sobre.html')) {
    iniciarCarousel();
} else if (path.includes('Index_CadastroF.html')) {
    iniciarFormularioCadastro();
} else if (path.includes('index_Login.html')) {
    iniciarFormularioLogin();
} else if (path.includes('index_dashboard.html')) {
    carregarDashboard();
    // Adiciona evento de busca
    const searchInput = document.querySelector('.search-bar');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            carregarDashboard(this.value);
        });
    }
} else if (path.includes('index_familia.html') || path.includes('index_Familia.html')) {
    carregarFamiliasCompleto();
    const searchInput = document.querySelector('.search-Familia');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            carregarFamiliasCompleto(this.value);
        });
    }
}
});




// LÓGICA DO LOGIN (Página de Login)

function loginDeAcesso() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");

    if (username === "funcionario" && password === "1234") {
        alert("Login realizado com sucesso!");
        window.location.href = "index_dashboard.html";
    } else {
        errorMsg.textContent = "Usuário ou senha inválidos.";
    }
}


// LÓGICA DO DASHBOARD (Página do Dashboard)

let familiasCache = [];
function carregarDashboard(filtro = "") {
    const familias = JSON.parse(localStorage.getItem("familias")) || [];
    familiasCache = familias; // Salva para busca
    const tbody = document.getElementById("families-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = ""; // Limpa a tabela antes de preencher

    // Filtro de busca
    let listaFiltrada = familias;
    if (filtro && filtro.trim() !== "") {
        const termo = filtro.trim().toLowerCase();
        listaFiltrada = familias.filter(f =>
            (f.nome && f.nome.toLowerCase().includes(termo)) ||
            (f.cpf && f.cpf.toLowerCase().includes(termo)) ||
            (f.telefone && f.telefone.toLowerCase().includes(termo))
        );
    }

    if (listaFiltrada.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 10;
        cell.textContent = "Nenhuma família encontrada.";
        cell.style.textAlign = "center";
    } else {
        listaFiltrada.forEach((familia, index) => {    // Adiciona item na tabela dados cadastras mais importantes
            const row = tbody.insertRow();
            row.insertCell(0).textContent = familia.nome;
            row.insertCell(1).textContent = familia.cpf;
            row.insertCell(2).textContent = familia.telefone;
            row.insertCell(3).textContent = familia.membros;
            row.insertCell(4).textContent = familia.profissao || '-';
            row.insertCell(5).textContent = familia.dataCadastro;
            // Exibe o número de doações feitas
            let totalDoacoes = 0;
            if (Array.isArray(familia.doacoes)) {
                totalDoacoes = familia.doacoes.length;
            } else if (familia.ultimaDoacao && familia.ultimaDoacao !== "N/A") {
                totalDoacoes = 1;
            }
            row.insertCell(6).textContent = totalDoacoes;
            // Exibe 1 se está pendente, 0 se não está
            const pendente = (!familia.ultimaDoacao || familia.ultimaDoacao === "N/A") ? 1 : 0;
            row.insertCell(7).textContent = pendente;
            // Mensagem: mostra o último tipo de doação feita, se houver
            let mensagem = "-";
            if (Array.isArray(familia.doacoes) && familia.doacoes.length > 0) {
                mensagem = familia.doacoes[familia.doacoes.length-1].tipo || "-";
            } else if (familia.tipoUltimaDoacao) {
                mensagem = familia.tipoUltimaDoacao;
            }
            row.insertCell(8).textContent = mensagem;
            row.insertCell(9).innerHTML = `
                <button class="btn-action btn-edit" onclick="editarFamilia(${index})">Editar</button>
                <button class="btn-action btn-delete" onclick="deletarFamilia(${index})">Deletar</button>
                <button class="btn-action btn-donate" onclick="registrarDoacao(${index})">Doação</button>
            `;
        });
    }
    // Atualiza os contadores corretamente
    atualizarContadores(listaFiltrada);
}


    // Garante que os elementos existem antes de atualizar
function atualizarContadores(familias) {
    const totalFamilies = document.getElementById("total-families");
    const totalDonations = document.getElementById("total-donations");
    const pendingActions = document.getElementById("pending-actions");
    if (!totalFamilies || !totalDonations || !pendingActions) return;

    totalFamilies.textContent = familias.length;
    // Conta todas as doações feitas (total geral)
    let doacoes = 0;
    familias.forEach(f => {
        if (Array.isArray(f.doacoes)) {
            doacoes += f.doacoes.length;
        } else if (f.ultimaDoacao && f.ultimaDoacao !== "N/A") {
            doacoes += 1;
        }
    });
    totalDonations.textContent = doacoes;
    // Ações pendentes: número de famílias sem doação registrada
    const pendentes = familias.filter(f => !f.ultimaDoacao || f.ultimaDoacao === "N/A").length;
    pendingActions.textContent = pendentes;
}

// Funções de Ação do Dashboard 

window.editarFamilia = function(index) {
    const familias = JSON.parse(localStorage.getItem("familias")) || [];
    const familia = familias[index];
    const novoNome = prompt("Editar Nome:", familia.nome);   //Para Editar Cadastro
    const novoTele = prompt("Editar Telefone:", familia.telefone);
    const novoProf = prompt("Editar Profissão:", familia.profissao);
    const novoMembros = prompt("Editar Nº de Membros na Família:", familia.membros);
    if (novoMembros) familia.membros = novoMembros.trim();


    if (novoNome) familia.nome = novoNome.trim();      // Atualiza informações
    familias[index] = familia;
    if (novoTele) familia.telefone = novoTele.trim();
    familias[index] = familia;
    if (novoProf) familia.profissao = novoProf.trim();
    localStorage.setItem("familias", JSON.stringify(familias));
    carregarDashboard();
}

window.deletarFamilia = function(index) {
    if (confirm("Tem certeza que deseja deletar esta família?")) {
        let familias = JSON.parse(localStorage.getItem("familias")) || [];
        familias.splice(index, 1);
        localStorage.setItem("familias", JSON.stringify(familias));
        carregarDashboard();
    }
}

window.registrarDoacao = function(index) {
    let familias = JSON.parse(localStorage.getItem("familias")) || [];
    const familia = familias[index];
    // Pergunta o tipo de doação
    const tipo = prompt("Qual o tipo de doação? (Alimento, Roupas e Sapato, Outros)", "Alimento");
    if (!tipo) return;
    // Adiciona um array de doações se não existir
    if (!Array.isArray(familia.doacoes)) {
        familia.doacoes = [];
    }
    // Adiciona a nova doação
    const data = new Date().toLocaleDateString("pt-BR");
    familia.doacoes.push({ data, tipo });
    familia.ultimaDoacao = data;
    familia.tipoUltimaDoacao = tipo;
    familias[index] = familia;
    localStorage.setItem("familias", JSON.stringify(familias));
    carregarDashboard();
}




>>>>>>> 071c6f8 (Arrumando as Index para ajuste do github)
