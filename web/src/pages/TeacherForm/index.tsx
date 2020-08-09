import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const history = useHistory();

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: scheduleItems.length, from: '', to: '' }
        ]);
    }

    async function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        try {
            await api.post('/classes', {
                name, avatar, whatsapp, bio,
                subject, cost: Number(cost), schedule: scheduleItems
            });

            alert('Cadastro realizado com sucesso!');

            history.push('/');

        } catch (error) {
            alert('Erro no cadastro!');
        }

    }

    function setScheduleItemValue(position: Number, field: string, value: string) {
        const newArray = scheduleItems.map((el, index) => {
            if (index === position) {
                return { ...el, [field]: value }
            }

            return el;
        });

        setScheduleItems(newArray);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'TI', label: 'TI' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Matemática', label: 'Matemática' },
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis

                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>

                        {scheduleItems.map((el, index) => {
                            return (
                                <div className="schedule-item" key={el.week_day}>
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={el.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={el.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={el.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div >
    )
}

export default TeacherForm;