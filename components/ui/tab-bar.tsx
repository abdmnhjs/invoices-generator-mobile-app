import { View, Platform } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View className="flex-row items-center justify-center mb-10 mx-auto border border-border shadow-xs bg-white p-2 rounded-full">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="px-4 py-2 flex flex-col items-center justify-center"
            pressOpacity={1}
            pressColor="transparent"
            android_ripple={null}
          >
            {options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? "#1B512D" : "#222",
              size: 24,
            })}
            <Text
              style={{ color: isFocused ? "#1B512D" : "#222", marginTop: 4 }}
            >
              {label as string}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
