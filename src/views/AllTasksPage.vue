<template>
    <div class="h-100 w-100 d-flex flex-column justify-content-between">
        <div class="row sticky-top ps-4 pe-4">
            <div class="col text-info">
                <i class="far fa-bookmark me-3 fs-2"></i>
                <span class="fs-2">Wszystkie</span>
            </div>
        </div>
        <div class=" ps-4 pe-4 tasksSection d-flex flex-column overflow-auto">
            <div v-if="store.getTasks.length == 0" class="h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                <i class="far fa-frown-open fs-2 text-muted"></i>
                <span class="text-muted">
                    Nie utworzono żadnych zadań!
                </span>
                <span class="text-muted">
                    Dodaj kilka, aby je tutaj zobaczyć.
                </span>
            </div>
            <div v-else>
                <task-component v-for="task in store.getTasks" :key="task.id" :task="task"></task-component>
            </div>
        </div>
        <div class="row d-flex ps-4 pe-4 mt-3 mt-lg-0">
            <button class="btn btn-dark w-100 p-3 d-flex align-items-center shadow-0 text-info" @click="$emit('openTaskCreationModal')">
                <i class="fas fa-plus fs-6 me-3"></i>
                <span class="fs-6">Dodaj nowe zadanie</span>
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/store.js'
import TaskComponent from '@/components/task/TaskComponent.vue'

export default {
    setup() {
        const store = useStore();

        return {
            store,
        }
    },
    components: {
        TaskComponent,
    }
}
</script>

<style scoped>


</style>