import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import axios from 'axios';

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'inr',
          order: 'name',
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      })
      .then(response => {
        setCryptoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 100 Cryptocurrencies by Market Cap</Text>
      <FlatList
        data={cryptoData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.currency}>Symbol: {item.symbol}</Text>
              <Text style={styles.currency}>Name: {item.name}</Text>
              <Text style={styles.rate}>
                Price in INR: {item.current_price}
              </Text>

              <Text style={styles.rate}>
                Price Change (24h): {item.price_change_24h}
              </Text>
            </View>
            <Image source={{uri: item.image}} style={styles.image} />
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
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    padding: 8,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rate: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default CryptoList;
