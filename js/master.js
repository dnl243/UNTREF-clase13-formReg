// Captura de elementos
let btnPrint = document.querySelector('#botonImprimir');
let btnDelete = document.querySelector('#botonBorrar');
let firstNameInput = document.querySelector('#nombre');
let lastNameInput = document.querySelector('#apellido');
let mailInput = document.querySelector('#correo');
let addressInput = document.querySelector('#direccion');
let table = document.querySelector('#tabla');
let bodyTable = document.querySelector('#cuerpoTabla');
let form = document.querySelector('form');

let users = JSON.parse(localStorage.getItem('usersList'));

// Controlamos el form
form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    if(users === null){
        users=[];
    };
    users.push({
        nombre: firstNameInput.value,
        apellido: lastNameInput.value,
        correo: mailInput.value,
        direccion: addressInput.value
    });
    localStorage.setItem('usersList', JSON.stringify(users));
    init();
    userOk();
})

// Ir al inicio
function init() {
    firstNameInput.value='';
    lastNameInput.value='';
    mailInput.value='';
    addressInput.value='';
    firstNameInput.focus();
}

// Construir y mostrar lista
btnPrint.addEventListener('click', function () {
    bodyTable.innerHTML='';
    if(users === null){
        userNone();
    }else {
        table.classList.toggle('d-none');
        users.forEach(user => {
            bodyTable.innerHTML+= `
            <tr>
            <td>${user.nombre}</td>
            <td>${user.apellido}</td>
            <td>${user.correo}</td>
            <td>${user.direccion}</td>
            </tr>`    
        });
    }});
    
// Borrar lista
btnDelete.addEventListener('click', function(){
    if(users === null){
        userNone();
    }else{
        listDelete();
    };
});

function userOk() {
    Swal.fire({
        icon: 'success',
        title: 'Usuario registrado correctamente!',
        showConfirmButton: false,
        timer: 1500
      })    
};
function userNone() {
    Swal.fire({
        icon: 'error',
        title: 'No hay usuarios registrados!',
        showConfirmButton: false,
        timer: 1500
    }) 
};

// confirmar 'borrar'
function listDelete() {
    Swal.fire({
        title: 'Estas seguro?',
        text: "Se borraran los registros!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
}).then((result) => {
    if (result.isConfirmed) {
        localStorage.removeItem('usersList');
        table.classList.add('d-none');
        Swal.fire({
            icon: 'success',
            title: 'Se ha eliminado el registro de usuarios!',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            location.reload();
        }, 1500);     
        }
    })
};
    
    
    
    
    