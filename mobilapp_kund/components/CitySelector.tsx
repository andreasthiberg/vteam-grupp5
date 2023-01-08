import { ScrollView, View, Button } from "react-native";
import { Base } from '../styles';
// import { Picker } from '@react-native-picker/picker';



export default function CitySelector({ setCity }) {
    return (
        <>
            <View style={Base.btn3}>
                <Button 
                    title="Stockholm" 
                    color="white"
                    onPress={() => setCity('stockholm')} />
            </View>
            <View style={Base.btn3}>
                <Button 
                    title="Lund"
                    color="white"
                    onPress={() => setCity('lund')} />
            </View>
            <View style={Base.btn3}>
                <Button 
                    title="Malmö" 
                    color="white"
                    onPress={() => setCity('malmo')} />
            </View>
        </>
        // <Picker>
        //     <Picker.Item label="Stockholm" value="stockholm" />;
        //     <Picker.Item label="Lund" value="lund" />;
        //     <Picker.Item label="Malmo" value="malmo" />;
        // </Picker>
            
    )
}
