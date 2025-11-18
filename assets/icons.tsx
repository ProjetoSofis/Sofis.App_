import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

export const icons = {
    home: (props)=> <AntDesign name="home" size={26} {...props} />,
    record: (props)=> <FontAwesome name="child" size={26} {...props} />,
    reports: (props)=> <Feather name="compass" size={26} {...props} />,
    profile: (props)=> <FontAwesome name="user-circle-o" size={26} {...props} />,
}