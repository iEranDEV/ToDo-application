<template>
    <div :id="'TASKCOMP_'+task.id" v-if="data" class="rounded p-3 mb-3 taskElement d-flex justify-content-between align-items-center" style="background-color: #292929;" @contextmenu="contextHandler($event)">
        <div class="d-flex w-75">
            <div class="d-flex align-items-center">
                <i v-if="data.done" class="fas fa-check-circle fs-5 text-success" @click="changeDoneStatus"></i>
                <i v-else class="far fa-check-circle fs-5 text-muted" @click="changeDoneStatus"></i>
            </div>
            <div class="d-flex flex-column justify-content-around ms-3">
                <span>{{ data.name }}</span>
                <span class="text-muted text-truncate">{{ data.description }}</span>
            </div>
        </div>
        <div class="d-flex w-25 align-items-center justify-content-end">
            <i v-if="data.important" class="fas fa-star fs-5 text-warning" @click="changeImportantStatus"></i>
            <i v-else class="far fa-star fs-5 text-warning" @click="changeImportantStatus"></i>
        </div>
        <context-menu ref="menu" taskBool>
            <div class="context-menu-item">
                <i class="far fa-check-circle me-3"></i>
                <span>Oznacz jako ukończone</span>
            </div>
            <div class="context-menu-item">
                <i class="far fa-star me-3"></i>
                <span>Oznacz jako ważne</span>
            </div>
            <hr>
            <div class="context-menu-item">
                <i class="far fa-edit me-3"></i>
                <span>Edytuj szczegóły zadania</span>
            </div>
            <div class="context-menu-item" style="color: #E57373;" @click="deleteTask()">
                <i class="far fa-trash-alt me-3"></i>
                <span>Usuń zadanie</span>
            </div>
        </context-menu>
    </div>
</template>

<script>
import ContextMenu from '@/components/general/ContextMenu.vue'
import { useStore } from '@/store.js';

export default {
    setup() {
        const store = useStore();

        return {
            store,
        }
    },
    props: {
        task: Object,
    },
    data() {
        return {
            data: null,
        }
    },
    mounted() {
        this.data = this.task;
    },
    methods: {
        contextHandler(e) {
            e.preventDefault();
            this.$refs.menu.open(e);
        },
        changeDoneStatus() {
            this.data.done = !this.data.done;
            this.store.updateTask(this.data.id, this.data);
        },
        changeImportantStatus() {
            this.data.important = !this.data.important;
            this.store.updateTask(this.data.id, this.data);
        },
        deleteTask() {
            this.store.deleteTask(this.task.id);
        }
    },
    components: {
        ContextMenu,
    }
}
</script>

<style scoped>

</style>