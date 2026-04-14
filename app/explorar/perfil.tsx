import { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedGlow from 'react-native-animated-glow';
import { PRESETS_GLOW, USUARIO } from '@/constants';
import { useTheme } from '@/app/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AVATAR_SIZE = 110;

/* ── floating leaf particle ──────────────────────────────── */
function FloatingLeaf({
    delay,
    left,
    size,
    color,
}: {
    delay: number;
    left: number;
    size: number;
    color: string;
}) {
    const translateY = useRef(new Animated.Value(-size)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const drift = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, { toValue: 18, duration: 2400, useNativeDriver: true }),
                Animated.timing(translateX, { toValue: -18, duration: 2400, useNativeDriver: true }),
            ]),
        );
        const fall = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, { toValue: 0.55, duration: 600, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 340, duration: 6000, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: -size, duration: 0, useNativeDriver: true }),
            ]),
        );
        const spin = Animated.loop(
            Animated.timing(rotate, { toValue: 1, duration: 4000 + delay, useNativeDriver: true }),
        );
        drift.start();
        fall.start();
        spin.start();
        return () => { drift.stop(); fall.stop(); spin.stop(); };
    }, []);

    const rotateStr = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

    return (
        <Animated.View
            pointerEvents="none"
            style={{
                position: 'absolute',
                left,
                top: 0,
                opacity,
                transform: [{ translateY }, { translateX }, { rotate: rotateStr }],
            }}
        >
            <Ionicons name="leaf" size={size} color={color} />
        </Animated.View>
    );
}

/* ── stat card ───────────────────────────────────────────── */
function StatCard({
    icon,
    value,
    label,
    gradient,
    delay,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    value: string | number;
    label: string;
    gradient: [string, string];
    delay: number;
}) {
    const scale = useRef(new Animated.Value(0.5)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 10 }),
                Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.statCard, { opacity, transform: [{ scale }] }]}>
            <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
            >
                <View style={styles.statIconCircle}>
                    <Ionicons name={icon} size={20} color={gradient[0]} />
                </View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </LinearGradient>
        </Animated.View>
    );
}

/* ── badge pill ──────────────────────────────────────────── */
function BadgeItem({
    icon,
    label,
    accentColor,
    bgColor,
    delay,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    accentColor: string;
    bgColor: string;
    delay: number;
}) {
    const translateX = useRef(new Animated.Value(40)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.spring(translateX, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 8 }),
                Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.badge, { backgroundColor: bgColor, opacity, transform: [{ translateX }] }]}>
            <View style={[styles.badgeIcon, { backgroundColor: accentColor }]}>
                <Ionicons name={icon} size={18} color="#fff" />
            </View>
            <Text style={[styles.badgeLabel, { color: accentColor }]}>{label}</Text>
        </Animated.View>
    );
}

/* ── main screen ─────────────────────────────────────────── */
export default function Perfil() {
    const { colors, shadows } = useTheme();

    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerSlide = useRef(new Animated.Value(30)).current;
    const avatarScale = useRef(new Animated.Value(0.6)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.spring(headerSlide, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 6 }),
            Animated.spring(avatarScale, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 12 }),
        ]).start();
    }, []);

    const BADGES = [
        { icon: 'footsteps' as const, label: 'Primeiro Passo', accent: colors.primary, bg: colors.quaternary },
        { icon: 'bonfire' as const, label: 'Explorador', accent: colors.forest, bg: colors.tertiary },
        { icon: 'trophy' as const, label: 'Nível ' + USUARIO.nivelAtual, accent: colors.rating, bg: '#FFF5E0' },
        { icon: 'leaf' as const, label: 'Amante da Natureza', accent: colors.secondary, bg: colors.quaternary },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.surface }]} showsVerticalScrollIndicator={false}>
            {/* ─ Hero gradient header ─ */}
            <View style={styles.heroWrapper}>
                <LinearGradient
                    colors={[colors.forest, colors.primary, colors.secondary]}
                    locations={[0, 0.55, 1]}
                    style={styles.hero}
                >
                    {/* Floating leaves */}
                    <FloatingLeaf delay={0} left={30} size={16} color={colors.accent} />
                    <FloatingLeaf delay={1200} left={SCREEN_WIDTH * 0.45} size={12} color={colors.tertiary} />
                    <FloatingLeaf delay={2600} left={SCREEN_WIDTH * 0.75} size={14} color={colors.overlayLight} />
                    <FloatingLeaf delay={800} left={SCREEN_WIDTH * 0.2} size={10} color={colors.quaternary} />

                    <Animated.View
                        style={[
                            styles.heroContent,
                            { opacity: headerOpacity, transform: [{ translateY: headerSlide }] },
                        ]}
                    >
                        {/* Avatar */}
                        <Animated.View style={{ transform: [{ scale: avatarScale }] }}>
                            <AnimatedGlow preset={PRESETS_GLOW}>
                                <View style={[styles.avatarRing, { borderColor: colors.accent }]}>
                                    <Image
                                        source={{ uri: 'https://avatars.githubusercontent.com/u/200701804?v=4' }}
                                        style={styles.avatar}
                                    />
                                </View>
                            </AnimatedGlow>
                        </Animated.View>

                        <Text style={styles.userName}>Rique</Text>
                        <View style={styles.levelChip}>
                            <Ionicons name="shield-checkmark" size={13} color={colors.accent} />
                            <Text style={[styles.levelText, { color: colors.accent }]}>
                                Nível {USUARIO.nivelAtual} — Explorador
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Wave-style bottom curve */}
                    <View style={[styles.heroCurve, { backgroundColor: colors.surface }]} />
                </LinearGradient>
            </View>

            {/* ─ Stats row ─ */}
            <View style={styles.statsRow}>
                <StatCard
                    icon="checkmark-done-circle"
                    value={USUARIO.trilhasConcluidas}
                    label="Concluídas"
                    gradient={[colors.forest, colors.primary]}
                    delay={200}
                />
                <StatCard
                    icon="time"
                    value={USUARIO.tempoGasto}
                    label="Tempo Total"
                    gradient={[colors.primary, colors.secondary]}
                    delay={350}
                />
                <StatCard
                    icon="trending-up"
                    value={'Nv ' + USUARIO.nivelAtual}
                    label="Nível"
                    gradient={[colors.secondary, colors.accent]}
                    delay={500}
                />
            </View>

            {/* ─ About card ─ */}
            <View style={[styles.aboutCard, shadows.card, { backgroundColor: colors.white }]}>
                <View style={styles.aboutHeader}>
                    <Ionicons name="person-circle" size={22} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Sobre</Text>
                </View>
                <Text style={[styles.aboutText, { color: colors.textMuted }]}>
                    Apaixonado por trilhas e aventuras ao ar livre. Sempre em busca
                    de novas experiências na natureza e conectando com o meio ambiente.
                </Text>
                <View style={styles.aboutMeta}>
                    <View style={styles.aboutMetaItem}>
                        <Ionicons name="location" size={14} color={colors.primary} />
                        <Text style={[styles.aboutMetaText, { color: colors.textMuted }]}>Brasil</Text>
                    </View>
                    <View style={styles.aboutMetaItem}>
                        <Ionicons name="calendar" size={14} color={colors.primary} />
                        <Text style={[styles.aboutMetaText, { color: colors.textMuted }]}>Desde 2024</Text>
                    </View>
                </View>
            </View>

            {/* ─ Badges ─ */}
            <View style={styles.badgesSection}>
                <View style={styles.badgesHeader}>
                    <Ionicons name="ribbon" size={22} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Conquistas</Text>
                </View>
                {BADGES.map((b, i) => (
                    <BadgeItem
                        key={b.label}
                        icon={b.icon}
                        label={b.label}
                        accentColor={b.accent}
                        bgColor={b.bg}
                        delay={550 + i * 120}
                    />
                ))}
            </View>

            {/* ─ Progress card ─ */}
            <View style={[styles.progressCard, shadows.card, { backgroundColor: colors.white }]}>
                <LinearGradient
                    colors={[colors.forest, colors.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.progressGradient}
                >
                    <View style={styles.progressTop}>
                        <Ionicons name="analytics" size={20} color={colors.white} />
                        <Text style={styles.progressTitle}>Progresso Geral</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '72%', backgroundColor: colors.accent }]} />
                    </View>
                    <Text style={styles.progressPercent}>72% completo</Text>
                </LinearGradient>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    heroWrapper: { overflow: 'hidden' },
    hero: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    heroContent: { alignItems: 'center', zIndex: 2 },
    heroCurve: {
        position: 'absolute',
        bottom: -30,
        left: -20,
        right: -20,
        height: 60,
        borderTopLeftRadius: 999,
        borderTopRightRadius: 999,
    },
    avatarRing: {
        width: AVATAR_SIZE + 8,
        height: AVATAR_SIZE + 8,
        borderRadius: (AVATAR_SIZE + 8) / 2,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
    },
    userName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    levelChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '700',
    },

    /* Stats */
    statsRow: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        marginTop: -10,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    },
    statGradient: {
        alignItems: 'center',
        paddingVertical: 18,
        gap: 4,
    },
    statIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    /* About */
    aboutCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    aboutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '800',
    },
    aboutText: {
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 14,
    },
    aboutMeta: {
        flexDirection: 'row',
        gap: 20,
    },
    aboutMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    aboutMetaText: {
        fontSize: 12,
        fontWeight: '600',
    },

    /* Badges */
    badgesSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    badgesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
    },
    badgeIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeLabel: {
        fontSize: 14,
        fontWeight: '700',
    },

    /* Progress */
    progressCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    progressGradient: {
        padding: 20,
    },
    progressTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
    },
    progressTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressPercent: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.85)',
    },
});