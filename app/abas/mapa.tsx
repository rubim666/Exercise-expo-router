import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet  } from "react-native";
import { COLORS, TRILHAS_LISTA } from "@/constants";

export default function Mapa() {

    return(
        
        <View style={styles.container}>
            <Text style={styles.title}>Mapa de Trilhas</Text>

            <View style={styles.pin}>
                {Array.isArray(TRILHAS_LISTA) && TRILHAS_LISTA.map((trilha) => (
                    <TouchableOpacity key={trilha.id} onPress={() => router.push({pathname: '/trilha/[id]', params: { id: trilha.id, origem: 'mapa' }})}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.primary }} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>

    )

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
        color: COLORS.white,
        marginBottom: 16,
    },
    pin: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -12 }, { translateY: -12 }],
    },
});
