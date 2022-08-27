<template>
    <div class="context-menu shadow rounded border" :style="style">
        <slot></slot>
    </div>
</template>

<script>

export default {
    props: {
        text: String,
        taskBool: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            style: {
                display: 'none',
                top: 0,
                left: 0,
            }
        }
    },
    methods: {
        open(e) {
            // console.log(e)
            this.style.top = e.pageY + 'px';
            this.style.left = e.pageX + 'px';
            this.style.display = 'block';

            document.addEventListener('click', (e) => {
                this.disable();
                e.preventDefault();
            })
            document.addEventListener('contextmenu', (e) => {
                if(!this.taskBool && this.style.display != 'none') {
                    if(e.target.innerText != this.text) {
                        this.disable();
                        e.preventDefault();
                    }
                }
            })
        },
        disable() {
            this.style.display = 'none';
        }
    }
}
</script>

<style>

.context-menu {
    background-color: #424242;
    position: fixed;
    z-index: 999999;
}

.context-menu-item {
    font-size: 0.8rem;
    cursor: pointer;
    padding: 10px;
}

.context-menu-item:hover {
    background-color: #212121;
}

</style>