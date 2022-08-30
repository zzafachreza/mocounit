import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text } from 'react-native';
import { colors, fonts } from '../../utils';
import Pdf from 'react-native-pdf';



export default function SHasil({ navigation, route }) {
    const source = { uri: route.params.pdf };

    // const source = { uri: "bundle-assets://pdf/4.pdf" };

    console.log(source)

    return (
        <View style={styles.container}>
            <View style={{
                height: 80,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 20
                }}>{route.params.judul}</Text>
            </View>

            <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});