const formatador = (data) => {

  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}

const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}
  
let atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-07-09 12:00"),
    finalizada: false,
  },
  {
    nome: 'Gamming session',
    data: new Date("2024-07-09 16:00"),
    finalizada: true,
  },
]

// atividades = []
  
const criarItemDeAtividade = (atividade) => {
  
  let input = `
  <input onchange="concluirAtividade(event)" 
  value="${atividade.data}" 
  type="checkbox" 
  `
  
  if(atividade.finalizada){
    input += 'checked'
  }
  
  input += '>'
  
  const formatar = formatador(atividade.data);

  return `
  <div class="card-bg">
    ${input}

    <div>

      <svg class="active" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#AFF445" class="bi bi-check-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
      </svg>

      <svg class="inactive" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#A1A1AB" class="bi bi-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      </svg>

      <span>${atividade.nome}</span>
    </div>

    <time class="short">
      ${formatar.dia.semana.curto}.
      ${formatar.dia.numerico} <br>
      ${formatar.hora}
    </time>

    <time class="full">
      ${formatar.dia.semana.longo}, 
      dia ${formatar.dia.numerico}
      de ${formatar.mes}
      às ${formatar.hora}h
    </time>
  </div>
  `
}
  
const atualizarListaDeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  if(atividades.length == 0){
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }
  
  for(let atividade of atividades){
    section.innerHTML += criarItemDeAtividade(atividade)
  }

}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`

  const novaAtividade = {
    nome,
    data,
    finalizada: false
  }

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if(atividadeExiste){
    return alert('Dia/Hora não disponível')
  }

  atividades = [novaAtividade, ...atividades]
  atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let diasSelecao = ''

  for(let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
      ${formatar.dia.numerico} de 
      ${formatar.mes}
    `
    diasSelecao += `<option value="${dia}">${diaFormatado}</option>`
  }

  document.querySelector('select[name = "dia"]').innerHTML = diasSelecao
}

criarDiasSelecao()


const criarHorasSelecao = () => {
  let horasDisponiveis = ''

  for(let i = 6; i < 23; i++){
    const hora = String(i).padStart(2, '0')
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}

criarHorasSelecao()


const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value 

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  if(!atividade){
    return
  }

  atividade.finalizada = !atividade.finalizada
}