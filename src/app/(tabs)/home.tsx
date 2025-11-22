import ColorList from '@/components/ColorList';
import colors from '@/constants/colors';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Home() {
  return (
    <ScrollView>
      <View>
        <ColorList color={colors.red}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});