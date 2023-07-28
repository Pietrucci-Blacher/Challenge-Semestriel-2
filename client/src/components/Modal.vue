<template>
    <div class="modal-bg" @click="closeModalOnBackgroundClick">
        <div class="modal" @click.stop>
            <div class="modal-header">
                <h2 class="model-title text-2xl font-semibold text-black">
                    {{ title }}
                </h2>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: 'Modal Title',
        },
    },
    methods: {
        closeModalOnBackgroundClick() {
            // Emit an event to the parent component to close the modal
            this.$emit('closeModal');
        },
    },
};
</script>

<style scoped>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    width: 500px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    margin: 0;
    color: red;
}
</style>
