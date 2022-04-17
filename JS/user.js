//VARIABLES GLOBALES
const formularioUI = document.querySelector('#formulario');
const recertaMedicamentosUI = document.getElementById('recertaMedicamentos');
let arrayMedicamentos = [];

//FUNCIONES

const CrearItem = (medicameto) => {
    let item = {
        medicameto: medicameto,
        estado: false
    }
    arrayMedicamentos.push(item);

    return item;
}

const GuardarDB = () => {

    localStorage.setItem('rutina', JSON.stringify(arrayMedicamentos));

    PintarDB();

}


const PintarDB = () => {

    recertaMedicamentosUI.innerHTML = '';

    arrayMedicamentos = JSON.parse(localStorage.getItem('rutina'));

    if (arrayMedicamentos === null) {
        arrayMedicamentos = [];
    } else {
        arrayMedicamentos.forEach(element => {

            if(element.estado){
                recertaMedicamentosUI.innerHTML +=
                `<div class="alert alert-success" role="alert">
                    <span class="material-icons" style="float: left; margin-right: 3px;">medication</span>
                        <b>${element.medicameto}</b> - ${element.estado}
                    <span class="float-right">
                        <span class="material-icons" style="float: right">delete</span>
                        <span class="material-icons" style="float: right">check_circle</span>
                    </span>
                </div>`
            }else{
                recertaMedicamentosUI.innerHTML +=
                `<div class="alert alert-danger" role="alert">
                    <span class="material-icons" style="float: left; margin-right: 3px;">medication</span>
                        <b>${element.medicameto}</b> - ${element.estado}
                    <span class="float-right">
                        <span class="material-icons" style="float: right">delete</span>
                        <span class="material-icons" style="float: right">check_circle</span>
                    </span>
                </div>`
            }

        }); 
    }
}


const EliminarDB = (medicameto) => {

    let indexArray;

    arrayMedicamentos.forEach((element, index) => {
        if(element.medicameto === medicameto){
            indexArray = index;
        }
    });

    arrayMedicamentos.splice(indexArray,1);
    GuardarDB();
}

const EditarDB = (medicameto) => {

    let indexArray = arrayMedicamentos.findIndex((element) => element.medicameto === medicameto)

    console.log(arrayMedicamentos[indexArray]);

    arrayMedicamentos[indexArray].estado = true;

    GuardarDB();
}

//EVENTOS

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let medicinaUI = document.querySelector('#medicina').value;

    CrearItem(medicinaUI);
    GuardarDB();
    formularioUI.reset();
})

document.addEventListener('DOMContentLoaded', PintarDB);

recertaMedicamentosUI.addEventListener('click', (e) => {

    e.preventDefault();

    console.log(e.target.innerHTML);
     
    if(e.target.innerHTML === 'check_circle' || e.target.innerHTML === 'delete'){
        let texto = e.path[2].childNodes[3].innerHTML;
    
        if(e.target.innerHTML === 'check_circle'){
            //ACCION DE MODIFICAR
            EditarDB(texto);
        }

        if(e.target.innerHTML === 'delete'){
            //ACCION DE ELIMINAR
            EliminarDB(texto);
        }
    }
})