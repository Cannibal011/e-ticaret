import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

export default function FavoritesScreen({ favorites }) {
  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Henüz favori ürün yok.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard product={item} isFavorite={true} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginTop:30,
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: 'gray',
  },
});
