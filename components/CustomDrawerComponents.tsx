import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedGlow from 'react-native-animated-glow';
import { PRESETS_GLOW, USUARIO, ITEMS } from '@/constants';
import { useTheme } from '@/app/contexts/ThemeContext';

/* ── floating leaf (nature vibe) ────────────────────────── */
function DrawerLeaf({ delay, top, left, size, color }: {
    delay: number; top: number; left: number; size: number; color: string;
}) {
    const translateY = useRef(new Animated.Value(0)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
                Animated.parallel([
                    Animated.timing(translateY, { toValue: 20, duration: 3000, useNativeDriver: true }),
                    Animated.timing(rotate, { toValue: 1, duration: 3000, useNativeDriver: true }),
                ]),
                Animated.timing(opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true }),
                Animated.timing(rotate, { toValue: 0, duration: 0, useNativeDriver: true }),
            ]),
        ).start();
    }, []);

    const rotateStr = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '120deg'] });

    return (
        <Animated.View
            pointerEvents="none"
            style={{ position: 'absolute', top, left, opacity, transform: [{ translateY }, { rotate: rotateStr }] }}
        >
            <Ionicons name="leaf" size={size} color={color} />
        </Animated.View>
    );
}

/* ── nav item ───────────────────────────────────────────── */
const ITEM_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
    perfil: 'person-circle',
    conquistas: 'trophy',
    historico: 'time',
    sair: 'log-out',
};

function NavItem({
    label,
    screen,
    icon,
    onPress,
    colors,
    index,
}: {
    label: string;
    screen: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    colors: ReturnType<typeof useTheme>['colors'];
    index: number;
}) {
    const slide = useRef(new Animated.Value(30)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(300 + index * 80),
            Animated.parallel([
                Animated.spring(slide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 8 }),
                Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    const isExit = screen === 'sair';

    return (
        <Animated.View style={{ opacity, transform: [{ translateX: slide }] }}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={[
                    styles.navItem,
                    { backgroundColor: isExit ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.1)' },
                ]}
            >
                <View style={[styles.navIcon, { backgroundColor: isExit ? 'rgba(255,100,100,0.25)' : 'rgba(255,255,255,0.15)' }]}>
                    <Ionicons name={icon} size={20} color={isExit ? '#FF7B7B' : colors.accent} />
                </View>
                <Text style={[styles.navLabel, { color: isExit ? '#FF9B9B' : '#fff' }]}>{label}</Text>
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
            </TouchableOpacity>
        </Animated.View>
    );
}

/* ── main drawer ────────────────────────────────────────── */
export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { navigation } = props;
    const { colors } = useTheme();

    const headerScale = useRef(new Animated.Value(0.8)).current;
    const headerOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(headerScale, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 10 }),
            Animated.timing(headerOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <LinearGradient
            colors={[colors.forest, colors.primary, colors.secondary]}
            locations={[0, 0.6, 1]}
            style={styles.container}
        >
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Floating leaves */}
                <DrawerLeaf delay={0} top={30} left={10} size={14} color={colors.accent} />
                <DrawerLeaf delay={1500} top={80} left={180} size={10} color={colors.tertiary} />
                <DrawerLeaf delay={3000} top={150} left={40} size={12} color={colors.overlayLight} />

                {/* ─ Profile header ─ */}
                <Animated.View
                    style={[
                        styles.profileSection,
                        { opacity: headerOpacity, transform: [{ scale: headerScale }] },
                    ]}
                >
                    <AnimatedGlow preset={PRESETS_GLOW}>
                        <View style={[styles.avatarRing, { borderColor: colors.accent }]}>
                            <Image
                                source={{ uri: 'https://avatars.githubusercontent.com/u/200701804?v=4' }}
                                style={styles.avatar}
                            />
                        </View>
                    </AnimatedGlow>

                    <Text style={styles.userName}>Rique</Text>

                    <View style={styles.levelChip}>
                        <Ionicons name="shield-checkmark" size={11} color={colors.accent} />
                        <Text style={[styles.levelText, { color: colors.accent }]}>
                            Nível {USUARIO.nivelAtual}
                        </Text>
                    </View>
                </Animated.View>

                {/* ─ Stats mini-bar ─ */}
                <View style={styles.statBar}>
                    {[
                        { icon: 'footsteps' as const, val: String(USUARIO.trilhasConcluidas), lbl: 'Trilhas' },
                        { icon: 'time' as const, val: USUARIO.tempoGasto, lbl: 'Tempo' },
                        { icon: 'trending-up' as const, val: 'Nv ' + USUARIO.nivelAtual, lbl: 'Nível' },
                    ].map((s) => (
                        <View key={s.lbl} style={styles.statItem}>
                            <Ionicons name={s.icon} size={16} color={colors.accent} />
                            <Text style={styles.statVal}>{s.val}</Text>
                            <Text style={styles.statLbl}>{s.lbl}</Text>
                        </View>
                    ))}
                </View>

                {/* ─ Separator ─ */}
                <View style={styles.separator} />

                {/* ─ Section label ─ */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="compass" size={16} color={colors.accent} />
                    <Text style={styles.sectionLabel}>Explorar</Text>
                </View>

                {/* ─ Nav items ─ */}
                <View style={styles.navList}>
                    {ITEMS.map((item, index) => (
                        <NavItem
                            key={item.screen}
                            label={item.label}
                            screen={item.screen}
                            icon={ITEM_ICONS[item.screen] ?? 'ellipse'}
                            index={index}
                            colors={colors}
                            onPress={() => {
                                if (item.screen === 'sair') {
                                    router.replace('/');
                                    return;
                                }
                                navigation.navigate(item.screen as never);
                            }}
                        />
                    ))}
                </View>

                {/* ─ Bottom branding ─ */}
                <View style={styles.branding}>
                    <Ionicons name="trail-sign" size={18} color="rgba(255,255,255,0.3)" />
                    <Text style={styles.brandText}>TrailNav</Text>
                </View>
            </DrawerContentScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { paddingTop: 0, paddingBottom: 30 },

    /* Profile */
    profileSection: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 16,
    },
    avatarRing: {
        width: 88,
        height: 88,
        borderRadius: 44,
        borderWidth: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    userName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 0.3,
        marginBottom: 6,
    },
    levelChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 14,
    },
    levelText: { fontSize: 11, fontWeight: '700' },

    /* Stats */
    statBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 16,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 14,
        paddingVertical: 12,
        marginBottom: 16,
    },
    statItem: { alignItems: 'center', gap: 2 },
    statVal: { fontSize: 14, fontWeight: '800', color: '#fff' },
    statLbl: { fontSize: 9, fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.4 },

    /* Separator */
    separator: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.12)',
        marginHorizontal: 20,
        marginBottom: 16,
    },

    /* Section */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginLeft: 20,
        marginBottom: 10,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    /* Nav items */
    navList: { paddingHorizontal: 12, gap: 6 },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 14,
        padding: 12,
    },
    navIcon: {
        width: 36,
        height: 36,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '700',
    },

    /* Branding */
    branding: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 30,
    },
    brandText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 1,
    },
});