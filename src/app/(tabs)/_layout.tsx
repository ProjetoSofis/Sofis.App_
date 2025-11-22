import TabBar from '@/components/TabBar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            letterSpacing: 0.5,
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: 'Fichas',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            letterSpacing: 0.5,
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="child" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Relatórios',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            letterSpacing: 0.5,
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="folder-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            letterSpacing: 0.5,
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
