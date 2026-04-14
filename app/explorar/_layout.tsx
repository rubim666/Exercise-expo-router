import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { CustomDrawerContent } from '../../components/CustomDrawerComponents';
import { COLORS } from '@/constants';
import { useTheme } from '@/app/contexts/ThemeContext';

const ExplorarLayout = () => {
    const { colors } = useTheme();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
                    drawerStyle: { 
                        width: 260,
                        backgroundColor: 'transparent',
                     },
                            drawerActiveTintColor: colors.white,
                            drawerInactiveTintColor: colors.white,
                     headerStyle: { backgroundColor: colors.primary },
                            headerTintColor: colors.white,
                     headerTitleStyle: { fontWeight: 'bold' },
                     drawerLabelStyle: { 
                        fontSize: 16,
                        color: colors.text,
                      }
            }}>
                <Drawer.Screen
                    name="perfil"
                    options={{ 
                        title: 'Perfil',
                        drawerLabel: 'Perfil',
                        drawerIcon: () => null,
                     }}

                />

                <Drawer.Screen
                    name="conquistas"
                    options={{ 
                        title: 'Conquistas',
                        drawerLabel: 'Conquistas',
                        drawerIcon: () => null,
                     }}
                />

                <Drawer.Screen
                    name="historico"
                    options={{ 
                        title: 'Histórico',
                        drawerLabel: 'Histórico',
                        drawerIcon: () => null,
                     }}
                />

                <Drawer.Screen
                    name="sair"
                    options={{ 
                        title: 'Sair',
                        drawerLabel: 'Sair',
                        drawerIcon: () => null,
                     }}
                />

                <Drawer.Screen
                    name="favoritos"
                    options={{
                        title: 'Favoritos',
                        drawerLabel: 'Favoritos',
                        drawerIcon: () => null,
                        drawerItemStyle: { display: 'none' },
                    }}
                />
                
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default ExplorarLayout