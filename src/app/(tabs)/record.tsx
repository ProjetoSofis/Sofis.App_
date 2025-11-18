import ColorList from '@/components/ColorList';
import colors from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

export default function Record() {
  return (
    <View>
      <ColorList color={colors.green}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});