import React, { useState, useCallback } from 'react';
import {
  Image,
  Switch,
  ImageBackground,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { logout } from '../redux/action';
import { COLORS, icons, SIZES, images, darkFONTS, lightFONTS } from '../constants';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const UI = (props) => {
  return (
    <TouchableOpacity onPress={props.press} style={styles.infoCard}>
      <View style={styles.iconCard}>
        <Image source={props.icon} style={{ width: 20, height: 20 }} />
      </View>
      <View style={styles.textCard}>
        <Text style={{ ...lightFONTS.h5 }}>{props.title}</Text>
        <Text style={{ ...lightFONTS.body5 }}>{props.titleInfo}</Text>
      </View>
      <View style={styles.gotoCard}>
        <Image source={props.goto} style={{ width: 15, height: 15 }} />
      </View>
    </TouchableOpacity>
  );
};

const MyProfile = ({navigation}) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [darkEnabled, setDarkEnabled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  }

  const darkModeSwitch = () => {
    setDarkEnabled((previousState) => !previousState);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  }

  console.log(user);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView
        // bounces = {false}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.avatarSection}>
          <ImageBackground style={styles.avatar}>
              <Avatar.Image
                size={100}
                source={{ uri: user.avatarUrl.url }}
                style={{ backgroundColor: '#1ab65c', alignSelf: 'center' }}
              />
          </ImageBackground>
          <Text onPress={() => navigation.navigate('editProfile')} style={{...lightFONTS.body3, color:COLORS.blue}}>Edit Profile</Text>
          <View>
            <View style={styles.infoSection}>
              <UI
                icon={icons.user}
                title="My Account"
                titleInfo="Make changes to your account"
                goto={icons.goto}
                press={() => navigation.navigate('editProfile')}
              />
              <UI
                icon={icons.user}
                title="Saved Beneficiary"
                titleInfo="Manage your saved accounts"
                goto={icons.goto}
              />
              <Pressable style={styles.infoCard}>
                <View style={styles.iconCard}>
                  <Image source={icons.lock} style={{ width: 20, height: 20 }} />
                </View>
                <View style={styles.textCard}>
                  <Text style={{ ...lightFONTS.h5 }}>Face ID/Touch ID</Text>
                  <Text style={{ ...lightFONTS.body5 }}>Manage your account security</Text>
                </View>
                <View style={styles.gotoCard}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </Pressable>
              <Pressable style={styles.infoCard}>
                <View style={styles.iconCard}>
                  <Image source={icons.dark} style={{ width: 20, height: 20 }} />
                </View>
                <View style={styles.textCard}>
                  <Text style={{ ...lightFONTS.h5 }}>Dark Mode</Text>
                  <Text style={{ ...lightFONTS.body5 }}>Turn On/Off dark mode</Text>
                </View>
                <View style={styles.gotoCard}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={darkModeSwitch}
                    value={darkEnabled}
                  />
                </View>
              </Pressable>
              <UI
                icon={icons.secure}
                title="Two-Factor Authentication"
                titleInfo="Further secure your account for safety"
                goto={icons.goto}
              />
              <UI
                icon={icons.logout}
                title="Log out"
                titleInfo="Log out of yor account"
                goto={icons.goto}
                press={handleLogout}
              >
                <Switch />
              </UI>
            </View>
          </View>
          <View style={[styles.infoSection, { height: 130 }]}>
            <UI icon={icons.support} title="Help & Support" goto={icons.goto} />
            <UI icon={icons.lock} title="About App" goto={icons.goto} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: 88
  },
  avatarSection: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: SIZES.padding2,
    alignItems: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    margin: SIZES.padding,
    marginBottom: SIZES.padding2*2,
  },
  infoSection: {
    width: SIZES.width - 50,
    height: SIZES.height * 420 / SIZES.height,
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.darkgray,
    flexDirection: 'column',
    margin: SIZES.padding,
    padding: 8,
    borderRadius: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding
  },
  iconCard: {
    flex: 0.4,
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.padding
  },
  textCard: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginHorizontal: SIZES.padding
  },
  gotoCard: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export default MyProfile;