import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    async function getFavorites() {
        const fav = await AsyncStorage.getItem('favorites');
        if (fav) {
            const favoritedTeachers = JSON.parse(fav);
            setFavorites(favoritedTeachers);
        }
    }
    
    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((el: Teacher) => {
                    return <TeacherItem key={el.id} teacher={el} favorited/>
                })}
            </ScrollView>
        </View>
    )
}

export default Favorites;