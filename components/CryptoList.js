import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, RefreshControl} from 'react-native';
import axios from 'axios';
import {cryptoStyles} from '../styles/ScreenStyles';

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const fetchData = () => {
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
        setRefreshing(false); // Once data is fetched, set refreshing to false
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRefreshing(false); // In case of error, set refreshing to false
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial render

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true when the user pulls down to refresh
    fetchData(); // Fetch data again
  };

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
const styles = cryptoStyles;

export default CryptoList;
