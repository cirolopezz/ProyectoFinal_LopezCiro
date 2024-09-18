
// seleccion de elementos del formulario
const formRegister= document.querySelector("#alumno"),
user= document.querySelector("#user"),
correo= document.querySelector("#correo"),
celular= document.querySelector("#celular"),
estadoAcademico= document.querySelector("#mensaje"),
btnRegistrar= document.querySelector("#registrar");

//Inicializando el array de alumnos en el local Storage con operador logico OR
let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
 //Constructora del objeto Alumno
class Alumno{
 constructor (nombre, email, telefono,condicion){ // funcion constructora del objeto alumnado
        this.nombre=nombre;
        this.email=email;
        this.telefono=telefono;
        this.condicion= condicion;
}
}
//Funcion para guardar en localStorage;
function guardarenLS(arr){
    return localStorage.setItem ('alumnos', JSON.stringify(arr))
}
//Evento al enviar el formulario
formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    // Crear un nuevo objeto Alumno con los datos provenientes del formulario
    const newAlumno = new Alumno(user.value, correo.value, celular.value, estadoAcademico.value);
    // Agregar el nuevo alumno al array
    alumnos.push(newAlumno);
    // Guardar el array actualizado en localStorage
    guardarenLS(alumnos);
    // Limpiar el formulario
    formRegister.reset();
    // Opcional: Mensaje de confirmación
    Swal.fire({
        title: "Muy Bien!",
        text: "El alumno/a ha sido cargado/a correctamente",
        icon: "success"
      });
});
// console.log (alumnos);
     // Busqueda de alumno por nombre
    //Objeto en el que se presenta el resultado de la busqueda  
    let caja = document.getElementById("caja");
     //funcion de busqueda en el array alumnos
    function buscarAlumno(arr, filtro) {
         const encontrado = arr.find((el) => {
           return el.nombre.includes(filtro);
        });
         return encontrado;
      }
    
      const btnSearch = document.getElementById("btnSearch");
      const inputSearch = document.getElementById("ingreso");
      //evento del boton de busqueda
      btnSearch.addEventListener("click", () => {
      const encontrado = buscarAlumno(alumnos, inputSearch.value);
      caja.innerText= encontrado ? JSON.stringify(encontrado): Swal.fire({
         title: "Lo siento!",
        text: "El alumno/a no existe en nuestra base de datos",
        icon: "error" });
       
      //aplicando destructuring en una tabla
      const{nombre, email, telefono, condicion}=encontrado;
     let searchNombre= document.getElementById("searchNombre");
     searchNombre.innerText=nombre;
     let searchCorreo= document.getElementById("searchCorreo");
     searchCorreo.innerText= email;
     let searchTelefono= document.getElementById("searchTelefono");
     searchTelefono.innerText= telefono;
     let searchCondicion= document.getElementById("searchCondicion");
     searchCondicion.innerText= condicion;
    
      inputSearch.value=''; 
      
      });

// Usando Fetch para listar todos los alumnos cargados
const btnSearch2 = document.getElementById("btnSearch2");
btnSearch2.addEventListener("click", () => {
    fetch('./data/alumnos.json')
    .then(response => response.json())
    .then(alumnos => {
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = "";  
        // Recorre el array y crea elementos para cada objeto
        alumnos.forEach(alumno => {
            const div = document.createElement('div');
            div.className = 'item';
           // Creando el contenido HTML para el objeto
            div.innerHTML = `
                <h3>${alumno.nombre}</h3>
                <p>${alumno.email}</p>
                <p>${alumno.telefono}</p>
                <p>${alumno.condicion}</p>
            `;           
            // Añadiendo el div al contenedor
            contenedor.appendChild(div);
        });
    })
    // .catch(error => console.error('Error al cargar los datos:', error));
});
