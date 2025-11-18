import ColorList from '@/components/ColorList';
import colors from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <View>
      <ColorList color={colors.orangeDark}/>
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