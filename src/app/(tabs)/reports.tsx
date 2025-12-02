// import GlobalList from '@/components/GlobalList';
// import ReportCard from '@/components/ReportCard';
// import { useReportsContext } from '@/mock/reports';
// import { useRouter } from 'expo-router';
// import { ScrollView, StyleSheet } from 'react-native';

// export default function Reports() {
//   const { reports } = useReportsContext();
//   const router = useRouter();

//   function handleOpen(item) {
//     router.push(`/(actions)/report/${item.id}`);
//   }
//   return (
//     <ScrollView contentContainerStyle={{
//       paddingBottom: 120,
//     }}>
//       <GlobalList
//         data={reports}
//         renderItem={(item) => (
//           <ReportCard item={item} onPress={handleOpen} />
//         )}
//       />
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });