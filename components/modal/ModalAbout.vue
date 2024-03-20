<script setup lang="ts">
const isOpen = ref(false)

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

const content = [
  { text: 'Inspired from', url: 'https://krzysckh.org/prog/bitart.html' },
  { text: 'Written for blog post', url: 'https://jeffreyturns.me/blog/pattern-art-in-math' },
  { text: 'Source code', url: 'https://github.com/jeffreyturns/patrn' }
]
</script>

<template>
  <UButton
    variant="solid"
    size="lg"
    color="gray"
    icon="i-heroicons-information-circle"
    @click="toggleModal" />

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <span class="text-lg font-bold">Patrn 1.0</span>
      </template>

      <div v-for="(link, index) in content" :key="index">
        <span>{{ `${link.text}: ` }}</span>
        <a :href="link.url" target="_blank" class="dark:text-primary-300 text-primary-500 underline">{{ link.url }}</a>
      </div>

      <template #footer>
        <div class="flex w-full items-end justify-end">
          <UButton label="Close" size="md" @click="toggleModal" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
