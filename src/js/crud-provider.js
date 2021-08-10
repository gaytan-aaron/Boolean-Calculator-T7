const calculadoraUrl = 'https://calculadorabooleanat7.azurewebsites.net/api/Calculadora';

export const booleanCalculator = async ( data ) => {

    let truthTable;

    const resp = await fetch( calculadoraUrl,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify( data ),
        headers: {
            'Content-Type':'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((response) => {
        truthTable = response;
    });

    return truthTable;
}