import { Stack } from 'expo-router';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function TrilhaLayout() {
    useTheme();

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}
