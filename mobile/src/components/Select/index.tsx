import React from 'react';
import { Text } from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface PickerModalProps {
    title: string;
    placeholder: string;
    value: string;
    items: Array<{
        Id: number,
        Name: string,
        Value: string
    }>
}

const Select: React.FC<PickerModalProps> = ({ title, placeholder, value, items, ...rest }) => {
    return (
        <PickerModal
            renderSelectView={(disabled, selected, showModal) =>
                <>
                    <Text style={styles.label}>{title}</Text>
                    <Text
                        style={[styles.input, value ? null : {color: '#c1bccc'}]}
                        onPress={showModal}
                    >{value ? value : placeholder}</Text>
                    <BorderlessButton onPress={showModal} style={styles.button}>
                        <Feather name="chevron-down" size={20} color="#8257E5" />
                    </BorderlessButton>
                </>
            }
            // onSelected={(data) => console.log(data)}
            items={items}
            searchPlaceholderText={'Procurar'}
            requireSelection={true}
            {...rest}
        />
    )
}

export default Select;