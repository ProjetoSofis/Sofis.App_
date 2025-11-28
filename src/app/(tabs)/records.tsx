import ColorList from '@/components/ColorList';
import colors from '@/constants/colors';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Record() {
  return (
    <ScrollView>
      <View>
        <ColorList color={colors.green} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});