import React, { Component } from 'react'
import './MainFile.css'
import {getBubbleSortAnimations} from '../SortingAlgo/BubbleSort'
import { getMergeSortAnimations } from '../SortingAlgo/MergeSort'
import { Button } from '@material-ui/core'


const Speed = 15;
const bars = 310;
const PRIMARY_COLOR = 'green';
const SECONDARY_COLOR = 'red';
const SORTED_COLOR = 'blue';

class MainFile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             array: [],
        };
    }

    componentDidMount(){
        this.setArray();
    }

    setArray(){
        const array = [];
        for(let i=0;i<bars;i++){
            array.push(randomIntFromIntervals(5,500))
        }
        this.setState({array})
    }

    BubbleSort(){
        const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparison, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * Speed);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * Speed);  
            }
        }
    }

    mergeSort(){
       const[animations,sortArray] = getMergeSortAnimations(this.state.array);
       for(let i=0;i<animations.length;i++){
        const isColorChange = animations[i][0] == "comparison1" || animations[i][0] == "comparison2";
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true) {
            const [comparison, barOneIndex, barTwoIndex] = animations[i];
            const color = (animations[i][0] == "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i *  Speed);
            
        }
        else {
            setTimeout(() => {
                const [overwrite, barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              },i * Speed);
        }
    }
       }
    
    render() {
        const {array} = this.state;
        return (
            <div className = "array-container">
                {array.map((value,idx) => (
                    <div className = "array-bar"
                    key = "idx" style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                      }}></div>
                ))}
                <Button variant="contained" color="primary" onClick = {() => {this.setArray()}}>Generate new Array</Button> <br />
                <Button variant="contained" color="primary" onClick={() => this.mergeSort()}>Merge Sort</Button> <br />
                <Button variant="contained" color="primary" onClick={() => this.quickSort()}>Quick Sort</Button> <br />
                <Button variant="contained" color="primary" onClick={() => this.heapSort()}>Heap Sort</Button> <br />
                <Button variant="contained" color="primary" onClick={() => this.BubbleSort()}>Bubble Sort</Button>
            </div>
        )
    }
}

function randomIntFromIntervals(min,max){
    return Math.floor(Math.random() * (max-min+1)+min)
}
function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}


export default MainFile
