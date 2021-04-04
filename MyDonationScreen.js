import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends React.Component() {
    constructor(){
        super()
        this.state = {
            donorId: firebase.auth.currentUser.email,
            donorName: "",
            allDonations: []
        }
        this.requestRef = null
    }
    static navigationOptions = {header: null};

    getDonorDetails=(donorId)=>{
        db.collection("users").where("email_id","==", donorId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              "donorName" : doc.data().first_name + " " + doc.data().last_name
            })
          });
        })
      }

      getAllDonations =()=>{
        this.requestRef = db.collection("all_donations").where("donor_id" ,'==', this.state.donorId)
        .onSnapshot((snapshot)=>{
          var allDonations = []
          snapshot.docs.map((doc) =>{
            var donation = doc.data()
            donation["doc_id"] = doc.id
            allDonations.push(donation)
          });
          this.setState({
            allDonations : allDonations
          });
        })
      }
   sendBook = (bookDetails) => {
    if(bookDetails.request_status === "book sent") {
        var request_status = "donor interested"
        db.collection("all_donations").doc(bookDetails.doc_id).update({
            "request_status": "donor interested"
        })
        this.sendNotification(bookDetails, request_status)
    }
    else {
        var requestStatus = "book sent"
        db.collection("all_donations").doc(bookDetails.doc_id).update({
            "request_status": "book sent"
        })
        this.sendNotification(bookDetails, requestStatus)
    }
   }

   sendNotification=(bookDetails,requestStatus)=>{
    var requestId = bookDetails.request_id
    var donorId = bookDetails.donor_id
    db.collection("all_notifications")
    .where("request_id","==", requestId)
    .where("donor_id","==",donorId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "Book Sent"){
          message = this.state.donorName + " sent you book"
        }else{
           message =  this.state.donorName  + " has shown interest in donating the book"
        }
        db.collection("all_notifications").doc(doc.id).update({
          "message": message,
          "notification_status" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
    }//stopped here
}