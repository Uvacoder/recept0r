<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue'

  import ButtonDefault from '@/components/button/ButtonDefault.vue'
  import ButtonX from '@/components/button/ButtonX.vue'

  const props = defineProps<{
    input: string[],
    mode: string
  }>()

  const emit = defineEmits<{
    (e: 'update:ingredients', val?: string[]): void
  }>()

  // create a new array based on the input prop so we don't run into problems with reactivity
  const ingredients = ref(Array.prototype.concat(props.input))
  
  // the Vue 3 way of handling refs based on v-for -- see:
  // https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for
  const inputs: { [el: string]: any } = ref([])

  const addItem = async (index?: number) => {
    let currentEl = null
    let ing = ingredients.value
    let inputEls = inputs.value
    
    if (index !== undefined && index > -1) {
      ing.splice(index + 1, 0, '')
      await nextTick() // await next tick to avoid 'x is undefined...' errors
      currentEl = inputEls[index+1]
    } else {
      ing.push('')
      await nextTick() // await next tick to avoid 'x is undefined...' errors
      currentEl = inputEls[inputEls.length-1]
    }
    // set focus on the added element
    if (currentEl) currentEl.focus()
  }

  const removeItem = (index: number) => {    
    ingredients.value.splice(index, 1)
    inputs.value.splice(index, 1)
    emit('update:ingredients', ingredients.value)
  }

  watch(() => props.input, currentVal => ingredients.value = currentVal)
</script>

<template>
  <div id="recipe-ingredients">
    <ul class="ing-list mb-0">
      <li v-for="(ing, index) in ingredients" :key="index">
        <span class="flex flex-row items-center mb-4">
          <input type="text"
            v-model.trim="ingredients[index]"
            :placeholder="`Ingredient ${index + 1}`"
            :ref="el => { if (el) inputs[index] = el }"
            class="inline-block form-control text-sm"
            @input="$emit('update:ingredients', ingredients)"
            @keydown.enter="addItem(index)"
          >
          <ButtonX size="20" class="rounded-full text-gray-700 hover:text-gray-900 focus:text-gray-900 p-1 ml-2" @click="removeItem(index)" />
        </span>
      </li>
    </ul>
    <ButtonDefault class="block text-sm mx-auto" @click="addItem()">Add Ingredient</ButtonDefault>
  </div>
</template>