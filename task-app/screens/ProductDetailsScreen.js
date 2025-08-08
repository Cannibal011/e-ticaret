import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,} from 'react-native';

export default function ProductDetailsScreen({ route, setCart, favorites, onToggleFavorite }) {
  const { product } = route.params;

  const isFavorite = favorites.some((fav) => fav.id === product.id);
  
  // 📌 Sepete ürün ekleme
  const handleAddToCart = () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}₺</Text>

      <Text style={styles.description}>{product.fullDescription}</Text> {/* 📌 uzun açıklama */}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartText}>Sepete Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onToggleFavorite(product)}>
          <Text style={styles.heart}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, marginBottom: 20, borderRadius: 12 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: '#007bff', marginBottom: 10 },
  description: { fontSize: 16, color: '#333', marginBottom: 20, lineHeight: 22 },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  cartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heart: {
    fontSize: 30,
  },
});



