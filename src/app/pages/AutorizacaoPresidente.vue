<template>
  <div class="max-w-4xl mx-auto space-y-6 p-6">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold mb-2">AUTORIZAÇÃO DO PRESIDENTE</h1>
      <p class="text-gray-600">CÂMARA MUNICIPAL DE VEREADORES DE CANELINHA</p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Número do Documento de Formalização de Demanda</label>
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
          <div>
            <label class="block text-sm font-medium text-gray-700">Data da Autorização</label>
            <input 
              type="date" 
              v-model="form.dataAutorizacao" 
              class="input" 
              required
            />
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Descrição da Autorização</label>
          <textarea 
            v-model="form.descricaoAutorizacao" 
            rows="4" 
            class="input w-full" 
            placeholder="Detalhes adicionais da autorização"
          ></textarea>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Presidente da Câmara</label>
          <input 
            type="text" 
            v-model="form.presidenteNome" 
            class="input w-full" 
            placeholder="Nome completo do Presidente"
            required
          />
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <button 
          type="button" 
          @click="resetForm" 
          class="btn btn-secondary"
        >
          Limpar
        </button>
        <button 
          type="submit" 
          class="btn btn-primary"
        >
          Gerar Autorização
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import jsPDF from 'jspdf'
import { useDfdStore } from '../../stores/dfd'

const dfdStore = useDfdStore()

const form = ref({
  dfdNumero: dfdStore.dfdNumero,
  dfdAno: dfdStore.dfdAno || new Date().getFullYear(),
  dataAutorizacao: new Date().toISOString().split('T')[0],
  descricaoAutorizacao: 'Na condição de responsável pela autorização de despesas, concedo AUTORIZAÇÃO para início de contratação referente ao Documento de Formalização de Demanda. Encaminho a presente ao setor de licitação, para as devidas providências.',
  presidenteNome: 'ELOIR JOÃO REIS'
})

const anos = Array.from({length: 6}, (_, i) => new Date().getFullYear() + i)

const submitForm = () => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const margin = 20

  // Cabeçalho
  doc.setFont('helvetica')
  doc.setFontSize(12)

  // Título do estado e câmara
  doc.setFontSize(10)
  doc.text('ESTADO DE SANTA CATARINA', pageWidth / 2, 30, { align: 'center' })
  doc.text('CÂMARA MUNICIPAL DE VEREADORES DE CANELINHA', pageWidth / 2, 36, { align: 'center' })
  doc.text('Rua Manoel Francisco Correa, nº 417 – caixa postal 02', pageWidth / 2, 42, { align: 'center' })
  doc.text('88230-000 – Canelinha – SC – CNPJ: 00.525.967/0001-97', pageWidth / 2, 48, { align: 'center' })

  // Título do documento
  doc.setFontSize(14)
  doc.text('AUTORIZAÇÃO', pageWidth / 2, 60, { align: 'center' })

  // Conteúdo
  doc.setFontSize(12)
  const descricaoLinhas = doc.splitTextToSize(
    form.value.descricaoAutorizacao.replace('{DFD}', `${form.value.dfdNumero}/${form.value.dfdAno}`), 
    pageWidth - 2 * margin
  )
  
  doc.text(descricaoLinhas, margin, 80)

  // Local e data
  const dataFormatada = new Date(form.value.dataAutorizacao).toLocaleDateString('pt-BR', {
    day: '2-digit', 
    month: 'long', 
    year: 'numeric'
  })
  doc.text(`Canelinha, ${dataFormatada}.`, margin, 120)

  // Assinatura
  doc.line(margin, 160, pageWidth - margin, 160)
  doc.text(form.value.presidenteNome, pageWidth / 2, 170, { align: 'center' })
  doc.text('Presidente da Câmara de Vereadores', pageWidth / 2, 178, { align: 'center' })

  // Salvar PDF
  doc.save(`Autorizacao_${form.value.dfdNumero}_${form.value.dfdAno}.pdf`)
}

const resetForm = () => {
  form.value = {
    dfdNumero: dfdStore.dfdNumero,
    dfdAno: dfdStore.dfdAno || new Date().getFullYear(),
    dataAutorizacao: new Date().toISOString().split('T')[0],
    descricaoAutorizacao: 'Na condição de responsável pela autorização de despesas, concedo AUTORIZAÇÃO para início de contratação referente ao Documento de Formalização de Demanda. Encaminho a presente ao setor de licitação, para as devidas providências.',
    presidenteNome: 'ELOIR JOÃO REIS'
  }
}
</script>

<style scoped>
.card {
  @apply bg-white shadow-md rounded-lg p-6;
}
</style>
