import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react'
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar'

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props=> <TabBar {...props} />}
    >
      
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: 'Fichas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="child" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Relatórios',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="folder-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
