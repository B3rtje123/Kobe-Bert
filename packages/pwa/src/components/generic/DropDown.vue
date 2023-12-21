<template>
    <div class="p-4 cursor-pointer w-52 my-auto " ref="dropDown">
        <button class="p-4 w-full border border-[#313131] rounded-lg box-border mb-1" @click="isDropDownVisible = !isDropDownVisible">
            {{ selectedOption || 'Please select a function' }}
        </button>

        <transition name="slide-fade">
            <div 
                class="flex flex-col w-full"
                v-if="isDropDownVisible"
            >
                <button 
                    class="hover:bg-[#c5c5c5] p-4 border border-[#313131] box-border last-of-type:rounded-b-lg"
                    v-for="(option, index) in props.options"
                    :key="index"
                    @click="toggleOptionSelect(option)"
                >
                    {{ option }}
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import { computed, defineProps, ref, defineEmits, onMounted, onBeforeUnmount } from 'vue';

    const props = defineProps({
        options: {
            type: Array,
            required: true
        },
        modelValue: {
            default: null
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const selectedOption = ref(null)

    const isDropDownVisible = ref(false)
    const dropDown = ref(null)

    const mappedSelectedOption = computed(() => {
        return (selectedOption.value)
    })

    const toggleOptionSelect = (option : any) => {
        selectedOption.value = option
        emit('update:modelValue', option )
        isDropDownVisible.value = false
    }

    const closeDropDown = (element : any) => {
        if(!dropDown.value.contains(element.target)){
            isDropDownVisible.value = false
        }
        
    }

    onMounted(() => {
        window.addEventListener('click', closeDropDown)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('click', closeDropDown)
    })
</script>

<style>
    .slide-fade-enter-active {
        transition: all 0.2s ease-in-out;
    }
    .slide-fade-leave-active {
        transition: all 0.1s ease-in-out;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(-4px);
        opacity: 0;
    }
</style>