import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import api from '../services/api';

const Repository = ({id, title, techs, likes}) => {
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        setLikesCount(likes);
    }, []);

    async function handleLikeRepository(id) {
        const response = await api.post(`repositories/${id}/like`);

        setLikesCount(response.data.likes);
    }

    return (
        <View style={styles.repositoryContainer}> 
            <Text style={styles.repository}>{title}</Text>

            <View style={styles.techsContainer}>
                <Text style={styles.tech}>
                    {techs}
                </Text>
            </View>

            <View style={styles.likesContainer}>
                <Text
                style={styles.likeText}
                testID={`repository-likes-${id}`}
                >
                {likesCount === 1 ? `${likesCount} curtida` : `${likesCount} curtidas`}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(id)}
                testID={`like-button-${id}`}
            >
                <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    repositoryContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        padding: 20,
    },
    repository: {
        fontSize: 32,
        fontWeight: "bold",
    },
    techsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    tech: {
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 10,
        backgroundColor: "#04d361",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#fff",
    },
    likesContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
        color: "#fff",
        backgroundColor: "#7159c1",
        padding: 15,
    },
});

export default Repository;