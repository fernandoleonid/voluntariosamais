// import { voluntarios } from "./voluntarios.js";

import { getData } from "./voluntarios.js";

const {voluntarios, voluntariosDias} = await getData()

// const voluntariosDias = Object.keys(voluntarios[0]).slice(4, 20);
// const voluntariosDias = [
//   'Sexta-feira 04 de Agosto',
//   'Sábado 05 de Agosto',
//   'Domingo 06 de Agosto',
//   'Segunda-feira 07 de Agosto',
//   'Terça-feira 08 de Agosto',
//   'Quarta-feira 09 de Agosto',
//   'Quinta-feira 10 de Agosto',
//   'Sexta-feira 11 de Agosto',
//   'Sábado 12 de Agosto',
//   'Domingo 13 de Agosto',
//   'Segunda-feira 14 de Agosto',
//   'Terça-feira 15 de Agosto',
//   'Quarta-feira 16 de Agosto'  
// ]

const carregarDias = () => {
  const diasList = document.getElementById("dias-list");
  // const nomes = voluntarios.map( voluntario => voluntario["Digite seu nome"])
  diasList.innerHTML = "<option></option>";
  diasList.innerHTML += `
      <option>
          ${voluntariosDias.join("</option><option>")}
      </option>
  `;
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
  voluntariosList.innerHTML = "<option></option>";
  voluntariosList.innerHTML += `
        <option>
            ${nomes.join("</option><option>")}
        </option>
    `;
};

const listarDatas = ({ target }) => {
  const resultado = document.getElementById("resultado-voluntario");
  resultado.textContent = "";

  if (target.value == "") return 0;


  const dayTime = voluntariosDias.map((day) => ({
    dia: day,
    horario: voluntariosNome(target.value)[0][day]
  }));

  
  const workDays = dayTime.filter((day) => day.horario !== undefined);

  // console.log (workDays)

  workDays.forEach((day) => {
    resultado.innerHTML += `
        <div class="agenda">
          <div class="agenda__dia">${day.dia}</div>
          <div class="agenda__horario"><div>${day.horario?.replace(
            /;/g,
            "</div><div>"
          )}</div></div>
        </div>
      `;
  });
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
        // .join(";")
        // .split(";")
    ),
  ].sort();
  // const horarios = [
  //   ...new Set(
  //     voluntarioDia
  //       .map((voluntario) => voluntario.horario)
  //       .join(";")
  //       .split(";")
  //   ),
  // ].sort().slice(1,100);


  resultado.innerHTML = ''
  horarios.forEach( horario => {
    const nomes = voluntarioDia
      .filter((voluntario) => voluntario.horario?.includes(horario))
      .map((voluntario) => voluntario.nome.toUpperCase())
      .sort();
    //  .join('</div><div class="agenda__nome-dia">').toUpperCase()
    resultado.innerHTML += `
        <div>
          <div class="agenda__horario-dia">${horario}</div>
          <div class="agenda__nome-dia">
            ${nomes.join('</div><div class="agenda__nome-dia">')}
          </div>
        </dia>
  `;
  });
};

// function carregarQuantidades () {
//   console.log (voluntarios)
//   // console.log(voluntariosDias.map (dia => ({[dia]: 0})))

//   console.log(
//     voluntariosDias.reduce((acc, dia) => {
//       // contagem[item] = (contagem[item] || 0) + 1;
//       // return contagem;
//       return {
//         ...acc,
//         [dia]: voluntarios.filter( voluntario => voluntario[dia] ).length
//       }
//     }, {})
//   ) 
// }

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


    Object.entries(resultado).forEach (qtd => {
            const item = document.createElement('div')
            if (qtd[1] < 5) item.classList.add('atencao')
            item.textContent = qtd.join(' - ')
            container.appendChild(item)
    })
    
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
