// Função executada quando a página carrega
onload = () => {
  // Configura o evento de clique para o botão '0' chamando a função digito(0)
  document.querySelector('#bt-0').onclick = () => digito(0);
  // Configura o evento de clique para o botão '1' chamando a função digito(1)
  document.querySelector('#bt-1').onclick = () => digito(1);
  // Configura o evento de clique para o botão '2' chamando a função digito(2)
  document.querySelector('#bt-2').onclick = () => digito(2);
  // Configura o evento de clique para o botão '3' chamando a função digito(3)
  document.querySelector('#bt-3').onclick = () => digito(3);
  // Configura o evento de clique para o botão '4' chamando a função digito(4)
  document.querySelector('#bt-4').onclick = () => digito(4);
  // Configura o evento de clique para o botão '5' chamando a função digito(5)
  document.querySelector('#bt-5').onclick = () => digito(5);
  // Configura o evento de clique para o botão '6' chamando a função digito(6)
  document.querySelector('#bt-6').onclick = () => digito(6);
  // Configura o evento de clique para o botão '7' chamando a função digito(7)
  document.querySelector('#bt-7').onclick = () => digito(7);
  // Configura o evento de clique para o botão '8' chamando a função digito(8)
  document.querySelector('#bt-8').onclick = () => digito(8);
  // Configura o evento de clique para o botão '9' chamando a função digito(9)
  document.querySelector('#bt-9').onclick = () => digito(9);
  // Configura o evento de clique para o botão da vírgula (decimal)
  document.querySelector('#bt-comma').onclick = virgula;
  // Configura o evento de clique para o botão AC (limpar tudo)
  document.querySelector('#bt-ac').onclick = limpa;
  // Configura o evento de clique para o botão divisão
  document.querySelector('#bt-divide').onclick = () => operador('/');
  // Configura o evento de clique para o botão multiplicação
  document.querySelector('#bt-times').onclick = () => operador('*');
  // Configura o evento de clique para o botão subtração
  document.querySelector('#bt-minus').onclick = () => operador('-');
  // Configura o evento de clique para o botão adição
  document.querySelector('#bt-plus').onclick = () => operador('+');
  // Configura o evento de clique para o botão igual (calcular resultado)
  document.querySelector('#bt-equals').onclick = calcula;
};

// Variável que armazena o valor atual exibido no visor da calculadora
let sValor = '0'; 
// Booleano que indica se o próximo dígito deve iniciar um novo número no display
let ehNovoNumero = true; 
// Armazena o valor anterior para realizar operações matemáticas acumuladas
let valorAnterior = 0; 
// Armazena o operador pendente (ex: '+', '-', '*', '/')
let operacaoPendente = null; 

// Função para atualizar o visor da calculadora com formatação
const atualizaVisor = () => {
  // Divide o valor atual em parte inteira e decimal pela vírgula
  let [parteInteira, parteDecimal] = sValor.split(',');
  
  // Verifica se a parte inteira ultrapassa 10 caracteres, mostra erro se for o caso
  if (parteInteira.length > 10) {
    document.querySelector('#display').innerText = 'Erro';
    return;
  }

  // Variável para construir o valor formatado com pontos a cada três dígitos
  let v = '';
  // Contador para inserir o ponto de milhar
  let c = 0;

  // Laço que percorre a parte inteira do número de trás para frente
  for (let i = parteInteira.length - 1; i >= 0; i--) {
    if (++c > 3) {
      // Insere o ponto como separador de milhar
      v = '.' + v;
      c = 1; // Reinicia o contador após inserir o ponto
    }
    // Adiciona o dígito atual à string formatada
    v = parteInteira[i] + v;
  }

  // Acrescenta a parte decimal (se existir) limitando o número de dígitos após a vírgula
  v = v + (parteDecimal ? ',' + parteDecimal.substr(0, 10 - v.length) : '');

  // Atualiza o conteúdo do elemento display com o valor formatado
  document.querySelector('#display').innerText = v;
};

// Função para tratar o clique nos botões numéricos (0-9)
const digito = (n) => {
  // Se o próximo dígito for um novo número, substitui o valor atual pelo digitado
  if (ehNovoNumero) {
    sValor = '' + n;
    ehNovoNumero = false; // Indica que não é mais um novo número
  } else {
    // Caso contrário, concatena o dígito ao valor atual no display
    sValor += n;
  }
  // Atualiza o visor para refletir a mudança
  atualizaVisor();
};

// Função para tratar o clique no botão de vírgula decimal
const virgula = () => {
  // Se for um novo número, inicia com '0,'
  if (ehNovoNumero) {
    sValor = '0,';
    ehNovoNumero = false;
  } else if (sValor.indexOf(',') == -1) {
    // Se já não tiver vírgula, adiciona uma ao valor atual
    sValor += ',';
  }
  // Atualiza o visor com o novo valor
  atualizaVisor();
};

// Função para limpar a calculadora (botão AC)
const limpa = () => {
  ehNovoNumero = true; // Próximo dígito será um novo número
  valorAnterior = 0; // Zera o valor acumulado
  sValor = '0'; // Reseta o valor exibido
  operacaoPendente = null; // Remove operação pendente
  atualizaVisor(); // Atualiza o display para refletir o reset
};

// Função para converter o valor da string exibida para número real
const valorAtual = () => parseFloat(sValor.replace(',', '.'));

// Função para tratar o clique em operadores matemáticos
const operador = (op) => {
  // Realiza o cálculo anterior, caso exista operação pendente
  calcula();
  // Armazena o valor atual para a próxima operação
  valorAnterior = valorAtual();
  // Define a operação pendente para o próximo cálculo
  operacaoPendente = op;
  // Indica que o próximo dígito será o início de um novo número
  ehNovoNumero = true;
};

// Função que realiza o cálculo baseado no operador pendente
const calcula = () => {
  if (operacaoPendente != null) {
    let resultado;

   
    switch (operacaoPendente) {
      case '+':
        resultado = valorAnterior + valorAtual();
        break;
      case '-':
        resultado = valorAnterior - valorAtual();
        break;
      case '*':
        resultado = valorAnterior * valorAtual();
        break;
      case '/':
        resultado = valorAnterior / valorAtual();
        break;
    }

    
    sValor = resultado.toString().replace('.', ',');
  }


  ehNovoNumero = true;

  operacaoPendente = null;

  valorAnterior = 0;
  
  atualizaVisor();
};
