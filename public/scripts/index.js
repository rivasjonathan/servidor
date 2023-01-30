var token = document.getElementById("token").value

document.getElementById("consultar-folio").addEventListener("submit", (e) =>{
    e.preventDefault()

    var folio = document.getElementById("folio")

    $.ajax({
        url: "/",
        method: "POST",
        data:{
            token,
            folio: folio.value
        },
        success: function(response){
            if(response.token == false){
                window.location.href = "/"
            }else if(response){
                document.querySelector(".tab-content").innerHTML = ""
                response.forEach(element => {
                    document.querySelector(".tab-content").innerHTML += `
                    <br>
                    <br>
                    <h3>Resultados de la busqueda</h3>
                    <div class="alert alert-info" style="text-align: center;">
                        <p>Los certificados estaran disponibles para su consulta un dia despues de su emision.</p>
                    </div>
                    <h3>Detalle del documento</h3>
                    <hr>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-3">
                                <p><strong>Nombre:</strong><br>${element.nombre}</p>
                            </div>
                            <div class="col-md-4">
                                <p><strong>Tipo de documento:</strong><br>${element.documento}</p>
                            </div>
                            <div class="col-md-4"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-1"></div>
                            <div class="col-md-3"></div>
                            <div class="col-md-4">
                                <p><strong>Tipo de Estudios:</strong><br>${element.estudios}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-1"></div>
                            <div class="col-md-3">
                                <p><strong>Carrera:</strong><br>${element.carrera}</p>
                            </div>
                            <div class="col-md-4">
                                <p><strong>Folio:</strong><br>${element.folio}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-1"></div>
                            <div class="col-md-3">
                                <p><strong>Autoridad emisora:</strong><br>${element.autoridad}</p>
                            </div>
                            <div class="col-md-4">
                                <p><strong>Fecha registro SIGED:</strong><br>${element.fecha}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div style="margin: 10px;" class="col-md-3 alert-datos-incial alert alert-success text-center">
                                <p><strong>Promedio:</strong><br>${element.promedio}</p>
                            </div>
                            <div style="margin: 10px;" class="col-md-3 alert-datos-incial alert alert-info text-center">
                                <p><strong>Estatus del documento:</strong><br>${element.estatus}</p>
                            </div>
                        </div>

                        <div style="width: 90%;">
                            <div class="alert alert-success text-center">
                                <h3>Descargar Certificado Digital</h3>
                            </div>
                        </div>

                        <br><br>
                        <hr style="width: 90%;">

                        <div style="width: 90%;">
                            <div>
                                <p>
                                
                                La informacion de los certificados que se muestran en este portal, son el resultado de la integracion de informacion que envian las autoridades educativas de los estados y la Ciudad de Mexico. "En caso de que la informacion presentada no coincida con tus resultados obtenidos en el ciclo escolar o no este disponible, por favor ponte en contacto con la autoridad de tu centro escolar."
                                <br><br>
                                La informacion presentada es de caracter informativa y para verificar la validez del documento impreso. Es una representacion de la informacion contenida en el certificado (documento impreso).
                                <br><br>
                                El documento oficial es el que la institucion Educativa entrega a los padres o tutores de los educandos en sus centros escolares.
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                });
            }
        }
    })
})