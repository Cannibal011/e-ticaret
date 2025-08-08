import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ cart, setCart, favorites, onToggleFavorite }) {
  const navigation = useNavigation();


  const products = [
    {
      id: '1',
      name: 'Spor Ayakkabı',
      price: 799,
      image: require('../assets/image.png'),
      shortDescription: 'Koşu ve spor için mükemmel ayakkabı.',
      fullDescription: 'Bu spor ayakkabı, hafif yapısı ve nefes alabilen kumaşıyla uzun süreli konfor sağlar. Günlük kullanım için idealdir.',
    },
    {
      id: '2',
      name: 'Tişört',
      price: 199,
      image: require('../assets/indir.jpeg'),
      shortDescription: 'Yazlık pamuklu tişört.',
      fullDescription:'Pamuktan üretilmiş bu tişört, terletmeyen yapısı ve rahat kesimiyle yaz aylarının vazgeçilmezi. Şık duruşuyla hem günlük hem de spor giyime uygundur.',
    },
    {
      id: '3',
      name: 'Çanta',
      price: 299,
      image: require('../assets/canta.jpeg'),
      shortDescription: 'Geniş hacimli şık çanta.',
      fullDescription:'Bu çanta, hem estetik hem işlevsel bir tasarım sunar. Laptop bölmesi, fermuarlı cepler ve ayarlanabilir askısı ile şehir yaşamında veya seyahatte kullanmak için idealdir.',
    },
  ];
const handleAddToCart = (product) => {
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

  /*<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <ProductCard
      product={item}
      onAddToCart={() => handleAddToCart(item)}
    />
  )}
/>

  /*const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]); // sepete ekle
  };*/

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={() => handleAddToCart(item)}
            onToggleFavorite={() => onToggleFavorite(item)}
            isFavorite={favorites.some(fav => fav.id === item.id)}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
});
<Tab.Screen name="Ana Sayfa">
  {() => (
    <HomeScreen
      cart={cart}
      setCart={setCart}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onAddToCart={handleAddToCart} // 👉 BURAYA EKLE
    />
  )}
</Tab.Screen>

