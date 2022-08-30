import { defineStore } from 'pinia';
import Category from './entities/Category';
import Task from './entities/Task';

export const useStore = defineStore('store', {

    // State values
    state: () => ({
        tasks: [],
        categories: [],
        nextTaskID: 1,
        nextCategoryID: 1,
    }),

    // Getters
    getters: {

        // Getting all tasks
        getTasks: (state) => state.tasks,
        
        // Getting all categories
        getCategories: (state) => state.categories,

        // Getting category by ID
        getCategoryByID: (state) => {
            return (categoryID) => state.categories.find((category) => category.id == categoryID)
        },

        // Getting tasks by category ID
        getTasksByCategoryID: (state) => {
            return (categoryID) => state.tasks.filter((task) => task.categoryID == categoryID)
        },

        // Getting important tasks
        getImportantTasks: (state) => state.tasks.filter((task) => task.important),

        // Getting completed tasks
        getDoneTasks: (state) => state.tasks.filter((task) => task.done),

        // Getting todays tasks
        getTodayTasks: (state) => {
            let data = new Date().toLocaleDateString();
            return state.tasks.filter((task) => task.date == data);
        }

    },

    // Methods
    actions: {

        // Get values from local saved data every app refresh
        syncWithLocalStorage() {
            console.log('syncing with local storage...');
            if(localStorage.getItem('categories')) {
                this.categories = JSON.parse(localStorage.getItem('categories'));
            }
            if(localStorage.getItem('tasks')) {
                this.tasks = JSON.parse(localStorage.getItem('tasks'));
            }
            if(localStorage.getItem('nextTaskID')) {
                this.nextTaskID = JSON.parse(localStorage.getItem('nextTaskID'));
            }
            if(localStorage.getItem('nextCategoryID')) {
                this.nextCategoryID = JSON.parse(localStorage.getItem('nextCategoryID'));
            }
        },

        // Saving new category
        createCategory(name) {
            this.categories.push(new Category(name, this.nextCategoryID));
            this.nextCategoryID++;
            localStorage.setItem('categories', JSON.stringify(this.categories));
            localStorage.setItem('nextCategoryID', JSON.stringify(this.nextCategoryID));
        },

        // Saving new task
        createTask(name, description, date, categoryID, important) {
            this.tasks.push(new Task(this.nextTaskID, name, description, date, categoryID, important));
            this.nextTaskID++;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('nextTaskID', JSON.stringify(this.nextTaskID));
        },

        // Update task by ID
        updateTask(id, data) {
            let index = this.tasks.findIndex(task => {
                return task.id == id;
            })
            if(index != -1) {
                this.tasks[index] = data;
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        },

        // Deleting category from list
        deleteCategory(id) {
            let index = this.categories.findIndex(category => {
                return category.id == id;
            })
            if(index != -1) {
                this.categories.splice(index, 1);
                localStorage.setItem('categories', JSON.stringify(this.categories));
            }
        },

        // Deleting task from list
        deleteTask(id) {
            let index = this.tasks.findIndex(task => {
                return task.id == id;
            })
            if(index != -1) {
                this.tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        },

        // Change category name
        changeCategoryName(id, newName) {
            let index = this.categories.findIndex(category => {
                return category.id == id;
            })
            this.categories[index].name = newName;
            localStorage.setItem('categories', JSON.stringify(this.categories));
        }
    }

})