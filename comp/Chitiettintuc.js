import { StyleSheet, Text,Image, View } from 'react-native'
import React, { useState } from 'react'

const Chitiettintuc = (props) => {
   
  const [tieude, settieude] = useState(props.item.title);
  const [noidung, setnoidung] = useState(props.item.content);
  
  const [img_source, setimg_source] = useState(null)
  const [image, setiimage] = useState(props.item.image)
  let id = props.item.id;
  let obj_post = { title: tieude, content: noidung };
  let url_api = "http://192.168.1.111:3000/danhsach/"+ id;
  fetch(url_api,{
      method:'GET',
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj_post)
  })
  .then((res)=>{
      if(res.status==200){
          alert("Sua thanh cong")
      }
  })
  .catch((ex)=>{
      console.log(ex)
  })

  return (
   
    <View  >
     
    <Text style={{fontSize:20}}>
     Thông tin bài viết : {"\n"}
   <Text value ={tieude} >

   </Text>
   <Text value ={noidung} >

   </Text>

    </Text>
 </View>


  )
}

export default Chitiettintuc

const styles = StyleSheet.create({

})