<template>
  <div class="max-w-4xl mx-auto space-y-6 p-6">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold mb-2">DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA</h1>
      <p class="text-gray-600">CÂMARA MUNICIPAL DE VEREADORES</p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="card">
        <!-- Cabeçalho do DFD -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="flex items-center gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">DFD Nº</label>
              <div class="flex items-center">
                <input 
                  type="number" 
                  v-model="form.dfdNumero" 
                  class="input w-24" 
                  required
                  min="1"
                  placeholder="Nº"
                />
                <span class="mx-2 text-lg font-medium">/</span>
                <select 
                  v-model="form.dfdAno" 
                  class="input w-28"
                  required
                >
                  <option v-for="ano in anos" :key="ano" :value="ano">{{ ano }}</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Órgão</label>
            <input type="text" v-model="form.orgao" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Setor requisitante</label>
            <input type="text" v-model="form.setorRequisitante" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Responsável pela Demanda</label>
            <input type="text" v-model="form.responsavel" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Matrícula</label>
            <input type="text" v-model="form.matricula" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">E-mail</label>
            <input type="email" v-model="form.email" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Telefone</label>
            <input 
              type="text" 
              v-model="form.telefone" 
              @input="formatarTelefone"
              class="input" 
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <!-- 1. Objeto -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">1. Objeto</h2>
          <textarea v-model="form.objeto" rows="4" class="input"></textarea>
        </div>

        <!-- 2. Justificativa -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">2. Justificativa da necessidade da contratação</h2>
          <textarea v-model="form.justificativa" rows="4" class="input"></textarea>
        </div>

        <!-- 3. Descrições e quantidades -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">3. Descrições e quantidades</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-2">Descrição</th>
                  <th class="px-4 py-2">Quant.</th>
                  <th class="px-4 py-2">Medida</th>
                  <th class="px-4 py-2">Valor Mês</th>
                  <th class="px-4 py-2">Valor Total</th>
                  <th class="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in form.items" :key="index">
                  <td><input type="text" v-model="item.descricao" class="input" /></td>
                  <td>
                    <input 
                      type="number" 
                      v-model.number="item.quantidade" 
                      min="1" 
                      class="input"
                      @input="e => item.quantidade = Math.max(1, parseInt(e.target.value) || 1)"
                    />
                  </td>
                  <td>
                    <select v-model="item.medida" class="input">
                      <option value="Mês">Mês</option>
                      <option value="KG">KG</option>
                      <option value="cm">cm</option>
                      <option value="metros">metros</option>
                      <option value="fardo">fardo</option>
                      <option value="unidades">unidades</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text" 
                      :value="formatCurrency(item.valorMes)"
                      @input="(e) => formatarValorMesForItem(e, index)"
                      class="input" 
                      placeholder="R$ 0,00"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      :value="formatCurrency(calcularValorTotalItem(item))"
                      class="input" 
                      disabled 
                    />
                  </td>
                  <td>
                    <button 
                      type="button" 
                      @click="removeItem(index)" 
                      class="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button 
              type="button" 
              @click="addItem" 
              class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Adicionar Item
            </button>
          </div>
        </div>

        <!-- 4. Grau de prioridade -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">4. Grau de prioridade da compra</h2>
          <select v-model="form.prioridade" class="input">
            <option value="Alto">Alto</option>
            <option value="Médio">Médio</option>
            <option value="Baixo">Baixo</option>
          </select>
        </div>

        <!-- 5. Análise de riscos -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">5. Necessita de análise de riscos</h2>
          <div class="flex space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.analiseRiscos" value="sim" class="form-radio" />
              <span class="ml-2">Sim</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.analiseRiscos" value="nao" class="form-radio" />
              <span class="ml-2">Não</span>
            </label>
          </div>
          <input v-if="form.analiseRiscos === 'nao'" 
                 type="text" 
                 v-model="form.justificativaRiscos" 
                 placeholder="Justificativa" 
                 class="input mt-2" />
        </div>

        <!-- 6. Previsão no PCA -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">6. Previsão no PCA</h2>
          <div class="flex space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.previsaoPCA" value="sim" class="form-radio" />
              <span class="ml-2">Sim</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.previsaoPCA" value="nao" class="form-radio" />
              <span class="ml-2">Não, precisa incluir</span>
            </label>
          </div>
          <input v-if="form.previsaoPCA === 'sim'" 
                 type="text" 
                 v-model="form.descricaoPCA" 
                 placeholder="Descrição" 
                 class="input mt-2" />
        </div>

        <!-- 7. Estimativa de valor -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">7. Estimativa de valor</h2>
          <input 
            type="text" 
            :value="formatCurrency(form.estimativaValor)"
            @input="formatarEstimativaValor"
            class="input" 
            placeholder="R$ 0,00"
          />
        </div>

        <!-- 8. Prazo de entrega -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">8. Prazo de entrega/execução</h2>
          <input type="text" v-model="form.prazoEntrega" class="input" />
        </div>

        <!-- 9. Recursos orçamentários -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">9. Recursos orçamentários</h2>
          <p class="text-sm text-gray-600 mb-4">
            9.1 Os recursos necessários para a contratação da empresa serão previstos no orçamento do ano vigente, 
            na dotação orçamentária específica da Câmara de Vereadores de Canelinha-SC, na seguinte rubrica:
          </p>
          <div class="grid grid-cols-1 gap-4">
            <div class="flex items-start gap-4">
              <div class="w-32">
                <label class="block text-sm font-medium text-gray-700 mb-1">Órgão</label>
                <input 
                  type="text" 
                  v-model="form.recursosOrgaoNumero" 
                  class="input" 
                  placeholder="Número"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input 
                  type="text" 
                  v-model="form.recursosOrgaoNome" 
                  class="input" 
                  placeholder="Nome do órgão"
                />
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-32">
                <label class="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                <input 
                  type="text" 
                  v-model="form.recursosUnidadeNumero" 
                  class="input" 
                  placeholder="Número"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input 
                  type="text" 
                  v-model="form.recursosUnidadeNome" 
                  class="input" 
                  placeholder="Nome da unidade"
                />
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-32">
                <label class="block text-sm font-medium text-gray-700 mb-1">Natureza</label>
                <input 
                  type="text" 
                  v-model="form.recursosNaturezaNumero" 
                  class="input" 
                  placeholder="Código"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input 
                  type="text" 
                  v-model="form.recursosNaturezaNome" 
                  class="input" 
                  placeholder="Descrição da natureza"
                />
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-32">
                <label class="block text-sm font-medium text-gray-700 mb-1">Fonte</label>
                <input 
                  type="text" 
                  v-model="form.recursosFonteNumero" 
                  class="input" 
                  placeholder="Código"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input 
                  type="text" 
                  v-model="form.recursosFonteNome" 
                  class="input" 
                  placeholder="Descrição da fonte"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 10. Local e horário -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">10. Local e horário da entrega/execução</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Rua</label>
              <input type="text" v-model="form.localRua" class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Número</label>
              <input type="text" v-model="form.localNumero" class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Bairro</label>
              <input type="text" v-model="form.localBairro" class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Cidade</label>
              <input type="text" v-model="form.localCidade" class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Estado</label>
              <input type="text" v-model="form.localEstado" class="input" maxlength="2" />
            </div>
          </div>
        </div>

        <!-- 11. Vinculação -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">11. Vinculado ou dependente da contratação de outro DFD</h2>
          <input type="text" v-model="form.vinculacao" class="input" />
        </div>

        <!-- 12. Fiscal do contrato e informações finais -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">12. Indicação do fiscal do contrato</h2>
          <input type="text" v-model="form.fiscalContrato" class="input mb-4" />
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Data</label>
              <input 
                type="date" 
                v-model="form.dataAtual" 
                class="input" 
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Presidente do Legislativo</label>
              <input type="text" v-model="form.presidenteLegislativo" class="input" />
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" class="btn btn-secondary" @click="resetForm">Limpar</button>
          <button type="submit" class="btn btn-primary">Salvar DFD</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useDfdStore } from '../../stores/dfd'

const dfdStore = useDfdStore()

const form = ref({
  dfdNumero: '',
  dfdAno: new Date().getFullYear(),
  orgao: 'Câmara de Vereadores de Canelinha',
  setorRequisitante: '',
  responsavel: '',
  matricula: '',
  email: '',
  telefone: '',
  objeto: '',
  justificativa: '',
  items: [
    {
      descricao: '',
      quantidade: 1,
      medida: 'Mês',
      valorMes: 0
    }
  ],
  prioridade: 'Alto',
  analiseRiscos: 'nao',
  justificativaRiscos: '',
  previsaoPCA: 'nao',
  descricaoPCA: '',
  estimativaValor: 0,
  prazoEntrega: '',
  recursosOrgaoNumero: '',
  recursosOrgaoNome: '',
  recursosUnidadeNumero: '',
  recursosUnidadeNome: '',
  recursosNaturezaNumero: '',
  recursosNaturezaNome: '',
  recursosFonteNumero: '',
  recursosFonteNome: '',
  localRua: '',
  localNumero: '',
  localBairro: '',
  localCidade: '',
  localEstado: '',
  vinculacao: '',
  fiscalContrato: '',
  dataAtual: '',
  presidenteLegislativo: ''
})

const valorTotalCalculado = computed(() => {
  const total = form.value.items.reduce((acc, item) => acc + item.quantidade * item.valorMes, 0)
  return total
})

const formatCurrency = (value: number): string => {
  if (isNaN(value)) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// Função para formatar valor monetário no input
const formatarValorMes = (e: Event) => {
  const input = e.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  
  // Converte para número decimal (centavos)
  const valorNumerico = Number(value) / 100
  
  // Atualiza o modelo com o valor numérico
  form.value.estimativaValor = valorNumerico
  
  // Formata para exibição
  input.value = formatCurrency(valorNumerico)
}

// Função para formatar valor monetário no input para item
const formatarValorMesForItem = (e: Event, index: number) => {
  const input = e.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  
  // Converte para número decimal (centavos)
  const valorNumerico = Number(value) / 100
  
  // Atualiza o modelo com o valor numérico
  form.value.items[index].valorMes = valorNumerico
  
  // Formata para exibição
  input.value = formatCurrency(valorNumerico)
}

// Função para calcular valor total de um item
const calcularValorTotalItem = (item: any) => {
  return item.quantidade * item.valorMes
}

// Função para formatar estimativa de valor
const formatarEstimativaValor = (e: Event) => {
  const input = e.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  
  // Converte para número decimal (centavos)
  const valorNumerico = Number(value) / 100
  
  // Atualiza o modelo com o valor numérico
  form.value.estimativaValor = valorNumerico
  
  // Formata para exibição
  input.value = formatCurrency(valorNumerico)
}

const generatePDF = () => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const margin = 20

  // Configuração da fonte
  doc.setFont('helvetica')
  doc.setFontSize(12)

  // Cabeçalho
  doc.setFontSize(16)
  doc.text('ESTADO DE SANTA CATARINA', pageWidth / 2, 20, { align: 'center' })
  doc.text('CÂMARA MUNICIPAL DE VEREADORES DE CANELINHA', pageWidth / 2, 28, { align: 'center' })
  doc.setFontSize(10)
  doc.text('Rua Manoel Francisco Correa, nº 417 – caixa postal 02', pageWidth / 2, 34, { align: 'center' })
  doc.text('88230-000 – Canelinha – SC – CNPJ: 00.525.967/0001-97', pageWidth / 2, 40, { align: 'center' })

  // Título do documento
  doc.setFontSize(14)
  doc.text('DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA', pageWidth / 2, 50, { align: 'center' })
  doc.setFontSize(12)
  
  // Número do DFD
  const dfdFormatado = `DFD Nº ${form.value.dfdNumero}/${form.value.dfdAno}`
  doc.text(dfdFormatado, margin, 60)

  // Informações iniciais
  let y = 70
  doc.text(`Órgão: ${form.value.orgao}`, margin, y)
  y += 8
  doc.text(`Setor requisitante: ${form.value.setorRequisitante}`, margin, y)
  y += 8
  doc.text(`Responsável pela Demanda: ${form.value.responsavel}`, margin, y)
  y += 8
  doc.text(`Matrícula: ${form.value.matricula}`, margin, y)
  y += 8
  doc.text(`E-mail: ${form.value.email}`, margin, y)
  y += 8
  doc.text(`Telefone: ${form.value.telefone}`, margin, y)
  y += 12

  // 1. Objeto
  doc.text('1. Objeto:', margin, y)
  y += 8
  const objetoLines = doc.splitTextToSize(form.value.objeto, pageWidth - 2 * margin)
  doc.text(objetoLines, margin, y)
  y += objetoLines.length * 6 + 8

  // 2. Justificativa
  doc.text('2. Justificativa da necessidade da contratação:', margin, y)
  y += 8
  const justificativaLines = doc.splitTextToSize(form.value.justificativa, pageWidth - 2 * margin)
  doc.text(justificativaLines, margin, y)
  y += justificativaLines.length * 6 + 8

  // 3. Descrições e quantidades
  doc.text('3. Descrições e quantidades:', margin, y)
  y += 8
  
  // Tabela de descrições
  const tableData = form.value.items.map(item => [
    { content: item.descricao, styles: { cellWidth: 'auto' } },
    { content: item.quantidade.toString(), styles: { halign: 'center' } },
    { content: item.medida, styles: { halign: 'center' } },
    { content: formatCurrency(Number(item.valorMes)), styles: { halign: 'right' } },
    { content: formatCurrency(calcularValorTotalItem(item)), styles: { halign: 'right' } }
  ])

  doc.autoTable({
    startY: y,
    head: [['Descrição', 'Quant.', 'Medida', 'Valor Mês', 'Valor Total']],
    body: tableData,
    margin: { left: margin, right: margin },
    theme: 'grid',
    headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 30, halign: 'center' },
      3: { cellWidth: 40, halign: 'right' },
      4: { cellWidth: 40, halign: 'right' }
    }
  })
  y = (doc as any).lastAutoTable.finalY + 10

  // 4. Grau de prioridade
  doc.text('4. Grau de prioridade da compra:', margin, y)
  y += 6
  doc.text(form.value.prioridade, margin + 10, y)
  y += 12

  // 5. Análise de riscos
  doc.text('5. Necessita de análise de riscos:', margin, y)
  y += 6
  doc.text(form.value.analiseRiscos.toUpperCase(), margin + 10, y)
  if (form.value.analiseRiscos === 'nao' && form.value.justificativaRiscos) {
    y += 8
    const justRiscosLines = doc.splitTextToSize(`Justificativa: ${form.value.justificativaRiscos}`, pageWidth - 2 * margin)
    doc.text(justRiscosLines, margin + 10, y)
    y += justRiscosLines.length * 6
  }
  y += 12

  // 6. Previsão no PCA
  doc.text('6. Previsão no PCA:', margin, y)
  y += 6
  doc.text(form.value.previsaoPCA === 'sim' ? 'SIM' : 'NÃO, precisa incluir', margin + 10, y)
  if (form.value.previsaoPCA === 'sim' && form.value.descricaoPCA) {
    y += 8
    const descPCALines = doc.splitTextToSize(`Descrição: ${form.value.descricaoPCA}`, pageWidth - 2 * margin)
    doc.text(descPCALines, margin + 10, y)
    y += descPCALines.length * 6
  }
  y += 12

  // 7. Estimativa de valor
  doc.text('7. Estimativa de valor:', margin, y)
  y += 6
  doc.text(formatCurrency(Number(form.value.estimativaValor)), margin + 10, y)
  y += 12

  // 8. Prazo de entrega
  doc.text('8. Prazo de entrega/execução:', margin, y)
  y += 6
  const prazoLines = doc.splitTextToSize(form.value.prazoEntrega, pageWidth - 2 * margin)
  doc.text(prazoLines, margin + 10, y)
  y += prazoLines.length * 6 + 12

  // 9. Recursos orçamentários
  doc.text('9. Recursos orçamentários:', margin, y)
  y += 8
  doc.text('9.1 Os recursos necessários para a contratação da empresa serão previstos no', margin, y)
  y += 6
  doc.text('orçamento do ano vigente, na dotação orçamentária específica da Câmara de', margin, y)
  y += 6
  doc.text('Vereadores de Canelinha-SC, na seguinte rubrica:', margin, y)
  y += 8
  
  // Tabela de recursos orçamentários
  const recursosData = [
    [`Órgão: ${form.value.recursosOrgaoNumero} - ${form.value.recursosOrgaoNome}`],
    [`Unidade: ${form.value.recursosUnidadeNumero} - ${form.value.recursosUnidadeNome}`],
    [`Natureza: ${form.value.recursosNaturezaNumero} - ${form.value.recursosNaturezaNome}`],
    [`Fonte: ${form.value.recursosFonteNumero} - ${form.value.recursosFonteNome}`]
  ]
  
  doc.autoTable({
    startY: y,
    body: recursosData,
    margin: { left: margin + 10, right: margin },
    theme: 'plain',
    styles: { cellPadding: 2 }
  })
  y = (doc as any).lastAutoTable.finalY + 10

  // 10. Local e horário
  doc.text('10. Local e horário da entrega/execução:', margin, y)
  y += 8
  
  // Endereço completo
  const endereco = [
    `Rua: ${form.value.localRua}`,
    `Número: ${form.value.localNumero}`,
    `Bairro: ${form.value.localBairro}`,
    `Cidade: ${form.value.localCidade}`,
    `Estado: ${form.value.localEstado}`
  ]
  
  endereco.forEach(linha => {
    doc.text(linha, margin + 10, y)
    y += 6
  })
  y += 8

  // 11. Vinculação
  doc.text('11. Vinculado ou dependente da contratação de outro DFD:', margin, y)
  y += 6
  const vinculacaoText = form.value.vinculacao || 'Não'
  const vinculacaoLines = doc.splitTextToSize(vinculacaoText, pageWidth - 2 * margin)
  doc.text(vinculacaoLines, margin + 10, y)
  y += vinculacaoLines.length * 6 + 12

  // 12. Fiscal do contrato
  doc.text('12. Indicação do fiscal do contrato:', margin, y)
  y += 6
  const fiscalLines = doc.splitTextToSize(form.value.fiscalContrato, pageWidth - 2 * margin)
  doc.text(fiscalLines, margin + 10, y)
  y += fiscalLines.length * 6 + 12

  // Informações finais
  doc.text(`Canelinha, ${form.value.dataAtual}`, margin, y)
  y += 20

  // Assinaturas
  const assinaturaWidth = (pageWidth - 2 * margin) / 2
  doc.line(margin, y, margin + assinaturaWidth - 20, y)
  doc.line(margin + assinaturaWidth + 20, y, pageWidth - margin, y)
  y += 4
  
  doc.text('Responsável pela Demanda', margin, y, { align: 'left' })
  doc.text('Presidente do Legislativo', pageWidth - margin, y, { align: 'right' })
  y += 6
  doc.text(form.value.responsavel, margin, y, { align: 'left' })
  doc.text(form.value.presidenteLegislativo, pageWidth - margin, y, { align: 'right' })

  // Salvar o PDF
  doc.save(`DFD_${form.value.dfdNumero}_${form.value.dfdAno}.pdf`)
}

const submitForm = () => {
  // Save DFD details to store before generating PDF
  dfdStore.setDfdDetails(form.value.dfdNumero, form.value.dfdAno)
  
  // Existing PDF generation logic
  generatePDF()
}

const resetForm = () => {
  // Resetar todos os campos do formulário
  Object.keys(form.value).forEach(key => {
    if (key !== 'orgao') { // Mantém o órgão preenchido
      form.value[key] = ''
    }
  })
  form.value.quantidade = 1
  form.value.prioridade = 'Alto'
  form.value.analiseRiscos = 'nao'
  form.value.previsaoPCA = 'nao'
  form.value.items = [
    {
      descricao: '',
      quantidade: 1,
      medida: 'Mês',
      valorMes: 0
    }
  ]
}

const anos = Array.from({length: 6}, (_, i) => new Date().getFullYear() + i)

const addItem = () => {
  form.value.items.push({
    descricao: '',
    quantidade: 1,
    medida: 'Mês',
    valorMes: 0
  })
}

const removeItem = (index: number) => {
  form.value.items.splice(index, 1)
}

const formatarTelefone = (e: any) => {
  const telefone = e.target.value.replace(/\D/g, '')
  const partes = []
  for (let i = 0; i < telefone.length; i++) {
    if (i === 0) {
      partes.push(`(${telefone[i]}`)
    } else if (i === 2) {
      partes.push(`${telefone[i]})`)
    } else if (i === 7) {
      partes.push(`-${telefone[i]}`)
    } else {
      partes.push(telefone[i])
    }
  }
  form.value.telefone = partes.join('')
}
</script>

<style scoped>
.form-radio {
  @apply h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500;
}
</style>
