var token = document.getElementById("token").value

const obtener_datos = () =>{
    $.ajax({
        url: "/administrador/panel-de-control/",
        method: "POST",
        data:{
            token,
            pagina: document.getElementById("paginas")
        },
        success: function(response){
            document.getElementById("resultados").innerHTML = ""
            response.forEach(element => {
                document.getElementById("resultados").innerHTML += `
                <div class="card">
                    
                    <input type="hidden" class="id" value="${element.id}">
                    <input type="hidden" class="nombre" value="${element.nombre}">
                    <input type="hidden" class="documento" value="${element.documento}">
                    <input type="hidden" class="estudios" value="${element.estudios}">
                    <input type="hidden" class="carrera" value="${element.carrera}">
                    <input type="hidden" class="folio" value="${element.folio}">
                    <input type="hidden" class="autoridad" value="${element.autoridad}">
                    <input type="hidden" class="fecha" value="${element.fecha}">
                    <input type="hidden" class="promedio" value="${element.promedio}">
                    <input type="hidden" class="estatus" value="${element.estatus}">
    
                    <strong><p>Nombre:</strong><br>${element.nombre}</p>
                    <strong><p>Tipo de documento:</strong><br>${element.documento}</p>
                    <strong><p>Tipo de estudios:</strong><br>${element.estudios}</p>
                    <strong><p>Carrera:</strong><br>${element.carrera}</p>
                    <strong><p>Folio:</strong><br>${element.folio}</p>
                    <strong><p>Autoridad emisora:</strong><br>${element.autoridad}</p>
                    <strong><p>Fecha de registro SIGED:</strong><br>${element.fecha}</p>
                    <strong><p>Promedio:</strong><br>${element.promedio}</p>
                    <strong><p>Estatus del documento:</strong><br>${element.estatus}</p>
                    <div class="input-gruop">
                        <button class="btn editar">Editar</button>
                        <button class="btn eliminar">Eliminar</button>
                    </div>
                </div>
                `    
            });
            
        }
    })
}

obtener_datos()

var buscar = document.getElementById("buscar")
var expresion_buscar = /^[a-zA-ZÀ-ÿ\s]{1,40}$/

buscar.addEventListener("keyup", () =>{
    if(expresion_buscar.test(buscar.value)){
        $.ajax({
            url: "/administrador/panel-de-control/buscar",
            method: "POST",
            data:{
                token,
                buscar: buscar.value
            },
            success: function(response){
                if(response){
                    document.getElementById("resultados").innerHTML = ""
                    response.forEach(element => {
                        document.getElementById("resultados").innerHTML += `
                        <div class="card">
                            
                            <input type="hidden" class="id" value="${element.id}">
                            <input type="hidden" class="nombre" value="${element.nombre}">
                            <input type="hidden" class="documento" value="${element.documento}">
                            <input type="hidden" class="estudios" value="${element.estudios}">
                            <input type="hidden" class="carrera" value="${element.carrera}">
                            <input type="hidden" class="folio" value="${element.folio}">
                            <input type="hidden" class="autoridad" value="${element.autoridad}">
                            <input type="hidden" class="fecha" value="${element.fecha}">
                            <input type="hidden" class="promedio" value="${element.promedio}">
                            <input type="hidden" class="estatus" value="${element.estatus}">
            
                            <strong><p>Nombre:</strong><br>${element.nombre}</p>
                            <strong><p>Tipo de documento:</strong><br>${element.documento}</p>
                            <strong><p>Tipo de estudios:</strong><br>${element.estudios}</p>
                            <strong><p>Carrera:</strong><br>${element.carrera}</p>
                            <strong><p>Folio:</strong><br>${element.folio}</p>
                            <strong><p>Autoridad emisora:</strong><br>${element.autoridad}</p>
                            <strong><p>Fecha de registro SIGED:</strong><br>${element.fecha}</p>
                            <strong><p>Promedio:</strong><br>${element.promedio}</p>
                            <strong><p>Estatus del documento:</strong><br>${element.estatus}</p>
                            <div class="input-gruop">
                                <button class="btn editar">Editar</button>
                                <button class="btn eliminar">Eliminar</button>
                            </div>
                        </div>
                        `    
                    });
                }
            }
        })      
    }
})

document.getElementById("agregar").addEventListener("click", () =>{
    Swal.fire({
        width: 500,
        html: `
        <h2>Agregar</h2>
        <form id="form-agregar">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" class="form-control" autocomplete="off" required>
            <label for="documento">Tipo de documento:</label>
            <input type="text" id="documento" class="form-control" autocomplete="off" required>
            <label for="estudios">Tipo de estudios:</label>
            <input type="text" id="estudios" class="form-control" autocomplete="off" required>
            <label for="carrera">Carrera:</label>
            <input type="text" id="carrera" class="form-control" autocomplete="off" required>
            <label for="folio">Folio:</label>
            <input type="text" id="folio" class="form-control" autocomplete="off" required>
            <label for="autoridad">Autoridad emisora:</label>
            <input type="text" id="autoridad" class="form-control" autocomplete="off" required>
            <label for="promedio">Promedio:</label>
            <input type="text" id="promedio" class="form-control" autocomplete="off" required>
            <label for="estatus">Estatus del documento:</label>
            <input type="text" id="estatus" class="form-control" autocomplete="off" required>
            <input type="submit" style="margin-top: 20px; width: 100%;" class="btn btn-primary" value="Agregar">
        </form>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
    })

    var nombre = document.getElementById("nombre")
    var documento = document.getElementById("documento")
    var estudios = document.getElementById("estudios")
    var carrera = document.getElementById("carrera")
    var folio = document.getElementById("folio")
    var autoridad = document.getElementById("autoridad")
    var promedio = document.getElementById("promedio")
    var estatus = document.getElementById("estatus")

    var verificar_texto = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    var verificar_numero = /^\d*\.?\d*$/

    nombre.addEventListener("keyup", () =>{
        nombre.value = nombre.value.toUpperCase()
        if(verificar_texto.test(nombre.value)){
            nombre.style.color = "black"
        }else{
            nombre.style.color = "red"
        }
    })

    documento.addEventListener("keyup", () =>{
        documento.value = documento.value.toUpperCase()
        if(verificar_texto.test(documento.value)){
            documento.style.color = "black"
        }else{
            documento.style.color =" red"
        }
    })

    estudios.addEventListener("keyup", () =>{
        estudios.value = estudios.value.toUpperCase()
        if(verificar_texto.test(estudios.value)){
            estudios.style.color = "black"
        }else{
            estudios.style.color = "red"
        }
    })

    carrera.addEventListener("keyup", () =>{
        carrera.value = carrera.value.toUpperCase()
        if(verificar_texto.test(carrera.value)){
            carrera.style.color = "black"
        }else{
            carrera.style.color = "red"
        }
    })

    promedio.addEventListener("keyup", () =>{
        promedio.value = promedio.value.toUpperCase()
        if(verificar_numero.test(promedio.value)){
            promedio.style.color = "black"
        }else{
            promedio.style.color = "red"
        }
    })

    estatus.addEventListener("keyup", () =>{
        estatus.value = estatus.value.toUpperCase()
        if(verificar_texto.test(estatus.value)){
            estatus.style.color = "black"
        }else{
            estatus.style.color = "red"
        }
    })

    document.getElementById("form-agregar").addEventListener("submit", (e) =>{
        e.preventDefault()
        
        if(verificar_texto.test(nombre.value)){
            nombre.style.color = "black"
        }else{
            nombre.style.color = "red"
            return
        }
        if(verificar_texto.test(documento.value)){
            documento.style.color = "black"
        }else{
            documento.style.color =" red"
            return
        }
        if(verificar_texto.test(estudios.value)){
            estudios.style.color = "black"
        }else{
            estudios.style.color = "red"
            return
        }
        if(verificar_texto.test(carrera.value)){
            carrera.style.color = "black"
        }else{
            carrera.style.color = "red"
            return
        }
        if(verificar_numero.test(promedio.value)){
            promedio.style.color = "black"
        }else{
            promedio.style.color = "red"
            return
        }
        if(verificar_texto.test(estatus.value)){
            estatus.style.color = "black"
        }else{
            estatus.style.color = "red"
            return
        }

        $.ajax({
            url: "/administrador/panel-de-control/agregar",
            method: "POST",
            data:{
                token,
                nombre: nombre.value,
                documento: documento.value,
                estudios: estudios.value,
                carrera: carrera.value,
                folio: folio.value,
                autoridad: autoridad.value,
                promedio: promedio.value,
                estatus: estatus.value
            },
            success: function(response){
                if(response.respuesta){
                    Swal.fire({
                        width: 500,
                        icon: "success",
                        html: `
                        <h2>Se ha agregado correctamente</h2>
                        `,
                        showConfirmButton: false,
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        stopKeydownPropagation: false,
                        timer: 3000
                    })
                    obtener_datos()
                }
            }
        })
    })
    
})

$(document).on("click", ".editar", function(){
    card = $(this).closest(".card")
    var id = card.find(".id").val()
    var nombre_input = card.find(".nombre").val()
    var documento_input = card.find(".documento").val()
    var estudios_input = card.find(".estudios").val()
    var carrera_input = card.find(".carrera").val()
    var folio_input = card.find(".folio").val()
    var autoridad_input = card.find(".autoridad").val()
    var fecha_input = card.find(".fecha").val()
    var promedio_input = card.find(".promedio").val()
    var estatus_input = card.find(".estatus").val()
    
    Swal.fire({
        width: 500,
        html: `
        <h2>Editar</h2>
        <form id="form-editar">
            <input type="hidden" id="id" value="${id}">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" class="form-control" value="${nombre_input}" autocomplete="off" required>
            <label for="documento">Tipo de documento:</label>
            <input type="text" id="documento" class="form-control" value="${documento_input}" autocomplete="off" required>
            <label for="estudios">Tipo de estudios:</label>
            <input type="text" id="estudios" class="form-control" value="${estudios_input}" autocomplete="off" required>
            <label for="carrera">Carrera:</label>
            <input type="text" id="carrera" class="form-control" value="${carrera_input}" autocomplete="off" required>
            <label for="folio">Folio:</label>
            <input type="text" id="folio" class="form-control" value="${folio_input}" autocomplete="off" required>
            <label for="autoridad">Autoridad emisora:</label>
            <input type="text" id="autoridad" class="form-control" value="${autoridad_input}" autocomplete="off" required>
            <label for="fecha">Fecha de registro SIGED:</label>
            <input type="text" id="fecha" class="form-control" value="${fecha_input}" autocomplete="off" required>
            <label for="promedio">Promedio:</label>
            <input type="text" id="promedio" class="form-control" value="${promedio_input}" autocomplete="off" required>
            <label for="estatus">Estatus del documento:</label>
            <input type="text" id="estatus" class="form-control" value="${estatus_input}" autocomplete="off" required>
            <input type="submit" style="margin-top: 20px; width: 100%;" class="btn btn-primary" value="Editar">
        </form>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
    })

    var nombre = document.getElementById("nombre")
    var documento = document.getElementById("documento")
    var estudios = document.getElementById("estudios")
    var carrera = document.getElementById("carrera")
    var folio = document.getElementById("folio")
    var autoridad = document.getElementById("autoridad")
    var fecha = document.getElementById("fecha")
    var promedio = document.getElementById("promedio")
    var estatus = document.getElementById("estatus")

    var verificar_texto = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    var verificar_numero = /^\d*\.?\d*$/

    nombre.addEventListener("keyup", () =>{
        nombre.value = nombre.value.toUpperCase()
        if(verificar_texto.test(nombre.value)){
            nombre.style.color = "black"
        }else{
            nombre.style.color = "red"
        }
    })

    documento.addEventListener("keyup", () =>{
        documento.value = documento.value.toUpperCase()
        if(verificar_texto.test(documento.value)){
            documento.style.color = "black"
        }else{
            documento.style.color =" red"
        }
    })

    estudios.addEventListener("keyup", () =>{
        estudios.value = estudios.value.toUpperCase()
        if(verificar_texto.test(estudios.value)){
            estudios.style.color = "black"
        }else{
            estudios.style.color = "red"
        }
    })

    carrera.addEventListener("keyup", () =>{
        carrera.value = carrera.value.toUpperCase()
        if(verificar_texto.test(carrera.value)){
            carrera.style.color = "black"
        }else{
            carrera.style.color = "red"
        }
    })

    promedio.addEventListener("keyup", () =>{
        promedio.value = promedio.value.toUpperCase()
        if(verificar_numero.test(promedio.value)){
            promedio.style.color = "black"
        }else{
            promedio.style.color = "red"
        }
    })

    estatus.addEventListener("keyup", () =>{
        estatus.value = estatus.value.toUpperCase()
        if(verificar_texto.test(estatus.value)){
            estatus.style.color = "black"
        }else{
            estatus.style.color = "red"
        }
    })

    document.getElementById("form-editar").addEventListener("submit", (e) =>{
        e.preventDefault()

        if(verificar_texto.test(nombre.value)){
            nombre.style.color = "black"
        }else{
            nombre.style.color = "red"
            return
        }
        if(verificar_texto.test(documento.value)){
            documento.style.color = "black"
        }else{
            documento.style.color =" red"
            return
        }
        if(verificar_texto.test(estudios.value)){
            estudios.style.color = "black"
        }else{
            estudios.style.color = "red"
            return
        }
        if(verificar_texto.test(carrera.value)){
            carrera.style.color = "black"
        }else{
            carrera.style.color = "red"
            return
        }
        if(verificar_numero.test(promedio.value)){
            promedio.style.color = "black"
        }else{
            promedio.style.color = "red"
            return
        }
        if(verificar_texto.test(estatus.value)){
            estatus.style.color = "black"
        }else{
            estatus.style.color = "red"
            return
        }

        $.ajax({
            url: "/administrador/panel-de-control/editar",
            method: "PUT",
            data:{
                token,
                id,
                nombre: nombre.value,
                documento: documento.value,
                estudios: estudios.value,
                carrera: carrera.value,
                folio: folio.value,
                autoridad: autoridad.value,
                fecha: fecha.value,
                promedio: promedio.value,
                estatus: estatus.value
            },
            success: function(response){
                if(response){
                    Swal.fire({
                        width: 500,
                        icon: "success",
                        html: `
                        <h2>Se ha modificado correctamente</h2>
                        `,
                        showConfirmButton: false,
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        stopKeydownPropagation: false,
                        timer: 3000
                    })
                    obtener_datos()
                }
            }
        })

    })
})

$(document).on("click", ".eliminar", function(){
    Swal.fire({
        width: 500,
        html: `
        <h2>¿Deseas eliminar este registro?</h2>
        <div style="button-gruop">
            <button class="btn" id="si">Si</button>
            <button class="btn" id="no">No</button>
        </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
    })

    document.getElementById("si").addEventListener("click", () =>{
        
        var card = $(this).closest(".card")
        var id = card.find(".id").val()

        $.ajax({
            url: "/administrador/panel-de-control/eliminar",
            method: "DELETE",
            data:{
                token,
                id
            },
            success: function(response){
                if(response){
                    Swal.fire({
                        width: 500,
                        icon: "success",
                        html: `
                        <h2>Se ha eliminado correctamente</h2>
                        `,
                        showConfirmButton: false,
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        stopKeydownPropagation: false,
                        timer: 3000
                    })
                    obtener_datos()
                }
            }
        })
    })

    document.getElementById("no").addEventListener("click", () =>{
        Swal.close()
    })

})