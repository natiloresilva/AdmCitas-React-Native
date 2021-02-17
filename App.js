import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);

  //Definimos el state de citas
  const [citas, setCitas] = useState([]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  //Ocultar teclado

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas en Veterinaria</Text>

        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoBtnMostrarForm}>
              {mostrarForm ? 'Ver mis pacientes' : 'Crear nueva cita'}{' '}
            </Text>
          </TouchableHighlight>
        </View>

        {mostrarForm ? (
          <>
            <Text style={styles.tituloForm}>
              Completa con los datos de la mascota
            </Text>
            <Formulario
              citas={citas}
              setCitas={setCitas}
              guardarMostrarForm={guardarMostrarForm}
            />
          </>
        ) : (
          <>
            <Text style={styles.titulo}>
              {citas.length > 0
                ? 'Gestiona tus pacientes'
                : 'No hay citas, agrega una'}
            </Text>

            <FlatList
              data={citas}
              renderItem={({item}) => (
                <Cita item={item} eliminarPaciente={eliminarPaciente} />
              )}
              keyExtractor={(cita) => cita.id}
            />
          </>
        )}

        {/* {citas.map(cita => (<View>
        <Text key={id}>{cita.paciente}</Text>
     </View>))} */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#A2D5E1',
    flex: 1,
  },
  titulo: {
    color: '#2c4551',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 35,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  tituloForm: {
    color: '#2c4551',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#f9b1c9',
    marginVertical: 10,
    marginHorizontal: '2.5%',
  },
  textoBtnMostrarForm: {
    color: '#2c4551',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
