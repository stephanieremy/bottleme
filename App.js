import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageBottle from "./screens/ManageBottle";
import AllBottles from "./screens/AllBottles";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./UI/IconButton";
import { BottlePages } from "./constants/bottlePages";
import RecentBottles from "./screens/RecentBottle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import {
  PlayfairDisplay_700Bold,
  PlayfairDisplay_900Black,
} from "@expo-google-fonts/playfair-display";
import { CormorantGaramond_400Regular_Italic } from "@expo-google-fonts/cormorant-garamond";
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from "@expo-google-fonts/dm-sans";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottlesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#1E1A14" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#1E1A14" },
        tabBarActiveTintColor: "#1E1A14",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate(BottlePages.ManageBottle);
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name={BottlePages.RecentBottles}
        component={RecentBottles}
        options={{
          title: "Recent Bottles",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name={BottlePages.AllBottles}
        component={AllBottles}
        options={{
          title: "All Bottles",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay: PlayfairDisplay_700Bold,
    PlayfairDisplayBlack: PlayfairDisplay_900Black,
    CormorantGaramond: CormorantGaramond_400Regular_Italic,
    DMSans: DMSans_400Regular,
    DMSansMedium: DMSans_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#1E1A14" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name={"BottlesOverview"}
            component={BottlesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={BottlePages.ManageBottle}
            component={ManageBottle}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
