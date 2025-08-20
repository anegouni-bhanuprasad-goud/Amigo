import {AntDesign, Ionicons, Feather} from '@expo/vector-icons'

export const icons = {
    index: (props) => <AntDesign name='home' size={26}  {...props} />,
    chats: (props) => <Ionicons name='chatbubble-outline' size={26}  {...props} />,
    help: (props) => <Feather name='info' size={26}  {...props} />,
    settings: (props) => <Ionicons name='settings-outline' size={26} {...props} />,
    about: (props) => <Feather name='help-circle' size={26} {...props} />,
  }