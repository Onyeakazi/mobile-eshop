import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect } from "react";
import FilledStar from "../../../assets/vectors/Star.svg";
import WhiteStar from "../../../assets/vectors/White-Star.svg";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";

export default function Reviews() {
  const { productId } = useLocalSearchParams();

  const [value, setValue] = useState("recent");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = [
    { label: "Recent", value: "recent" },
    { label: "Lowest Rating", value: "low" },
    { label: "Highest Rating", value: "high" },
  ];

  // FETCH REVIEWS
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + `/reviews/${productId}`);

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.log("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    console.log(productId);
    if (productId) fetchReviews();
  }, [productId]);

  // FORMAT TIME
  const formatTime = (date) => {
    const diff = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} days ago`;
  };

  // SORT REVIEWS
  const sortedReviews = [...reviews].sort((a, b) => {
    if (value === "recent") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (value === "low") return a.rating - b.rating;
    if (value === "high") return b.rating - a.rating;
  });

  // CALCULATIONS
  const totalReviews = reviews.length;

  const avgRating =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percent = totalReviews ? (count / totalReviews) * 100 : 0;

    return {
      star,
      percent: `${percent}%`,
    };
  });

  // COMPONENTS
  const RatingBar = ({ stars, percent }) => (
    <View style={styles.barRow}>
      <View style={styles.starRow}>
        {[...Array(stars)].map((_, i) => (
          <FilledStar key={i} width={16} height={16} />
        ))}
        {[...Array(5 - stars)].map((_, i) => (
          <WhiteStar key={i} width={16} height={16} />
        ))}
      </View>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: percent }]} />
      </View>
    </View>
  );

  const ReviewItem = ({ name, time, text, rating }) => (
    <View style={styles.reviewCard}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {[...Array(rating)].map((_, i) => (
          <FilledStar key={i} width={16} height={16} />
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <WhiteStar key={i} width={16} height={16} />
        ))}
      </View>

      <Text style={styles.reviewText}>{text}</Text>

      <Text style={styles.name}>
        {name} · <Text style={styles.time}>{time}</Text>
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ padding: 20 }}>
        <Text>Loading reviews...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
      <StatusBar style="dark" />

      <Header backToHome={true} page={"Reviews"} />

      <View style={{ paddingBottom: 15, borderBottomWidth: 2, borderColor: "#E6E6E6" }} />

      {/* SUMMARY */}
      <View style={styles.summaryRow}>
        <Text style={styles.bigRating}>{avgRating.toFixed(1)}</Text>

        <View>
          <View style={styles.stars}>
            {[...Array(Math.round(avgRating))].map((_, i) => (
              <FilledStar key={i} width={23} height={23} />
            ))}
          </View>

          <Text style={styles.ratingCount}>
            {totalReviews} Ratings
          </Text>
        </View>
      </View>

      {/* BARS */}
      <View style={styles.barsContainer}>
        {ratingCounts.map((item) => (
          <RatingBar
            key={item.star}
            stars={item.star}
            percent={item.percent}
          />
        ))}
      </View>

      <View style={{ marginVertical: 10, borderBottomWidth: 2, borderColor: "#E6E6E6" }} />

      {/* HEADER */}
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewTitle}>
          {totalReviews} Reviews
        </Text>

        <View style={{ width: "30%" }}>
          <Dropdown
            style={{ borderColor: "#808080", borderRadius: 8 }}
            data={data}
            labelField="label"
            valueField="value"
            value={value}
            onChange={(item) => setValue(item.value)}
          />
        </View>
      </View>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedReviews.map((item) => (
          <ReviewItem
            key={item.id}
            name={item.user_name}
            time={formatTime(item.created_at)}
            text={item.comment}
            rating={item.rating}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  bigRating: {
    fontSize: 64,
    fontWeight: "bold",
    marginRight: 15,
  },

  stars: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },

  ratingCount: {
    color: "#808080",
    fontSize: 16,
  },

  barsContainer: {
    marginBottom: 10,
  },

  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 5,
  },

  starRow: {
    flexDirection: "row",
    gap: 5,
  },

  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
  },

  barFill: {
    height: 6,
    backgroundColor: "#000",
    borderRadius: 10,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  reviewTitle: {
    fontWeight: "600",
    fontSize: 16,
  },

  reviewCard: {
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: "#E6E6E6",
    marginBottom: 10,
  },

  reviewText: {
    marginVertical: 8,
    color: "#808080",
    fontSize: 14,
  },

  name: {
    color: "#1A1A1A",
    fontWeight: "800",
    fontSize: 12,
  },

  time: {
    color: "#808080",
    fontWeight: "500",
    fontSize: 12,
  },
});