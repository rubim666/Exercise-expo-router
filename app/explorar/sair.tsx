import { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

export default function Sair() {
    useEffect(() => {
        router.replace('/');
    }, []);

    return <View />;
}
