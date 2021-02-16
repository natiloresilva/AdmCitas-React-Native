import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList, ScrollView} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {
  //Definimos el state de citas
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Lara', propietario: 'Oscar', sintomas: 'Duerme mucho'},
    {
      id: '2',
      paciente: 'Kevin',
      propietario: 'Julieta',
      sintomas: 'Duerme mucho',
    },
    {
      id: '3',
      paciente: 'Galileo',
      propietario: 'Natalia',
      sintomas: 'Duerme mucho',
    },
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };
  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>

        <Formulario />

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

        {/* {citas.map(cita => (<View>
        <Text key={id}>{cita.paciente}</Text>
     </View>))} */}
      </View>
    </ScrollView>
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
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
