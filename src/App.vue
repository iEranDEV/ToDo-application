<template>
	<div class="row p-0" id="main">
		<div class="col-lg-2 bg-dark m-0 text-light p-4">
			<SideNavigation></SideNavigation>
		</div>
		<div class="col-12 col-lg-10 m-0 bg-gray text-light p-4">
			<router-view @openTaskCreationModal="openTaskCreationModal"></router-view>

			<!-- Task creation modal -->
			<MDBModal id="taskModal" tabindex="-1" labelledby="taskModalLabel" v-model="taskModal" centered size="lg">
				<MDBModalHeader class="bg-dark" closeWhite style="border: none !important;">
					<MDBModalTitle id="taskModalLabel"> Tworzenie nowego zadania</MDBModalTitle>
				</MDBModalHeader>
				<MDBModalBody class="bg-dark ps-5 pe-5">
					<MDBInput white class="rounded" label="Nazwa zadania" v-model="taskData.name"></MDBInput>
					<MDBTextarea white class="rounded mt-3 mb-3" label="Opis zadania" rows="3" v-model="taskData.description" />
					<div class="row">
						<div class="col-12 col-md-6 p-3">
							<MDBSelect id="taskCreationSelect" class="text-light" :options="taskCategoryOptions" :selected="taskData.categoryID" label="Wybierz kategorię" clearButton />
						</div>
						<div class="col-12 col-md-6 p-3">
							<MDBDatepicker inline label="Wybierz datę zadania" inputToggle :toggleButton="false" v-model="taskData.date" format="DD.MM.YYYY" />
						</div>
					</div>
					<MDBCheckbox label="Oznaczyć jako ważne?" v-model="taskData.important" />
				</MDBModalBody>
				<MDBModalFooter class="bg-dark d-flex justify-content-between" style="border: none !important;">
					<MDBBtn color="danger" @click="taskModal = false">Anuluj</MDBBtn>
					<MDBBtn color="success" @click="createTask()">Utwórz</MDBBtn>
				</MDBModalFooter>
			</MDBModal>

		</div>
	</div>
</template>

<script>
import SideNavigation from './components/sidenav/SideNavigation.vue'
import { MDBInput, MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn, MDBTextarea, MDBCheckbox, MDBSelect, MDBDatepicker } from 'mdb-vue-ui-kit';
import { useStore } from './store.js'
import { ref } from 'vue';

export default {
	name: 'App',
	setup() {
		const store = useStore();
		store.syncWithLocalStorage();

		const taskModal = ref(false);
		
		let optionsList = [];
		for(let category of store.getCategories) {
			optionsList.push({
				text: category.name,
				value: category.id
			})
		}
		const taskCategoryOptions = ref(optionsList);
		
		const taskData = ref({
			name: '',
			description: '',
			categoryID: 0,
			date: null,
			important: false
		})

		return {
			taskModal,
			taskCategoryOptions,
			taskData,
			store
		}

	},
	components: {
		SideNavigation,
		MDBInput,
		MDBModal,
		MDBModalHeader,
		MDBModalTitle,
		MDBModalBody,
		MDBModalFooter,
		MDBBtn,
		MDBTextarea,
		MDBCheckbox,
		MDBSelect,
		MDBDatepicker,
	},
	methods: {
		openTaskCreationModal() {
			this.taskModal = true;
		},
		createTask() {
			this.store.createTask(this.taskData.name, this.taskData.description, this.taskData.date, this.taskData.categoryID, this.taskData.important)
			this.taskData = ref({
				name: '',
				description: '',
				categoryID: 0,
				date: null,
				important: false
			})
			this.taskModal = false;
		}
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
	font-family: 'Poppins', sans-serif;
}

#app {
	font-family: Roboto, Helvetica, Arial, sans-serif;
	min-height: 100vh;
	overflow-x: hidden;
}

#main {
	min-height: 100vh;
}

.bg-gray {
	background-color: #212121;
}

.text-main {
	color: #2ebfa7;
}

@media only screen and (min-width: 992px) {
    .tasksSection {
        min-height: 75vh;
        max-height: 75vh;
        overflow: auto;
    }
}

::-webkit-scrollbar {
	width: 10px;
}

::-webkit-scrollbar-track {
	background-color: #262626;
}

::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.taskElement:hover {
	background-color: #424242 !important;
	cursor: pointer;
}

</style>
