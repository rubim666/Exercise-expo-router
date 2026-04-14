import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR_THEMES, THEME_LABELS, type ThemeName } from '@/constants';
import { useTheme, THEME_ORDER } from '@/app/contexts/ThemeContext';

function SwatchRow({ themeName: tn }: { themeName: ThemeName }) {
    const t = COLOR_THEMES[tn];
    return (
        <View style={s.swatchRow}>
            {[t.forest, t.primary, t.secondary, t.tertiary, t.accent].map((c, i) => (
                <View key={i} style={[s.swatch, { backgroundColor: c }]} />
            ))}
        </View>
    );
}

export function ThemeSwitcherButton() {
    const insets = useSafeAreaInsets();
    const { colors, shadows, themeName, carregandoTema, drawerAberto, abrirDrawer, fecharDrawer, definirTema } = useTheme();

    if (carregandoTema) return null;

    return (
        <>
            {/* Floating trigger */}
            <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Abrir seletor de temas"
                    onPress={abrirDrawer}
                    style={[
                        s.fab,
                        {
                            top: insets.top + 12,
                            backgroundColor: colors.overlayStrong,
                            borderColor: colors.neutralBorder,
                        },
                        shadows.card,
                    ]}
                >
                    <Ionicons name="color-palette-outline" size={20} color={colors.primary} />
                </Pressable>
            </View>

            {/* Drawer modal */}
            <Modal
                visible={drawerAberto}
                transparent
                animationType="slide"
                onRequestClose={fecharDrawer}
                statusBarTranslucent
            >
                <Pressable style={s.backdrop} onPress={fecharDrawer} />
                <View style={[s.sheet, { paddingBottom: insets.bottom + 16, backgroundColor: colors.surface }]}>
                    <View style={[s.handle, { backgroundColor: colors.neutralBorder }]} />
                    <Text style={[s.sheetTitle, { color: colors.text }]}>Escolha um tema</Text>

                    {THEME_ORDER.map((tn) => {
                        const isActive = tn === themeName;
                        return (
                            <TouchableOpacity
                                key={tn}
                                activeOpacity={0.7}
                                onPress={() => { void definirTema(tn); fecharDrawer(); }}
                                style={[
                                    s.option,
                                    {
                                        backgroundColor: isActive ? colors.tertiary : colors.white,
                                        borderColor: isActive ? colors.primary : colors.neutralBorder,
                                    },
                                ]}
                            >
                                <View style={s.optionLeft}>
                                    <Text style={[s.optionLabel, { color: colors.text }]}>
                                        {THEME_LABELS[tn]}
                                    </Text>
                                    <SwatchRow themeName={tn} />
                                </View>
                                {isActive && (
                                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Modal>
        </>
    );
}

const s = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 16,
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 16,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        borderWidth: 1.5,
        padding: 16,
        marginBottom: 12,
    },
    optionLeft: {
        gap: 8,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '700',
    },
    swatchRow: {
        flexDirection: 'row',
        gap: 6,
    },
    swatch: {
        width: 22,
        height: 22,
        borderRadius: 11,
    },
});