import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function CartScreen({ cart, setCart }) {
  // 🔸 Ürün sil (tek tek)
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  // 🔸 Sepeti temizle
  const clearCart = () => {
    setCart([]);
  };

  // 🔸 Toplam fiyat hesapla
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}₺ x {item.quantity}</Text>
        <Text style={styles.totalPerItem}>= {(item.price * item.quantity).toFixed(2)}₺</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.remove}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Sepet boş</Text>}
        contentContainerStyle={{ paddingTop: 20 }}
      />

      {cart.length > 0 && (
        <>
          <Text style={styles.total}>Toplam: {getTotal()}₺</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ödemeye Geç</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton} onPress={clearCart}>
            <Text style={styles.outlineText}>Sepeti Temizle</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: { fontSize: 16 },
  price: { fontSize: 14, color: '#333' },
  totalPerItem: { fontSize: 14, fontWeight: 'bold', color: '#007bff' },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  outlineButton: {
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
  },
  outlineText: { color: '#007bff', fontWeight: 'bold' },
  remove: { fontSize: 22, color: 'red', padding: 8 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 12,
  },
});


