import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm}) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [sintomas, guardarSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Muestra u oculta el Date Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  //Muestra u oculta el Time Picker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (hora) => {
    const opciones = {hour: 'numeric', minute: '2-digit', hour12: false};
    guardarHora(hora.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  //Crear nueva cita

  const crearNuevaCita = () => {
    //Validar
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      //Falla la validación
      mostrarAlerta();
      return;
    }
    //Crear una nueva cita
    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};

    cita.id = shortid.generate();

    //Agregar al state
    const citaNuevas = [...citas, cita];
    setCitas(citaNuevas);

    //Ocultar el formulario

    guardarMostrarForm(false);

    //Resetear el formulario
  };

  //Muestra la alerta si falla la validación
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los campos son obligatorios', //mensaje
      [
        {
          text: 'OK', //arreglo de botones
        },
      ],
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.formulario}>
          <View>
            <Text style={styles.label}>Paciente:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarPaciente(texto)}
            />
          </View>

          <View>
            <Text style={styles.label}>Dueño:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarPropietario(texto)}
            />
          </View>

          <View>
            <Text style={styles.label}>Teléfono de contacto:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarTelefono(texto)}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>Fecha:</Text>
            <Button title="Seleccionar fecha" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={confirmarFecha}
              onCancel={hideDatePicker}
              locale="es_ES"
              headerTextIOS="Elige la fecha"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
            />
            <Text>{fecha}</Text>
          </View>

          <View>
            <Text style={styles.label}>Hora:</Text>
            <Button title="Seleccionar hora" onPress={showTimePicker} />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={confirmarHora}
              onCancel={hideTimePicker}
              locale="es_ES"
              headerTextIOS="Elige una hora"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
              is24Hour
            />
            <Text>{hora}</Text>
          </View>

          <View>
            <Text style={styles.label}>Síntomas:</Text>
            <TextInput
              multiline
              style={styles.input}
              onChangeText={(texto) => guardarSintomas(texto)}
            />
          </View>

          <View>
            <TouchableHighlight
              onPress={() => crearNuevaCita()}
              style={styles.btnSubmit}>
              <Text style={styles.textoBtn}>Guardar nueva cita </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
    marginVertical: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },

  input: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#A2D5E1',
  },

  btnSubmit: {
    padding: 10,
    backgroundColor: '#f9b1c9',
    marginVertical: 10,
  },
  textoBtn: {
    color: '#2c4551',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
