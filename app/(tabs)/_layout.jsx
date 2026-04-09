import { Tabs } from "expo-router";
import Home from "../../assets/vectors/home.svg"
import Search from "../../assets/vectors/search.svg"
import Saved from "../../assets/vectors/saved.svg"
import Cart from "../../assets/vectors/cart.svg"
import Profile from "../../assets/vectors/profile.svg"

export default function TabsLayout() {
    return(
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "#9e9e9e",

                tabBarStyle: {
                    height: 75,
                    paddingTop: 10,
                    paddingBottom: 15,
                },

                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: 700
                },
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size, focused}) => (
                        <Home width={size} height={size} color={focused ? "black": "#9e9e9e"} />
                    ),
                }}
            />

            <Tabs.Screen 
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({color, size, focused}) => (
                        <Search width={size} height={size} color={focused ? "black": "#9e9e9e"} />
                    )
                }}
            />

            <Tabs.Screen 
                name="saved"
                options={{
                    title: "Saved",
                    tabBarIcon: ({color, size, focused}) => (
                        <Saved width={size} height={size} color={focused ? "black": "#9e9e9e"} />
                    )
                }}
            />

            <Tabs.Screen 
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({color, size, focused}) => (
                        <Cart width={size} height={size} color={focused ? "black": "#9e9e9e"} />
                    )
                }}
            />

            <Tabs.Screen 
                name="account"
                options={{
                    title: "Account",
                    tabBarIcon: ({color, size, focused}) => (
                        <Profile width={size} height={size} color={focused ? "black": "#9e9e9e"} />
                    )
                }}
            />

        </Tabs>
    )
}