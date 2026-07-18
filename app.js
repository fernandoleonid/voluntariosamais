import { getData } from "./voluntarios.js";

const {voluntarios, voluntariosDias} = await getData()


const carregarDias = () => {
  const diasList = document.getElementById("dias-list");
  diasList.innerHTML = `<option></option><option>${voluntariosDias.join("</option><option>")}</option>`;
};

const voluntariosNome = (nome) =>
  voluntarios.filter(
    (voluntario) =>
      voluntario["Digite seu nome"].trim().toUpperCase() == nome.toUpperCase()
  );

const carregarVoluntarios = () => {
  const voluntariosList = document.getElementById("voluntarios-list");
  const nomes = voluntarios
    .map((voluntario) => voluntario["Digite seu nome"])
    .sort();
  voluntariosList.innerHTML = `<option></option><option>${nomes.join("</option><option>")}</option>`;
};

const listarDatas = ({ target }) => {
  const resultado = document.getElementById("resultado-voluntario");
  resultado.replaceChildren();

  if (target.value == "") return 0;


  const voluntario = voluntariosNome(target.value)[0];

  const workDays = voluntariosDias
    .map((day) => ({ dia: day, horario: voluntario[day] }))
    .filter((day) => day.horario !== undefined);

  const html = [];
  workDays.forEach((day) => {
    html.push(`
        <div class="agenda">
          <div class="agenda__dia">${day.dia}</div>
          <div class="agenda__horario"><div>${day.horario?.replace(
            /;/g,
            "</div><div>"
          )}</div></div>
        </div>
      `);
  });
  resultado.innerHTML = html.join('');
};

const listarVoluntarios = ({ target }) => {
  if (target.value == "") return 0;

  const resultado = document.getElementById("resultado-dias");
  
  const voluntarioDia = voluntarios
    .filter((voluntario) => voluntario[target.value] !== "")
    .map((voluntario) => ({
      nome: voluntario["Digite seu nome"],
      horario: voluntario[target.value],
    }));

  const horarios = [
    ...new Set(
      voluntarioDia
        .map((voluntario) => voluntario.horario)
        .filter (voluntario => voluntario)
    ),
  ].sort();


  const html = [];
  horarios.forEach( horario => {
    const nomes = voluntarioDia
      .filter((voluntario) => voluntario.horario?.includes(horario))
      .map((voluntario) => voluntario.nome.toUpperCase())
      .sort();
    html.push(`
        <div>
          <div class="agenda__horario-dia">${horario}</div>
          <div class="agenda__nome-dia">
            ${nomes.join('</div><div class="agenda__nome-dia">')}
          </div>
        </dia>
  `);
  });
  resultado.innerHTML = html.join('');
};


function carregarQuantidades() {
    const resultado = {};
    const container = document.getElementById("container-quantidades")
    
    voluntariosDias.forEach(diaC => {
        const voluntariosNoDia = voluntarios.filter(voluntario => voluntario[diaC]);
        let dia = diaC.match(/\d+/)[0]
        voluntariosNoDia.forEach(voluntario => {
            const horario = voluntario[diaC]
            const chave = `${dia} - ${horario}`
            resultado[chave] = (resultado[chave] || 0) + 1
        });
    });


    const fragment = document.createDocumentFragment();
    Object.entries(resultado).forEach(qtd => {
            const item = document.createElement('div')
            if (qtd[1] < 5) item.classList.add('atencao')
            item.textContent = qtd.join(' - ')
            fragment.appendChild(item)
    });
    container.appendChild(fragment);
    
    return resultado;
}

carregarVoluntarios();
carregarDias();
carregarQuantidades();



document
  .getElementById("voluntarios-list")
  .addEventListener("change", listarDatas);

document
  .getElementById("dias-list")
  .addEventListener("change", listarVoluntarios);
