import { FloatingButton } from '@/components/FloatingButton';
import TabBar from '@/components/TabBar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const tabBarHeight = React.useContext(BottomTabBarHeightContext) ?? 60;

  const screenConfig: Record<
    string,
    { route: string; visible: boolean }
  > = {
    '/records': { route: '/record/create', visible: true },
    '/reports': { route: '/report/create', visible: true },
  };

  const activeConfig = screenConfig[pathname];

  return (
    <View style={{ flex: 1 }}>
      <Tabs tabBar={props => <TabBar {...props} />}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Início',
            headerTitleAlign: 'center',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="records"
          options={{
            title: 'Fichas',
            headerTitleAlign: 'center',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="child" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="reports"
          options={{
            title: 'Relatórios',
            headerTitleAlign: 'center',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="folder-o" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            headerTitleAlign: 'center',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user-circle-o" color={color} />
            ),
          }}
        />
      </Tabs>

      <FloatingButton
        visible={!!activeConfig}
        route={activeConfig?.route}
        style={{
          bottom: tabBarHeight + insets.bottom + 30,
          right: 20,
        }}
      />
    </View>
  );
}
