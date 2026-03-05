import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header";
import PaymentCard from "../../../assets/vectors/payment-card.svg";
import Discount from "../../../assets/vectors/Discount-duotone.svg";
import Wallet from "../../../assets/vectors/Wallet-duotone.svg";
import Location from "../../../assets/vectors/Location-duotone.svg";
import Profile from "../../../assets/vectors/profile.svg";

export default function Notifications() {
    return (
        <SafeAreaView style={{paddingHorizontal: 20}}>
    
        {/* header section */}
        <Header backToHome={true} page={"Notifications"} />

         {/* Other pages */}
        <View>
            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginBottom: 25}}></View>

            <View style={{flexDirection: "colunm", justifyContent: "space-between", marginBottom: 20}}>
                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                
                    <Text style={{fontSize: 16, fontWeight: 700}}>Today</Text>

                </View>
                <View style={{marginTop: 20, flexDirection: "row", alignItems: "center", gap: 20}}>
                    <Discount width={24} height={24} />
                    <View>
                        <Text style={{fontSize: 14, fontWeight: 700, marginBottom: 7}}>30% Special Discount</Text>
                        <Text style={{fontSize: 12, fontWeight: 400, fontStyle: "general sans"}}>Special promotion only valid today</Text>
                    </View>
                </View>

            </View>

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6"}}></View>

           <View style={{flexDirection: "colunm", justifyContent: "space-between", marginTop: 20}}>
                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                
                    <Text style={{fontSize: 16, fontWeight: 700}}>Yesterday</Text>

                </View>
                <View style={{marginTop: 20, flexDirection: "row", alignItems: "center", gap: 20}}>
                    <Wallet width={24} height={24} />
                    <View>
                        <Text style={{fontSize: 14, fontWeight: 700, marginBottom: 7}}>Top Up E-wallet successfully</Text>
                        <Text style={{fontSize: 12, fontWeight: 400, fontStyle: "general sans"}}>You have top up your wallet</Text>
                    </View>
                </View>

                <View style={{width: "10px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20, marginLeft: 46}}></View>

                <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
                    <Location width={24} height={24} />
                    <View>
                        <Text style={{fontSize: 14, fontWeight: 700, marginBottom: 7}}>No Services Available!</Text>
                        <Text style={{fontSize: 12, fontWeight: 400, fontStyle: "general sans"}}>Now you can track order in real-time.</Text>
                    </View>
                </View>

            </View>

            <View style={{width: "100px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20}}></View>

            <View style={{flexDirection: "colunm", justifyContent: "space-between"}}>
                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                
                    <Text style={{fontSize: 16, fontWeight: 700}}>February 23, 2026</Text>

                </View>
                <View style={{marginTop: 20, flexDirection: "row", alignItems: "center", gap: 20}}>
                    <PaymentCard width={24} height={24} />
                    <View>
                        <Text style={{fontSize: 14, fontWeight: 700, marginBottom: 7}}>Credit Card Connected!</Text>
                        <Text style={{fontSize: 12, fontWeight: 400, fontStyle: "general sans"}}>Credit Card has being linked.</Text>
                    </View>
                </View>

                <View style={{width: "10px", height: 2, backgroundColor: "#e6e6e6", marginVertical: 20, marginLeft: 46}}></View>

                <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
                    <Profile width={24} height={24} />
                    <View>
                        <Text style={{fontSize: 14, fontWeight: 700, marginBottom: 7}}>Account Setup Successfully!</Text>
                        <Text style={{fontSize: 12, fontWeight: 400, fontStyle: "general sans"}}>Your account has being created.</Text>
                    </View>
                </View>

            </View>
            

            
        </View>

        {/* No notification */}
        {/* <View style={{ justifyContent: "center", alignItems: "center", marginTop: 250 }}>
            <Bell width={60} height={60} color="#9e9e9e"/>

            <Text style={{ fontSize: 20, fontWeight: 700, marginTop: 10 }}>
                You haven't gotten any
            </Text>

            <Text style={{ fontSize: 20, fontWeight: 700 }}>
                notification yet!
            </Text>

            <Text style={{ color: "#666", marginTop: 20 }}>
                We'll alert you when something 
            </Text>
            <Text style={{ color: "#666" }}>
                cool happens.
            </Text>
        </View> */}

        </SafeAreaView>
    )
}