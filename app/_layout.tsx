import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/index";
import { ThemeProvider, useTheme } from "@/app/contexts/ThemeContext";
import { ThemeSwitcherButton } from "@/components/ThemeSwitcherButton";

function RootNavigator() {
    const { colors } = useTheme();

    return (
        <>
            <Stack
                initialRouteName="index"
                screenOptions={{
                    headerStyle: {backgroundColor: colors.primary},
                    headerTintColor: colors.white,
                    headerTitleStyle: {fontWeight: 'bold'},
                    animation: "slide_from_right",
                    headerShown: false,
                }}
            >

                {/* Root screen */}

                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="abas"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="explorar"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="trilha"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="auth"
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack>
            <StatusBar style="light" />
            <ThemeSwitcherButton />
        </>
    )
}

const RootLayout = () => {
    return (
        <ThemeProvider>
            <RootNavigator />
        </ThemeProvider>
    )
}

export default RootLayout;

