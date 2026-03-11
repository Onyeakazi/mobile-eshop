import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import FilledStar from "../../../assets/vectors/Star.svg";
import WhiteStar from "../../../assets/vectors/White-Star.svg";
import { StatusBar } from "expo-status-bar";


export default function Notifications() {
  const [value, setValue] = useState(50);

  const data = [
    { label: "Recent", value: "recent" },
    { label: "Last", value: "Last" },
  ];

  // Rating Bar Component
  const RatingBar = ({ stars, percent }) => {

    return (

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
          <View
            style={[
              styles.barFill,
              { width: percent }
            ]}
          />
        </View>

      </View>

    );
  };

  // Review Item Component
  const ReviewItem = ({ name, time, text }) => (

    <View style={styles.reviewCard}>

      <Text style={styles.reviewStars}>
        <FilledStar width={16} height={16} />
        <FilledStar width={16} height={16} />
        <FilledStar width={16} height={16} />
        <FilledStar width={16} height={16} />
        <WhiteStar width={16} height={16} />
        
      </Text>

      <Text style={styles.reviewText}>
        {text}
      </Text>

      <Text style={styles.name}>
        {name} · <Text style={styles.time}>{time}</Text>
      </Text>

    </View>

  );

  return (
    <SafeAreaView style={{paddingHorizontal: 20, backgroundColor: "white"}}>
      <StatusBar style="dark" />
  
      {/* header section */}
      <Header backToHome={true} page={"Reviews"} />

      <View style={{ paddingBottom: 15, borderBottomWidth: 2, borderColor: "#E6E6E6"}}></View>

      {/* Rating Summary */}
      <View style={styles.summaryRow}>

        <Text style={styles.bigRating}>
          4.0
        </Text>

        <View>

          <View style={styles.stars}>
            <FilledStar width={23} height={23} />
            <FilledStar width={23} height={23} />
            <FilledStar width={23} height={23} />
            <FilledStar width={23} height={23} />
            <WhiteStar width={23} height={23} />
          </View>

          <Text style={styles.ratingCount}>
            1034 Ratings
          </Text>

        </View>

      </View>

      <View style={styles.barsContainer}>
        <RatingBar stars={5} percent="80%" />
        <RatingBar stars={4} percent="60%" />
        <RatingBar stars={3} percent="40%" />
        <RatingBar stars={2} percent="20%" />
        <RatingBar stars={1} percent="10%" />
      </View>

      <View style={{ marginVertical: 10, borderBottomWidth: 2, borderColor: "#E6E6E6"}}></View>

      {/* Reviews Header */}
      <View style={styles.reviewHeader}>

        <Text style={styles.reviewTitle}>
          45 Reviews
        </Text>

        <View
          style={{
            width: "26%"
          }}
        >
          <Dropdown
            style={{
              borderColor: "#808080",
              borderRadius: 8,
            }}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Most Relevant"
            value={value}
            selectedTextStyle={{
              fontSize: 12,
              color: "#808080"
            }}
            placeholderStyle={{
              fontSize: 12,
              color: "#808080"
            }}
            onChange={item => setValue(item.value)}
          />
        </View>

      </View>

      {/* Reviews List */}
      <ScrollView style={{marginBottom: "100%"}}
        showsVerticalScrollIndicator={false}
      >
        <ReviewItem
          name="Wade Warren"
          time="6 days ago"
          text="The item is very good, my son likes it very much and plays everyday."
        />

        <ReviewItem
          name="Guy Hawkins"
          time="1 week ago"
          text="The seller is very fast in sending packet, I just bought it and it arrived in just 1 day!"
        />

        <ReviewItem
          name="Robert Fox"
          time="2 weeks ago"
          text="I just bought it and the stuff is really good! I highly recommend it."
        />

        <ReviewItem
          name="Jerry Fox"
          time="2 weeks ago"
          text="Really good! I highly recommend it."
        />

        <ReviewItem
          name="Adam Fox"
          time="2 weeks ago"
          text="I just bought it and the stuff is really good! I highly recommend it."
        />

        <ReviewItem
          name="Guy Hawkins"
          time="1 week ago"
          text="The seller is very fast in sending packet, I just bought it and it arrived in just 1 day!"
        />

        <ReviewItem
          name="Robert Fox"
          time="2 weeks ago"
          text="I just bought it and the stuff is really good! I highly recommend it."
        />

        <ReviewItem
          name="Jerry Fox"
          time="2 weeks ago"
          text="Really good! I highly recommend it."
        />

        <ReviewItem
          name="Adam Fox"
          time="2 weeks ago"
          text="I just bought it and the stuff is really good! I highly recommend it."
        />
      </ScrollView>
      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  bigRating: {
    fontSize: 64,
    fontWeight: "bold",
    marginRight: 15
  },

  stars: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 5
  },

  ratingCount: {
    color: "#808080",
    fontSize: 16,
    marginTop: 2
  },

  barsContainer: {
    marginBottom: 10
  },

  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 5
  },

  starRow: {
    flexDirection: "row",
    gap: 7
  },

  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#E6E6E6",
    borderRadius: 10
  },

  barFill: {
    height: 6,
    backgroundColor: "#000",
    borderRadius: 10
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  reviewTitle: {
    fontWeight: "600",
    fontSize: 16
  },

  sort: {
    color: "#808080",
  },

  reviewCard: {
    paddingBottom: 15, 
    borderBottomWidth: 2, 
    borderColor: "#E6E6E6",
    marginBottom: 10
  },

  reviewText: {
    marginVertical: 8,
    color: "#808080",
    fontSize: 14
  },

  reviewStars: {
    fontSize: 16,
  },

  name: {
    color: "#1A1A1A",
    fontWeight: "800",
    fontSize: 12
  },

  time: {
    color: "#808080",
    fontWeight: "500",
    fontSize: 12
  }

})