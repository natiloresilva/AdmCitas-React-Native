import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Cita = ({item, eliminarPaciente}) => {
  const dialogoEliminar = (id) => {
    console.log('Eliminando...', id);

    eliminarPaciente(id);
  };
  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}>{item.paciente}</Text>
      </View>

      <View>
        <Text style={styles.label}>Propietario: </Text>
        <Text style={styles.texto}>{item.propietario}</Text>
      </View>

      <View>
        <Text style={styles.label}>Teléfono: </Text>
        <Text style={styles.texto}>{item.telefono}</Text>
      </View>

      <View>
        <Text style={styles.label}>Síntomas: </Text>
        <Text style={styles.texto}>{item.sintomas}</Text>
      </View>

      <View>
        <Text style={styles.label}>Fecha y Hora de ingreso: </Text>
        <Text style={styles.texto}>
          {item.fecha}, {item.hora}
        </Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#E1E1E1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: '2.5%',
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },

  texto: {
    fontSize: 18,
  },

  btnEliminar: {
    padding: 10,
    backgroundColor: '#2c4551',
    marginVertical: 10,
  },

  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cita;
