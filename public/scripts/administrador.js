var token = document.getElementById("token").value
var form = document.getElementById("form")

form.addEventListener("submit", (e) =>{
    
    e.preventDefault()
    var usuario = document.getElementById("usuario")
    var contrasena = document.getElementById("contrasena")

    $.ajax({
        url: "/administrador",
        method: "POST",
        data:{
            token,
            usuario: usuario.value,
            contrasena: contrasena.value
        },
        success: function(response){
            if(response.token == false){
                window.location.href = "/"
            }else if(response){
                Swal.fire({
                    icon: "success",
                    width: 500,
                    html: `
                    <div style="margin-top: -30px;">
                    <h2>Inicio de Sesión Satisfactorio</h2>`,
                    showConfirmButton: false,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    stopKeydownPropagation: false,
                })
                setTimeout(() =>{
                    window.location.href = "/administrador/panel-de-control"
                }, 2000)
            }else{
                Swal.fire({
                    icon: "error",
                    width: 500,
                    html: `
                    <div style="margin-top: -30px;">
                    <h2 style="color: red">Inicio de Sesión Incorrecto</h2>`,
                    showConfirmButton: false,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    stopKeydownPropagation: false,
                })
                setTimeout(() =>{
                    Swal.close()
                }, 2000)
            }   
        }
    })
})