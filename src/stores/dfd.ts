import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDfdStore = defineStore('dfd', () => {
  const dfdNumero = ref('')
  const dfdAno = ref(new Date().getFullYear())

  function setDfdDetails(numero: string, ano: number) {
    dfdNumero.value = numero
    dfdAno.value = ano
  }

  function clearDfdDetails() {
    dfdNumero.value = ''
    dfdAno.value = new Date().getFullYear()
  }

  return { 
    dfdNumero, 
    dfdAno, 
    setDfdDetails, 
    clearDfdDetails 
  }
})
