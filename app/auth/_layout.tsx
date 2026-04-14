import { Stack, router, useSegments } from 'expo-router';
import { use, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth} from "@/app/contexts/AuthContext";
import { StorageProvider } from '../contexts/StorageContext';
import { COLORS } from '@/constants';

function ProtecaoDeRotas({ children }: { children: React.ReactNode }) {
    const { logado, carregando } = useAuth();
    const segmentos = useSegments();
    const naAreaAuth = segmentos[0] === 'auth';

    useEffect(() => {
        if (carregando) return; // ainda carregando, não faz nada

        if (!logado && !naAreaAuth) {
            router.replace('/auth/login');
        }
        else if (logado && naAreaAuth) {
            router.replace('/');
        }
    }, [logado, carregando, naAreaAuth]);

    if (carregando) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return <>{children}</>;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <StorageProvider>
                <ProtecaoDeRotas>
                    <Stack 
                        screenOptions={{
                            headerShown: false,
                            headerStyle: { backgroundColor: COLORS.primary },
                            headerTintColor: COLORS.white,
                            headerTitleStyle: { fontWeight: 'bold' },
                            animation: "slide_from_right",
                        }}
                    >
                        <Stack.Screen name="index" />
                        <Stack.Screen name="abas" />
                        <Stack.Screen name="explorar" />
                        <Stack.Screen name="trilha" />
                        <Stack.Screen name="auth" />
                    </Stack>
                    <StatusBar style="auto" />
                 </ProtecaoDeRotas>
            </StorageProvider>
        </AuthProvider>
    );
}