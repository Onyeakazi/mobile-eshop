import { View, Image, Pressable, Text, Dimensions } from "react-native";
import Heart from "../assets/vectors/heart.svg";
import RedHeart from "../assets/vectors/Heart-filled.svg";
import { router } from "expo-router";
import { useFavoritesStore } from "../store/favoritesStore";
import { useCartStore } from "../store/cartStore";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

export default function ProductCard({ item, imageHeight = 180, showHeart = true }) {

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(item.id));

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cart);

  const handleHeartPress = (e) => {
    e.stopPropagation();

    const isFav = isFavorite;

    toggleFavorite(item);

    if (!isFav) {
      const inCart = useCartStore.getState().cart.find(p => p.id === item.id);
      if (!inCart) {
        addToCart({ ...item, quantity: 1 });
      }
    }
  };

  return (
    <Pressable
      style={{
        marginTop: 20,
        width: CARD_WIDTH,
        marginHorizontal: 5,
      }}
      onPress={() => {
        router.push({
          pathname: "/product/[id]",
          params: {product: JSON.stringify(item)}
        });
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: CARD_WIDTH,
            height: imageHeight,
            resizeMode: "contain",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
          }}
        />

        {showHeart && (
          <Pressable
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: 12,
              right: 12,
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              elevation: 5,
            }}
            onPress={handleHeartPress}
          >
            {isFavorite ? (
              <RedHeart width={20} height={20} />
            ) : (
              <Heart width={20} height={20} />
            )}
          </Pressable>
        )}
      </View>

      <Text style={{ fontWeight: "700", fontSize: 18, marginTop: 6 }}>{item.name}</Text>

      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={{ fontSize: 15 }}>₦{Number(item.price).toLocaleString()}</Text>
        {item.discount && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {item.discount}
          </Text>
        )}
      </View>
    </Pressable>
  );
}