const Calculator ={
  //display a 0 value
    Display_Value:0,
    //this will hold the first operand, but it will display null for now. 
    First_Operand:null,
    //this checks whether or not the input has been put in. 
    Wait_Second_Operand:false,
    //this will hold the operator it's null for now. 
    operator:null,
};

//this modifies values each time a button is clicked

function Input_Digit(digit){
    const{ Display_Value, Wait_Second_Operand }= Calculator;
    //we are waiting to see if the second operand is true and set
    //display value to the key that was clicked
    if (Wait_Second_Operand === true){
        Calculator.Display_Value =digit;
        Calculator.Wait_Second_Operand = false;
    }
    else{
        //this overwrites Display_Value if the current value is 0
        //otherwiase this adds onto it. 
        Calculator.Display_Value = Display_Value ==='0'? digit : Display_Value + digit;
    }
}

//this section handles the decimal place

function Input_Decimal(dot) {
    // this insures that accidental clicking of the decimal point
    //doesn't affect your calculation
    if(Calculator.Wait_Second_Operand === true) return;
    if(!Calculator.Display_Value.includes(dot)){
        //we are saying that if the display value does not contain a decimal point
        //we want to add a decimal point
        Calculator.Display_Value += dot;
    }
}

//this section handles operations
function Handle_Operator(Next_Operator){
        const {First_Operand, Display_Value, operator } = Calculator
        //when an operator key is first pressed, we convert the current number
        //displayed on th screen to a number an dthen store the result in 
        //Calculator.First_Operand if it doesn't already exist
        const Value_Of_Input  = parseFloat(Display_Value);
        // this checks if an operator already exists and if Wait_Second_Operand is true,
        //then updates the operator and exits from the function
        if (operator && Calculator.Wait_Second_Operator) {
        Calculator.operator = Next_Operator;
        return;
        }

         if(First_Operand == null) {
        Calculator.First_Operand = Value_Of_Input;}
        else if (operator) { 
            //checks if an operator already exits
            const Value_Now = First_Operand || 0;
            //if an operator exits, property look up is performed for the operator
            //in the Perform_Calculation opbet and the function that matches the operator is executed
            let result = Perform_Calculation[operator](Value_Now, Value_Of_Input);
            result = Number(result) .toFixed(9)
            //this will remove any trailing 0s
            result= (result * 1).toString()
            Calculator.Display_Value = (result);
            Calculator.First_Operand = result;
        }
        Calculator.Wait_Second_Operand =true;
        Calculator.operator = Next_Operator;
    }

const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) =>  Second_Operand,
};

function Calculator_Reset(){
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;

}

// this function updates the screen with the contents of Display_Value

function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;

}

//Update Display Function
//This Function monitors button clicks. 
Update_Display();
const keys = document.querySelector('.calculator_keys');
keys.addEventListener('click', (event) => {
    //the target variableis an object that represents the element
    //that was clicked. 
    const { target } = event;
    //if the button clicked on was not a button exit the function
    if (!target.matches('button')){
        return;
    }

    if (target.classList.contains('operator')){
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains('decimal')){
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    //this ensures that the clear all button clears the numbers from the calculator

if (target.classList.contains('all-clear')) {
    Calculator_Reset();
    Update_Display();
    return;
}

Input_Digit(target.value);
Update_Display();
})
