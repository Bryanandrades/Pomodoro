//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito= document.querySelector('#lista-carrito tbody');
const vaciarCarritosBtn= document.querySelector('#vaciar-carrito');
const listaCursos= document.querySelector('#lista-cursos');
let articulosCarrito= [];


cargaEventListener();
function cargaEventListener(){
    //cuando agregar un curso presionado "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarritosBtn.addEventListener('click',()=>{
        console.log('vaciar')
        articulosCarrito= []; //reseteamos el arreglo
        limpiarHTML(); // eliminamos todo el html

    });

}

//funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSleccionado = e.target.parentElement.parentElement;
        console.log('Agregando al carrito');
        
        leerDatosCuros(cursoSleccionado);
    }

}
//eliminar un curso del carrito
function eliminarCurso(e){
console.log(e.target.classList);
if(e.target.classList.contains('borrar-curso')){
    const cursoId= e.target.getAttribute('data-id');
    //elminar del arreglo
    articulosCarrito = articulosCarrito.filter(curso=>curso.id!==cursoId);
    carritoHTML();//iterar sobre el carrito

}





};



//leer el contenido del html
function leerDatosCuros( curso){
    //console.log(curso);

    //crear objeto con los datos del curso actuak
    const infoCurso={
    imagen:curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio : curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad:1

}
const existe = articulosCarrito.some(curso=>curso.id === infoCurso.id);
if(existe){
    //actualizar la cantidad
    const cursos=articulosCarrito.map(curso=>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //retorna objeto actualizado
        }else{
            return curso; //retorna objeto

        }
    });
    articulosCarrito=[...cursos];

} else{
    //agregar elementos al arreglo de carrito
    articulosCarrito= [...articulosCarrito, infoCurso]   
}


console.log(articulosCarrito);
carritoHTML();
}


//muestra el carrito de compra
function carritoHTML(){
    //limpiar html
    limpiarHTML();



    //recorre el carrito y genera html
    articulosCarrito.forEach(curso =>{
        const {imagen,titulo,precio,cantidad,id} = curso;
        console.log(curso);
        const row=document.createElement('tr');
        row.innerHTML =`
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });


}
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML='';

    while(contenedorCarrito.firstChild){

        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};

