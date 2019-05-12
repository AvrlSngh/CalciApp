import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class HelloWorldApp extends Component {

  constructor(){
    super()
    this.state = {
      resultText: "",
      calText: ""
    }
    this.operations = ['DEL','+', '-', '*', '/']
  }

  calculateResult() {
    const text =this.state.resultText
    this.setState({
      calText: eval(text)
    })
  }

  validate() {
    const text = this.state.resultText
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
          return false
    }
    return true
  }

  buttonPressed(text) {
    if(text == '='){
      return this.validate() && this.calculateResult()
    }
    this.setState({
      resultText: this.state.resultText + text
    })
  }

  operate(operation) {
    switch(operation) {
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
          const lastChar = this.state.resultText.split('').pop()
          //
          if(this.operations.indexOf(lastChar) > 0) return

          if(this.state.text == "") return
          this.setState({
            resultText: this.state.resultText + operation
          })
    }
  }

  render(){
        let rows = []
        let nums = [[1,2,3], [4,5,6], [7,8,9], [0, '.', '=']]
        for(let i=0;i<4;i++){
          let row = [];
          for(let j=0;j<3;j++){
            row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
                    <Text style={styles.btntext}>{nums[i][j]}</Text>
              </TouchableOpacity>)
          }
          rows.push(<View key={i}style={styles.row}>{row}</View>)
        }


        let ops = [];
        for(let i=0;i<5;i++){
          ops.push(
            <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress = {() => this.operate(this.operations[i])}>
                  <Text style={styles.opstext}>{this.operations[i]}</Text>
            </TouchableOpacity>)
        }

    return(
        <View style={styles.container}>
          <View style={styles.result}>
          <Text style={styles.restext}>{this.state.resultText}</Text>
          </View>
          <View style={styles.calculation}>
          <Text style={styles.caltext}>{this.state.calText}</Text>
          </View>
          <View style={styles.buttons}>
                <View style={styles.numbers}>
                    {rows}
                </View>
                <View style={styles.operations}>
                  {ops}
                </View>
          </View>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    result: {
      flex: 3,
      flexDirection: 'row',
      backgroundColor: '#1b1b1c',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    restext:{
      color: '#d9d9dd',
      fontSize: 64,

    },
    calculation: {
      flex: 1,
      backgroundColor: '#042b6d',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    caltext:{
      color: '#d9d9dd',
      fontSize: 42,
    },
    buttons: {
      flex: 6,
      flexDirection: 'row',
      justifyContent:'center',
    },
    numbers: {
      flex: 3,
      backgroundColor: '#1b1b1c',
    },
    operations: {
      flex: 1,
      backgroundColor: '#042b6d',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around'
    },
    btntext: {
      padding: 30,
      color: '#d9d9dd',
      justifyContent:'space-around',
      fontSize: 46,
      borderRadius: 50
    },
    opstext: {
      color:"white",
      padding: 20,
      fontSize: 43,
      textAlign: 'center'
    }
  });
