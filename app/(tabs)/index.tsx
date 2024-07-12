import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Dimensions, ImageBackground, Modal, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

export default function App() {
  const [budget, setBudget] = useState('');
  const [workload, setWorkload] = useState(1);
  const [storage, setStorage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleGenerate = () => {
    if (!budget.trim()) {
      Alert.alert('Budget Required', 'Please enter your budget.', [{ text: 'OK' }]);
    } else {
      setModalVisible(true);
    }
  };

  const recommendations = [
    { id: '1', title: 'Recommendation 1', description: 'This is a placeholder for recommendation 1' },
    { id: '2', title: 'Recommendation 2', description: 'This is a placeholder for recommendation 2' },
    { id: '3', title: 'Recommendation 3', description: 'This is a placeholder for recommendation 3' },
    { id: '4', title: 'Recommendation 4', description: 'This is a placeholder for recommendation 4' },
    { id: '5', title: 'Recommendation 5', description: 'This is a placeholder for recommendation 5' },
  ];

  const renderRecommendation = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('@/assets/images/back.png')} // Update the path to your image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.subheading}>
          EZPC is a go-to application for finding the perfect PC recommendations tailored just for you.
        </Text>

        <Text style={styles.text}>Budget</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your budget"
          placeholderTextColor="#fff"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />

        <Text style={styles.text}>Workload Intensity</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={.5}
            value={workload}
            onValueChange={setWorkload}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#fff"
            thumbTintColor="#fff"
          />
          <Text style={styles.sliderValue}>{workload}</Text>
        </View>

        <Text style={styles.text}>Storage Needs</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={.5}
            value={storage}
            onValueChange={setStorage}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#fff"
            thumbTintColor="#fff"
          />
          <Text style={styles.sliderValue}>{storage}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Top 5 Recommendations</Text>
            <Text style={styles.modalSubtitle}>
              These are your top 5 choices based on a budget of ₱{budget}.00, a workload intensity of {workload}, and storage needs of {storage}.
            </Text>
            <FlatList
              data={recommendations}
              renderItem={renderRecommendation}
              keyExtractor={(item) => item.id}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    borderRadius: 10,
    width: '95%',
  },
  subheading: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 16,
    color: '#fff',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 7,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 15, 0.9)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'rgba(15, 15, 15, 0)',
    borderRadius: 5,
    padding: 7,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(15, 15, 15, 0.8)',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    width: '100%', // Adjusted width to make the card wider
    borderColor: '#fff',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '50%', // Adjusted width
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
