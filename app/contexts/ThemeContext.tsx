import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { applyThemeColors, COLOR_THEMES, SHADOWS, DIFFICULTY_COLORS, DIFFICULTY_BADGE_COLORS, type ThemeName, THEME_LABELS } from '@/constants';

type ThemeColors = typeof COLOR_THEMES['emerald'];

interface ThemeContextData {
    themeName: ThemeName;
    colors: ThemeColors;
    shadows: typeof SHADOWS;
    difficultyColors: typeof DIFFICULTY_COLORS;
    difficultyBadgeColors: typeof DIFFICULTY_BADGE_COLORS;
    carregandoTema: boolean;
    drawerAberto: boolean;
    abrirDrawer: () => void;
    fecharDrawer: () => void;
    definirTema: (themeName: ThemeName) => Promise<void>;
    themeLabel: string;
}

const STORAGE_KEY_THEME = '@trailnav:theme';
const THEME_ORDER: ThemeName[] = ['emerald', 'sunset', 'midnight'];

const ThemeContext = createContext<ThemeContextData | null>(null);

export { THEME_ORDER };

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeName, setThemeName] = useState<ThemeName>('emerald');
    const [carregandoTema, setCarregandoTema] = useState(true);
    const [drawerAberto, setDrawerAberto] = useState(false);

    useEffect(() => {
        async function restaurarTema() {
            try {
                const salvo = await AsyncStorage.getItem(STORAGE_KEY_THEME);
                const temaInicial = THEME_ORDER.includes(salvo as ThemeName) ? (salvo as ThemeName) : 'emerald';
                applyThemeColors(temaInicial);
                setThemeName(temaInicial);
            } catch {
                applyThemeColors('emerald');
            } finally {
                setCarregandoTema(false);
            }
        }

        restaurarTema();
    }, []);

    const definirTema = useCallback(async (nextTheme: ThemeName) => {
        applyThemeColors(nextTheme);
        setThemeName(nextTheme);
        await AsyncStorage.setItem(STORAGE_KEY_THEME, nextTheme);
    }, []);

    const abrirDrawer = useCallback(() => setDrawerAberto(true), []);
    const fecharDrawer = useCallback(() => setDrawerAberto(false), []);

    const colors = useMemo(() => ({ ...COLOR_THEMES[themeName] }), [themeName]);
    const shadows = useMemo(() => ({
        card: { ...SHADOWS.card, shadowColor: colors.forest },
        sm: { ...SHADOWS.sm, shadowColor: colors.forest },
    }), [themeName]);
    const difficultyColors = useMemo(() => ({ ...DIFFICULTY_COLORS }), [themeName]);
    const difficultyBadgeColors = useMemo(() => ({ ...DIFFICULTY_BADGE_COLORS }), [themeName]);

    const value = useMemo(() => ({
        themeName,
        colors,
        shadows,
        difficultyColors,
        difficultyBadgeColors,
        carregandoTema,
        drawerAberto,
        abrirDrawer,
        fecharDrawer,
        definirTema,
        themeLabel: THEME_LABELS[themeName],
    }), [carregandoTema, themeName, drawerAberto]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);

    if (!ctx) {
        throw new Error('useTheme deve ser usado dentro de um <ThemeProvider>');
    }

    return ctx;
}