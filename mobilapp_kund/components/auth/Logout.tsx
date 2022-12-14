import { View, Text, Button } from 'react-native';
import { Typography, Forms, Base } from '../../styles';

export default function Logout(props) {

    //Set all user info to empty
    async function logout(){
        props.setJwt("");
        props.setUserEmail("");
        props.setLoggedIn(false);
    }

    return (
        <View style={Base.logout }>
            <View style={Base.btn1}>
                <Button 
                    title="Log out"
                    onPress={logout}
                    color='white'
                />
            </View>
        </View>
    );
}
