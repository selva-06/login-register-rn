import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState({
    baseCurrency: 'BTC',
    rates: {},
  });

  useEffect(() => {
    axios
      .get('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
      .then(response => {
        setCryptoData({
          baseCurrency: response.data.data.currency,
          rates: response.data.data.rates,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cryptocurrency Rates</Text>
      <Text style={styles.baseCurrency}>
        Base Currency: {cryptoData.baseCurrency}
      </Text>
      <FlatList
        data={Object.entries(cryptoData.rates)}
        keyExtractor={item => item[0]}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.currency}>Title:{item[0]}</Text>
            <Text style={styles.rate}>Rate:{item[1]}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  baseCurrency: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    padding: 8,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  rate: {
    fontSize: 16,
    color: 'white',
  },
});

export default CryptoList;
