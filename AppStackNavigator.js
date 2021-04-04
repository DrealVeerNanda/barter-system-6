import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import RecieversDetailScreen from '../screens/RecieverDetails';

export const AppStackNavigator = createStackNavigator({
    BookDonateList: {screen: BookDonateScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    RecieversDetails: {screen: RecieversDetailScreen,
        navigationOptions: {
            headerShown: false
        }
    },
},
    {initialRouteName : 'BookDonateList'
    
});