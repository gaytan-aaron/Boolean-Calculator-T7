import '../css/componentes.css';
import * as CRUD from './crud-provider';

//Referencias en el HTML
const btnP = document.querySelector('#n1');
const btnQ = document.querySelector('#n2');
const btnR = document.querySelector('#n3');
const btnS = document.querySelector('#n4');

const btnNoVariables = document.querySelectorAll('.form-check-input');

const btnAnd = document.querySelector('#and');
const btnOr = document.querySelector('#or');
const btnOpen = document.querySelector('#open');
const btnClose = document.querySelector('#close');
const btnNot = document.querySelector('#not');

const btnClean = document.querySelector('#clean');
const btnCalculate = document.querySelector('#calculate');

const alrtScreen = document.querySelector('#screen');

const tBodyTT = document.querySelector('#truthTable');

let expression = "";
let numberV = 2;

let phrase = "Calculadora Booleana";

export const printExpression = ( symbol,caracter ) => {

        if(caracter == "cls"){
                phrase = "";
                expression = "";
                tBodyTT.innerHTML = "";

                btnAnd.disabled = false;
                btnOr.disabled = false;
                btnOpen.disabled = false;
                btnClose.disabled = false;
                btnNot.disabled = false;

                btnP.disabled = false;
                btnQ.disabled = false;

                btnCalculate.disabled = false;

                btnNoVariables[0].disabled = false;
                btnNoVariables[0].checked = true;
                btnNoVariables[1].disabled = false;
                btnNoVariables[2].disabled = false;

                numberV = 2;
        }
        else
        {
                phrase = phrase + caracter;
                expression = expression + symbol;
        }

        alrtScreen.innerHTML = phrase;

}

const printTable = ( tableRow ) => {

        const tableRowHTML = `
                <td> ${ tableRow[1] } </td>
                <td> ${ tableRow[2] } </td>
                <td> ${ numberV >= 3 ? tableRow[3] : "-" } </td>
                <td> ${ numberV == 4 ? tableRow[4] : "-" } </td>
                <td> ${ tableRow.output } </td>
        `;
        const tr = document.createElement('tr');
        tr.innerHTML = tableRowHTML;

        tBodyTT.appendChild( tr );

};

//Eventos

for(let i=0; i<btnNoVariables.length; i++){
        btnNoVariables[i].addEventListener('click',(event) => {

                const id = event.target.getAttribute("id");
                numberV = id == "inlineRadio1" ? 2 : id == "inlineRadio2" ? 3 : 4;
                btnR.disabled = numberV > 2 ? false : true;
                btnS.disabled = numberV == 4 ? false : true;
                console.log(numberV);

        });
}

btnP.addEventListener('click',() => {

        printExpression("1","P");

});

btnQ.addEventListener('click',() => {

        printExpression("2","Q");

});

btnR.addEventListener('click',() => {

        printExpression("3","R");

});

btnS.addEventListener('click',() => {

        printExpression("4","S");

});

btnAnd.addEventListener('click',() => {

        printExpression("*","∧");

});

btnOr.addEventListener('click',() => {

        printExpression("+","∨");

});

btnOpen.addEventListener('click',() => {

        printExpression("(","(");

});

btnClose.addEventListener('click',() => {

        printExpression(")",")");

});

btnNot.addEventListener('click',() => {

        printExpression("'","¬");

});

btnClean.addEventListener('click',() => {

        printExpression("cls","cls");

});

btnCalculate.addEventListener('click',async() => {

        if(expression != ""){
                console.log(expression);

                const truthTable = await CRUD.booleanCalculator({
                        expresion:expression,
                        numberOfVariables:numberV
                });

                truthTable.forEach((obj) => {
                        printTable( obj );
                });

                btnAnd.disabled = true;
                btnOr.disabled = true;
                btnOpen.disabled = true;
                btnClose.disabled = true;
                btnNot.disabled = true;

                btnP.disabled = true;
                btnQ.disabled = true;
                btnR.disabled = true;
                btnS.disabled = true;

                btnCalculate.disabled = true;

                btnNoVariables[1].disabled = true;
                btnNoVariables[2].disabled = true;
                btnNoVariables[0].disabled = true;
        } else {
                alert("No se puede calcular una expresión vacía.")
        }

});