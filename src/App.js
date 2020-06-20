import React, {useState, useEffect} from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text
} from "react-native";

import api from './services/api';
import Repository from './components/Repository';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });    
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.constainer}>
        <FlatList 
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({item : repository}) => (
            <Repository 
              id={repository.id}
              title={repository.title}
              techs={repository.techs}
              likes={repository.likes}
            />
          )}
        /> 
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  }
});
