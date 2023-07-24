<script setup>
import { onMounted, reactive } from 'vue';
import { getUserData } from '@/utils/user';

defineProps({
    user: {
        type: Object,
        required: true,
    },
});

const userInfos = reactive({
    id: '',
    email: '',
    username: '',
});

onMounted(async () => {
    const userData = await getUserData();
    userInfos.id = userData.id;
    userInfos.email = userData.email;
});

defineEmits(['delete', 'select']);
</script>

<template>
    <ul>
        <li @click.self="$emit('select', user)">
            {{ userInfos.id }} {{ userInfos.email }}
            <span @click.self="$emit('delete', user)">X</span>
        </li>
    </ul>
</template>
