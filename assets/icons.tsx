import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

export const icons = {
    home: (props)=> <AntDesign name="home" size={26} {...props} />,
    records: (props)=> <FontAwesome name="child" size={26} {...props} />,
    reports: (props)=> <Feather name="compass" size={26} {...props} />,
    profile: (props)=> <FontAwesome name="user-circle-o" size={26} {...props} />,
    create: (props)=> <Ionicons name="add" size={26} {...props} />
}