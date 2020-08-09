import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [subject, setSubject] = useState({ Id: 0, Name: '', Value: '' });
    const [week_day, setWeekDay] = useState({ Id: 0, Name: '', Value: '' });
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    function handleToggleFilterVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFilterSubmit() {
        getFavorites();

        const { data } = await api.get('/classes', {
            params: {
                subject: subject.Value, week_day: week_day.Value, time
            }
        });

        setTeachers(data);
        setIsFilterVisible(false);
    }

    async function getFavorites() {
        const fav = await AsyncStorage.getItem('favorites');
        if (fav) {
            const favoritedTeachers = JSON.parse(fav);

            const favoritedTeachersId = favoritedTeachers.map((el: Teacher) => {
                return el.id;
            });
            setFavorites(favoritedTeachersId);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={
                    <BorderlessButton onPress={handleToggleFilterVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                }
            >
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Select title="Matéria" items={[
                            { Id: 1, Value: 'Artes', Name: 'Artes' },
                            { Id: 2, Value: 'TI', Name: 'TI' },
                            { Id: 3, Value: 'Biologia', Name: 'Biologia' },
                            { Id: 4, Value: 'Matemática', Name: 'Matemática' },
                        ]}
                            onSelected={(data) => setSubject(data)}
                            value={subject.Name}
                            placeholder="Qual a matéria"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Select title="Dia da semana" items={[
                                    { Id: 1, Value: '0', Name: 'Domingo' },
                                    { Id: 2, Value: '1', Name: 'Segunda-feira' },
                                    { Id: 3, Value: '2', Name: 'Terça-feira' },
                                    { Id: 4, Value: '3', Name: 'Quarta-feira' },
                                    { Id: 5, Value: '4', Name: 'Quinta-feira' },
                                    { Id: 6, Value: '5', Name: 'Sexta-feira' },
                                    { Id: 7, Value: '6', Name: 'Sábado' }
                                ]}
                                    onSelected={(data) => setWeekDay(data)}
                                    value={week_day.Name}
                                    placeholder="Qual dia"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    placeholder="Qual o horário (8:00)"
                                    value={time}
                                    onChangeText={e => setTime(e)}
                                />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((el: Teacher) => {
                    return (
                        <TeacherItem
                            key={el.id}
                            teacher={el}
                            favorited={favorites.includes(el.id)}
                        />
                    )
                })}
            </ScrollView>
        </ScrollView>
    )
}

export default TeacherList;