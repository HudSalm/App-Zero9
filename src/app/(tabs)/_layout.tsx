import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tabs.Screen name="menu" options={{ title: "Menu" }} />
      <Tabs.Screen name="fuel" options={{ title: "Combustível" }} />
      <Tabs.Screen name="ocurrence" options={{ title: "Ocorrências" }} />
    </Tabs>
  );
}
