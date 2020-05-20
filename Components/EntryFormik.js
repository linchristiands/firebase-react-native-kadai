import * as Yup from 'yup'
import {Formik} from 'formik'
import RNPickerSelect from 'react-native-picker-select'
import React, { Component } from 'react'
import {TextInput,Text,Button,ScrollView,View,StyleSheet,YellowBox, SafeAreaView} from 'react-native'
import Toast,{DURATION} from 'react-native-easy-toast'
import firebase from './../firebase'

const styles= StyleSheet.create({
    TextInput:{borderColor:'#4472C4',borderWidth:1,margin:10,padding:5},
    Text:{margin:10},
    Error:{color:'red',margin:10},
    Picker:{borderColor:'#4472C4',borderWidth:1,margin:10},
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop:30,
      },
})
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default class EntryFormik extends Component
{
    constructor(props)
    {
        super(props);
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.state={disable:false};
        this.createUserInDatabase=this.createUserInDatabase.bind(this);
    }
    createUserInDatabase(data){
        const db = firebase.firestore();
        data['timestamp']=timestamp();
        //console.log(data);
        db.collection("users").add(data)
        .then((docRef)=>{
          //console.log("Document written with ID: ", docRef.id);
          // add confirmation for user
          var sendMail = firebase.functions().httpsCallable('confirmationMail');
            //console.log("sendConfirmMail");
            this.setState({disable:false});
            sendMail({data:{name:'username',to:"recipient"}}).then((result)=>{
               this.refs.toast.show('エントリー誠にありがとうございます。メールを確認してください!',DURATION.LENGTH_LONG,()=>{}); 
               // console.log("mail sent");
            }).catch(function(error){
                //console.error("mail service error")
            });
        })
        .catch(function(error){
         // console.error("Error adding document: ", error);
        });
      }
    render(){
        return(
            <SafeAreaView style={{ flex: 1,backgroundColor: 'white',}}>
            <View style={styles.container}>

            <ScrollView style={{flex:1,backgroundColor:'white'}}>
            <Text style={{textAlign:'center'}}>【求人エントリー】</Text>
            <Formik styles={{flex:1}}
            initialValues={{
                name:'',
                email:'',
                age:'',
                job:'',
                motivation:'',
                status:'受付',
            }}
            onSubmit={(values)=>{
                this.setState({disable:true});
                this.createUserInDatabase(values)
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .matches("[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[a-zA-Z]",{
                        message:'漢字・ひらがな・カタカナ・ロマ字',
                        excludeEmptyString: true})
                    .required('必須'),
                email: Yup.string()
                    .email('メールが無効です')
                    .required('必須'),
                age: Yup.number()
                    .typeError("数字にみ")
                    .required('必須'),
                job:Yup.string().min(1,'必須')
                    .required('必須'),
                motivation: Yup.string()
                    .required('必須'),
            })}
            >
                {({handleChange,handleSubmit,setFieldTouched,touched,values,errors})=>( 
                <View>
                    <Text style={styles.Text}>氏名</Text>
                    <TextInput  onBlur={()=>setFieldTouched('name')} style={styles.TextInput} onChangeText={handleChange('name')}
                        value={values.name}
                    />
                    {errors.name && touched.name &&
                        <Text style={styles.Error}>{errors.name}</Text>
                    }
                    <Text style={styles.Text}>Email</Text>
                    <TextInput style={styles.TextInput} onBlur={()=>setFieldTouched('email')}  onChangeText={handleChange('email')}
                        value={values.email}
                    />
                    {errors.email && touched.email &&
                        <Text style={styles.Error}>{errors.email}</Text>
                    }
                    <Text style={styles.Text}>年齢</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput keyboardType='numeric' onBlur={()=>setFieldTouched('age')}  maxLength={2} style={[styles.TextInput,{flex:2}]} onChangeText={handleChange('age')}
                        value={values.age}
                    />
                    <Text style={[styles.Text,{flex:1}]}>歳</Text>
                    </View>
                    {errors.age && touched.age &&
                        <Text style={styles.Error}>{errors.age}</Text>
                    }

                    <Text style={styles.Text}>希望職種</Text>
                    <View style={styles.TextInput}>
                    <RNPickerSelect onBlur={()=>setFieldTouched('job')}  onValueChange={handleChange('job')} value={values.job}
                    placeholder={{}}
                    items={[
                        {label:'選択してください',value:''},
                        {label:'事業　ー　サービス企画',value:'事業　ー　サービス企画'},
                        {label:'プログラマ',value:'プログラマ'},
                        {label:'ブロックチェーンエンジニア',value:'ブロックチェーンエンジニア'},
                        {label:'フロントエンドエンジニア',value:'フロントエンドエンジニア'},
                        {label:'イラストレーター（デザイナー）',value:'イラストレーター（デザイナー）'},
                        {label:'運転手',value:'運転手'},
                    ]}
                    
                    />
                    </View>
                    {errors.job && touched.job &&
                        <Text style={styles.Error}>{errors.job}</Text>
                    }
                    <Text style={styles.Text}>希望理由</Text>
                    <TextInput multiline={true} onBlur={()=>setFieldTouched('motivation')}  style={[styles.TextInput,{height:100,textAlignVertical:"top"}]} onChangeText={handleChange('motivation')}
                        value={values.motivation}
                    />
                     {errors.motivation && touched.motivation &&
                        <Text style={styles.Error}>{errors.motivation}</Text>
                    }
                        <View style={{margin:10}}>
                            <Button onPress={handleSubmit} disabled={this.state.disable}  title="申し込み"/>
                        </View>
                </View>
                )}
            </Formik>
            </ScrollView>         
            </View>
            <Toast ref='toast'/>
            </SafeAreaView>
        );
    }
}