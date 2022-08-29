<template>
    <div class="h-100 d-flex flex-column justify-content-between" style="height: 100vh;">
        <div>
            <div class="w-100">
                <!-- Application logo -->
                <div class="d-flex  align-items-center justify-content-center mb-4">
                    <img src="@/assets/logo.png" alt="ToDo application" class="rounded" style="height: 40px;">
                    <span class="ms-3 fs-5 text-main">To Do app</span>

                </div>

                <!-- Search input -->
                <div class="d-none d-xl-block p-1">
                    <MDBInput white inputGroup class="rounded" v-model="input" aria-describedby="search-icon" label="Wyszukaj"  >
                        <span class="input-group-text border-0 text-light" id="search-icon"><i class="fas fa-search"></i></span>
                    </MDBInput>
                </div>
                <hr>

                <!-- Main pages section -->
                <SidenavButton name="Mój dzień" :selected="$route.name == 'MainPage'" toPage="/">
                    <i class="far fa-calendar me-3 fs-6" style="color: #66BB6A;"></i>
                </SidenavButton>
                <SidenavButton name="Ważne" :selected="$route.name == 'ImportantTasksPage'" toPage="/important">
                    <i class="far fa-star me-3 fs-6 text-warning"></i>
                </SidenavButton>
                <SidenavButton name="Ukończone" :selected="$route.name == 'DoneTasksPage'" toPage="/done">
                    <i class="far fa-check-circle me-3 fs-6" style="color: #E57373;"></i>
                </SidenavButton>
                <SidenavButton name="Wszystkie" :selected="$route.name == 'AllTasksPage'" toPage="/all">
                    <i class="far fa-bookmark me-3 fs-6 text-info"></i>
                </SidenavButton>
                <hr>
            </div>

            <!-- User categories -->
            <div style="height: 180px;" class="overflow-auto">
                <SidenavButton v-for="category in store.getCategories" :key="category.name" :name="category.name" :category="category" :toPage="'/category/' + category.id" :selected="$route.name == 'CategoryPage' && $route.params.id == category.id">
                    <i class="far fa-flag me-3 fs-6 text-light"></i>
                </SidenavButton>
            </div>
        </div>

        <div class="d-flex align-items-end">
            <button class="btn btn-dark w-100 d-flex justify-content-xl-between align-items-center shadow-0" @click="categoryModal = true" aria-controls="categoryModal">
                <i class="fas fa-plus text-start me-3 me-xl-0"></i>
                <span>Dodaj nową kategorie</span>
            </button>

            <!-- Category creation modal -->
            <MDBModal id="categoryModal" tabindex="-1" labelledby="categoryModalLabel" v-model="categoryModal" centered>
                <MDBModalHeader class="bg-dark" closeWhite style="border: none !important;">
                    <MDBModalTitle id="categoryModalLabel"> Tworzenie nowej kategorii </MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody class="bg-dark ps-5 pe-5 d-flex">

                    <MDBInput white inputGroup class="rounded" aria-describedby="search-icon" label="Nazwa" v-model="categoryName"></MDBInput>

                </MDBModalBody>
                <MDBModalFooter class="bg-dark d-flex justify-content-between" style="border: none !important;">
                    <MDBBtn color="danger" @click="categoryModal = false">Anuluj</MDBBtn>
                    <MDBBtn color="success" @click="createCategory()">Utwórz</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </div>

    </div>
</template>

<script>
import SidenavButton from '@/components/sidenav/SidenavButton.vue'
import { MDBInput, MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-vue-ui-kit';
import { ref } from 'vue';
import { useStore } from '@/store.js'

export default {
    setup() {
        const input = ref('');
        const store = useStore();
        const categoryModal = ref(false);

        return {
            input,
            store,
            categoryModal,
        }
    },
    components: {
        MDBInput,
        SidenavButton,
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBBtn,
    },
    data() {
        return {
            categoryName: null,
        }
    },
    methods: {
        createCategory() {
            this.store.createCategory(this.categoryName);
            this.categoryModal = false;
            this.categoryName = null;
        }
    }
}
</script>

<style scoped>


</style>