import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';

// export const COLORS = {}

type Dificuldade = 'Fácil' | 'Média' | 'Difícil'
type ThemeName = 'emerald' | 'sunset' | 'midnight'

const COLOR_THEMES = {
    emerald: {
        subtitle: '#6B7C78',
        primary: '#3E9B88',
        secondary: '#69C2AB',
        tertiary: '#B3E8D8',
        quaternary: '#E6F8F1',
        forest: '#163C36',
        surface: '#F3F8F6',
        white: '#FFFFFF',
        text: '#20443D',
        textMuted: '#6A8079',
        accent: '#9AF0C8',
        rating: '#D2A24C',
        neutralSoft: '#EAF3EF',
        neutralBorder: '#D3E3DD',
        neutralTrack: '#DBEAE5',
        neutralThumb: '#FBFEFD',
        overlayStrong: 'rgba(255,255,255,0.92)',
        overlayMedium: 'rgba(255,255,255,0.8)',
        overlaySoft: 'rgba(255,255,255,0.75)',
        overlayLight: 'rgba(255,255,255,0.6)',
        overlayFaint: 'rgba(255,255,255,0.25)',
        overlaySubtle: 'rgba(255,255,255,0.22)',
        overlayCard: 'rgba(255,255,255,0.2)',
    },
    sunset: {
        subtitle: '#817268',
        primary: '#E07A5F',
        secondary: '#F2A65A',
        tertiary: '#F7D6B5',
        quaternary: '#FFF1E2',
        forest: '#6B3E2E',
        surface: '#FFF8F3',
        white: '#FFFFFF',
        text: '#5C3A2D',
        textMuted: '#957567',
        accent: '#FFD166',
        rating: '#C7923E',
        neutralSoft: '#F9EEE5',
        neutralBorder: '#EBCDBD',
        neutralTrack: '#F0DDD0',
        neutralThumb: '#FFFDFC',
        overlayStrong: 'rgba(255,255,255,0.9)',
        overlayMedium: 'rgba(255,255,255,0.8)',
        overlaySoft: 'rgba(255,255,255,0.74)',
        overlayLight: 'rgba(255,255,255,0.58)',
        overlayFaint: 'rgba(255,255,255,0.24)',
        overlaySubtle: 'rgba(255,255,255,0.21)',
        overlayCard: 'rgba(255,255,255,0.18)',
    },
    midnight: {
        subtitle: '#7B8D93',
        primary: '#4C7CF0',
        secondary: '#6AA7FF',
        tertiary: '#B8D2FF',
        quaternary: '#EAF2FF',
        forest: '#10233F',
        surface: '#F4F7FC',
        white: '#FFFFFF',
        text: '#19314F',
        textMuted: '#6E829E',
        accent: '#8FE3FF',
        rating: '#D5A441',
        neutralSoft: '#EAF0F8',
        neutralBorder: '#D3DDEA',
        neutralTrack: '#DBE4F1',
        neutralThumb: '#FCFDFF',
        overlayStrong: 'rgba(255,255,255,0.92)',
        overlayMedium: 'rgba(255,255,255,0.8)',
        overlaySoft: 'rgba(255,255,255,0.75)',
        overlayLight: 'rgba(255,255,255,0.62)',
        overlayFaint: 'rgba(255,255,255,0.24)',
        overlaySubtle: 'rgba(255,255,255,0.2)',
        overlayCard: 'rgba(255,255,255,0.18)',
    },
} as const

const COLORS = {
    ...COLOR_THEMES.emerald,
}

const DIFFICULTY_THEMES: Record<ThemeName, Record<Dificuldade, string>> = {
    emerald: {
        'Fácil': '#4E9B78',
        'Média': '#C08A43',
        'Difícil': '#C66457',
    },
    sunset: {
        'Fácil': '#6AA36E',
        'Média': '#D18945',
        'Difícil': '#D56B5C',
    },
    midnight: {
        'Fácil': '#4D9EA4',
        'Média': '#C8903F',
        'Difícil': '#C96476',
    },
}

const DIFFICULTY_BADGE_THEMES: Record<ThemeName, Record<Dificuldade, string>> = {
    emerald: {
        'Fácil': '#DDF3EA',
        'Média': '#F6E7D3',
        'Difícil': '#F6DFDA',
    },
    sunset: {
        'Fácil': '#E7F1DE',
        'Média': '#F9E4CF',
        'Difícil': '#F8DEDA',
    },
    midnight: {
        'Fácil': '#DDF1F1',
        'Média': '#F7E5CF',
        'Difícil': '#F3DCE5',
    },
}

const DIFFICULTY_COLORS: Record<Dificuldade, string> = {
    ...DIFFICULTY_THEMES.emerald,
}

const DIFFICULTY_BADGE_COLORS: Record<Dificuldade, string> = {
    ...DIFFICULTY_BADGE_THEMES.emerald,
}

const PRESETS_GLOW: PresetConfig = {
    metadata: {
        textColor: COLORS.white,
        category: 'Custom',
        tags: ['interactive'],
        name: 'Preset',
    },
    states: [
        {
            name: 'default',
            preset: {
                cornerRadius: 50,
                outlineWidth: 2,
                borderColor: COLORS.quaternary,
                glowLayers: [
                  { colors: [COLORS.accent, COLORS.forest, COLORS.primary], opacity: 0.5, glowSize: 10 },
                ]
            }
        }
    ]

}

const SHADOWS = {
    card: {
        shadowColor: COLORS.forest,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    sm: {
        shadowColor: COLORS.forest,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 3,
    },
}

const USUARIO = {
    trilhasConcluidas: 3,
    tempoGasto: '17h',
    nivelAtual: 7,
};

const ITEMS = [
    { label: 'Perfil', screen: 'perfil' },
    { label: 'Conquistas', screen: 'conquistas' },
    { label: 'Histórico', screen: 'historico' },
    { label: 'Sair', screen: 'sair' },
]

interface Trilha {
    id: number
    nome: string
    dificuldade: Dificuldade
    distancia: string
    duracao: string
    local: string
    nota: number
    gradientColors: [string, string]
}

const TRILHAS_LISTA: Record<string, Trilha> = {
    "Trilha Guarapari": {
        id: 1,
        nome: "Trilha de Guarapari",
        dificuldade: 'Fácil',
        distancia: '4.2 km',
        duracao: '1h 30min',
        local: 'Guarapari, ES',
        nota: 4.7,
        gradientColors: [COLORS.forest, COLORS.primary],
    },
    "Trilha Guarujá": {
        id: 2,
        nome: "Trilha de Guarujá",
        dificuldade: 'Média',
        distancia: '8.5 km',
        duracao: '3h 00min',
        local: 'Guarujá, SP',
        nota: 4.4,
        gradientColors: ['#1C5B4D', '#5FB89E'],
    },
    "Trilha Ubatuba": {
        id: 3,
        nome: "Trilha de Ubatuba",
        dificuldade: 'Difícil',
        distancia: '14.0 km',
        duracao: '5h 30min',
        local: 'Ubatuba, SP',
        nota: 4.9,
        gradientColors: ['#0F2F2B', '#3D8B78'],
    },
}

const THEME_LABELS: Record<ThemeName, string> = {
    emerald: 'Esmeralda',
    sunset: 'Pôr do Sol',
    midnight: 'Noturno',
}

function applyThemeColors(themeName: ThemeName) {
    const theme = COLOR_THEMES[themeName]
    Object.assign(COLORS, theme)
    Object.assign(DIFFICULTY_COLORS, DIFFICULTY_THEMES[themeName])
    Object.assign(DIFFICULTY_BADGE_COLORS, DIFFICULTY_BADGE_THEMES[themeName])

    ;(SHADOWS.card as { shadowColor: string }).shadowColor = theme.forest
    ;(SHADOWS.sm as { shadowColor: string }).shadowColor = theme.forest

    if (PRESETS_GLOW.metadata) {
        PRESETS_GLOW.metadata.textColor = theme.white
    }
    PRESETS_GLOW.states[0].preset.borderColor = theme.quaternary
    PRESETS_GLOW.states[0].preset.glowLayers = [
        { colors: [theme.accent, theme.forest, theme.primary], opacity: 0.5, glowSize: 10 },
    ]

    TRILHAS_LISTA['Trilha Guarapari'].gradientColors = [theme.forest, theme.primary]
}

// test

export { COLORS, SHADOWS, TRILHAS_LISTA, PRESETS_GLOW, USUARIO, ITEMS, DIFFICULTY_COLORS, DIFFICULTY_BADGE_COLORS, COLOR_THEMES, THEME_LABELS, applyThemeColors }
export type { Trilha, Dificuldade, ThemeName }