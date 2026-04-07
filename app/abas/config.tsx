import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from "react-native";
import { COLORS } from "@/constants";

interface OptionSwitch {
    id: string;
    title: string;
    description: string;
}

const options: OptionSwitch[] = [
    {
        id: 'notificacoes',
        title: 'Notificações',
        description: 'Receba notificações sobre novas trilhas, atualizações e promoções.',
    },

    {
        id: 'gps',
        title: 'Ativar GPS',
        description: 'Permita que o aplicativo acesse sua localização para mostrar trilhas próximas e fornecer navegação.',
    },

    {
        id: 'offline',
        title: 'Modo Offline',
        description: 'Baixe trilhas para acessar mesmo sem conexão com a internet.',
    }
]

export default function Config() {
    const [states, setStates] = useState<Record<string, boolean>>({
        notificacoes: true,
        gps: true,
        offline: false,
    });

    // snapshot state
    const toggle = (id: string) => {
        setStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const activesCount = Object.values(states).filter(Boolean).length;

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Configurações</Text>

            <View style={styles.summary}>
                <Text style={styles.summaryText}>{activesCount} de {options.length} opções ativas</Text>
            </View>

            <View style={styles.bar}>
                <View style={[styles.barFill, { width: `${(activesCount / options.length) * 100}%` }]} />
            </View>

            <View style={styles.card}>
                {options.map((option, index) => (
                    <View key={option.id}>
                        <View style={styles.row}>
                            <View style={styles.leftRow}>
                                <View style={styles.iconPlaceholder} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.optionTitle}>{option.title}</Text>
                                    <Text style={styles.optionDescription}>{option.description}</Text>
                                </View>
                                <Switch
                                    value={states[option.id]}
                                    onValueChange={() => toggle(option.id)}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.tertiary,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
    },
    summary: {
        marginVertical: 16,
        padding: 12,
        backgroundColor: COLORS.surface,
        borderRadius: 8,
        alignItems: 'center',
    },
    bar:{
        height: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 4,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: COLORS.accent,
    },

    card: {
        marginTop: 16,
        backgroundColor: COLORS.surface,
        borderRadius: 8,
    },

    summaryText: {
        fontSize: 16,
        color: COLORS.text,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    optionDescription: {
        fontSize: 14,
        color: COLORS.textMuted,
    },
});