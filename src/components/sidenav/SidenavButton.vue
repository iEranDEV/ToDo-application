<template>
    <div>
        <router-link :to="toPage" class="text-decoration-none text-reset">
            <div class="w-100 d-flex flex-row sidenavButton rounded p-2" @contextmenu="contextHandler($event)" :class="{ selected: selected }">
                <div class="d-flex align-items-center" style="width: 90%; font-size: 0.8rem;">
                    <div class="text-center" style="width: 40px;">
                        <slot></slot>
                    </div>
                    {{ name }}
                </div>
                <div class="text-end" style="width: 10%;">
                    <span v-if="number != 0" class="badge rounded-pill" style="background-color: #2ebfa7;">{{ number }}</span>
                </div>
            </div>
        </router-link>
        <context-menu ref="menu" :text="name">
            <div v-if="category" class="context-menu-item" @click="changeName()">
                <i class="far fa-edit me-3"></i>
                <span>Zmień nazwę listy</span>
            </div>
            <div class="context-menu-item">
                <i class="far fa-file me-3"></i>
                <span>Wydrukuj tę listę</span>
            </div>
            <hr v-if="category">
            <div v-if="category" class="context-menu-item" style="color: #E57373;" @click="deleteCategory()">
                <i class="far fa-trash-alt me-3"></i>
                <span>Usuń listę</span>
            </div>
        </context-menu>
        <MDBModal v-if="category" id="nameChangeModal" tabindex="-1" labelledby="nameChangeModalLabel" v-model="nameChangeModal" centered>
            <MDBModalHeader class="bg-dark" closeWhite style="border: none !important;">
                <MDBModalTitle id="nameChangeModalLabel"> Zmiana nazwy kategorii </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody class="bg-dark ps-5 pe-5 d-flex">
                <MDBInput white inputGroup class="rounded" aria-describedby="search-icon" label="Nazwa" v-model="newName"></MDBInput>
            </MDBModalBody>
            <MDBModalFooter class="bg-dark d-flex justify-content-between" style="border: none !important;">
                <MDBBtn color="danger" @click="nameChangeModal = false">Anuluj</MDBBtn>
                <MDBBtn color="success" @click="submit()">Potwierdź</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    </div>
</template>

<script>
import ContextMenu from '@/components/general/ContextMenu.vue'
import { MDBInput, MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-vue-ui-kit';
import { useStore } from '@/store.js';
import { ref } from 'vue';

export default {
    setup() {
        const store = useStore();

        const nameChangeModal = ref(false);

        return {
            store,
            nameChangeModal,
        }
    },
    data() {
        return {
            newName: ''
        }
    },
    mounted() {
        if(this.category ) {
            this.newName = this.category.name;
        }
    },
    props: {
        name: String,
        number: {
            type: Number,
            required: false,
            default: 0
        },
        category: {
            type: Object,
            default: null
        },
        selected: {
            type: Boolean,
            default: false
        },
        toPage: {
            type: String,
            required: true,
            default: '/'
        }
    },
    methods: {
        contextHandler(e) {
            e.preventDefault();
            this.$refs.menu.open(e);
        },
        changeName() {
            this.nameChangeModal = true;
        },
        deleteCategory() {
            this.store.deleteCategory(this.category.id);
        },
        submit() {
            this.store.changeCategoryName(this.category.id, this.newName);
        }
    },
    components: {
        ContextMenu,
        MDBInput,
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBBtn
    }
}
</script>

<style scoped>

.sidenavButton:hover {
    background-color: #424242;
    cursor: pointer;
}

.selected {
    border-left: 5px solid #2ebfa7;
}

</style>