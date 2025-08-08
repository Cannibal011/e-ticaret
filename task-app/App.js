import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // 📌 Stack eklendi
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import LoginScreen from './screens/LoginScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 📌 Stack tanımlandı

 


export default function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);


  const toggleFavorite = (product) => {
    const exists = favorites.some((fav) => fav.id === product.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };


  // 📌 Aynı ürün varsa adet artır, yoksa yeni ekle
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
// 📌 Ana Tab Yapısını stack'e sardık
  function Tabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ana Sayfa') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Sepet') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Favoriler') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Giriş') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >

  
        <Tab.Screen name="Ana Sayfa">
          {() => (
            <HomeScreen
              cart={cart}
              setCart={setCart}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={handleAddToCart} // 💬 onAddToCart prop'u eklendi
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Giriş" component={LoginScreen} />

        <Tab.Screen name="Sepet">
  {() => (
    <CartScreen
      cart={cart}
      setCart={setCart} // ➕ SEPETİ SIFIRLAMAK VE SİLMEK İÇİN
    />
  )}
        </Tab.Screen>

        <Tab.Screen name="Favoriler">
          {() => (
            <FavoritesScreen 
            favorites={favorites}
            onToggleFavorite={toggleFavorite} // ❤️ geri kaldırma için
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 📌 Tüm uygulamanın ana sayfası Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={Tabs}
          options={{ headerShown: false }}
        />

        {/* 📌 Ürün detay sayfası */}
        <Stack.Screen
  name="ProductDetails"
  options={{ title: 'Ürün Detayları' }}
>
  {({ route }) => (
    <ProductDetailsScreen
      route={route}
      setCart={setCart}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  )}
</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

