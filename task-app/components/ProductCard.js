import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';

export default function ProductCard({ product,onAddToCart,onToggleFavorite, isFavorite, onPress }) {
  return (
   <TouchableOpacity onPress={onPress} style={styles.card}> {/* 🧠 ürün detayına gitmek için sarıldı */}
  <Image source={product.image } style={styles.image} />
  <Text style={styles.name}>{product.name}</Text>
  <Text style={styles.price}>{product.price}₺</Text>
  <Text style={styles.description}>{product.shortDescription}</Text>   

  <View style={styles.actions}> 
    <TouchableOpacity onPress={onAddToCart} style={styles.button}>
      <Text style={styles.buttonText}>Sepete Ekle</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onToggleFavorite}>
      <Text style={styles.heart}>{isFavorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  </View>
</TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  heart: {
    fontSize: 24,
  }, 
  description: {
  fontSize: 14,
  color: '#555',
  marginBottom:10,
},
heart: {  
    fontSize: 24,
  },
});
