import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styled } from 'styled-components/native';

  const MainContainer = styled(View)`
    display: flex;
    flex: 1;
    align-items: center;
    background-color: #F5FCFF;
  `;

  const Img = styled(Image)`
    width: 200px;
    height: 200px;
  `;

  const Input = styled(TextInput)`
    height: 40px;
    border-color: gray;
    border-width: 1px;
    width: 80%;
    margin-top: 20px;
    padding: 10px;
  `;
  
  const Btn = styled(TouchableOpacity)`
    margin-top: 20px;
    padding: 8px;
    width: 80%;
    align-items: center;
    background-color: #000000;
  `;

  const Txt = styled(Text)`
    color: white;
    font-size: 16px;
  `;


export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = (message: string): void => {
    Alert.alert("Validation Result", message);
  }

  const handleClick = () => {
    let errors = '';

    if(email.trim() === '' && password.trim() === '') {
      showAlert('Email and Password cannot be empty.');
      return;
    }
    if(email.trim() === '') {
      errors += 'Email cannot be empty.\n';
    }
    if(password.trim() === '') {
      errors += 'Password cannot be empty.\n';
    }

    if (errors) {
      showAlert(errors.trim());
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors += 'Invalid email format.\n';
    }
    if (password.trim().length < 8) {
      errors += 'Password must be at least 8 characters long.\n';
    }
    
    if (!/[A-Z]/.test(password)) {
      errors += 'Password must contain at least one uppercase letter.\n';
    }
    if (!/[a-z]/.test(password)) {
      errors += 'Password must contain at least one lowercase letter.\n';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors += 'Password must contain at least one special character.\n';
    }

    if (/^[0-9!@#$%^&*()_+]+$/.test(password)) {
      errors += 'Password must contain at least one letter.\n';
    }

    showAlert(errors ? errors.trim() : 'Success!.');
  };

  return (
    <MainContainer>
      <Img source={require('../assets/images/meme.png')} testID="image"/>
      <Input placeholder="Type your email here" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input placeholder="Type your password here" value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Btn  onPress={handleClick}>
        <Txt>Submit</Txt>
      </Btn>
    </MainContainer>
  );

  
}
