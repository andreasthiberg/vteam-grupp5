import { View, Text, TextInput, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields ({ auth, setAuth, submit, title, navigation}) {
    
    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Not valid email",
                description: "Email must be like cccc@cc.cc",
                type: "warning"
            })
        }
    }

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
        // ^                    : Start
        // (?=.*\d)             : Digits
        // (?=.*[a-z])          : lower Letters
        // (?=.*[A-Z])          : upper Letters
        // (?=.*[!\.-\?])       : Special characters
        // (?=.{4,})            : Length
        // $
        if (!text.match(pattern)) {
            showMessage({
                message: "Not valid password",
                description: "Password must contain at least four characters, lowercase and uppercase character, number and a special character",
                type: "warning"
            })
        }
    }
    
    return (
    <View style={{ ...Base.base }}>
        <Text style={{ ...Typography.header2 }}>{title}</Text>
        <Text style={{ ...Typography.label}}>E-post</Text>
        <TextInput
            style={{ ...Forms.input }}
            onChangeText={(content:string) => {
                validateEmail(content);
                setAuth({ ...auth, email:content })
            }}
            value={auth?.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            testID="email-field"
        />

        <Text style={{ ...Typography.label}}>Lösenord</Text>
        <TextInput
            style={{ ...Forms.input }}
            onChangeText={(content:string) => {
                validatePassword(content);
                setAuth({ ...auth, password:content })
            }}
            value={auth?.password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            testID="password-field"
        />
        <View style={Base.btn1}>
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`${title} genom att trycka`}
                color='white'
            />
        </View>
    </View>
    );
}
