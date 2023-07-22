<template>
    <div class="modal-bg">
        <div class="modal">
            <div class="modal-header">
                <h4 class="model-title">{{ title }}</h4>
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
