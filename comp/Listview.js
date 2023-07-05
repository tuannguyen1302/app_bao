import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Listview = () => {
  return (
    <View>
            <FlatList
                data={dataNe}
                renderItem={({ item }) => <ItemList dulieu={item} />}
                keyExtractor={item => item._id}

            />
        </View>
  )
}

export default Listview

const styles = StyleSheet.create({})