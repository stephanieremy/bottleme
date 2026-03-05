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
import BottlesContextProvider from "./api/bottle-context";
import RecentBottles from "./screens/RecentBottle";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
    const queryClient = new QueryClient()

  function BottlesOverview() {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
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

  return (
      <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <BottlesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
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
      </BottlesContextProvider>
    </QueryClientProvider>
  );
}
