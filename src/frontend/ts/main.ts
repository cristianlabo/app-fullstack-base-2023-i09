
var M;

var modalActualizarId:number = 1;


class Main implements EventListenerObject{
    public usuarios: Array<Usuario>= new Array<Usuario>();
  

    private buscarPersonas() {

   
        for (let u of this.usuarios) {
            console.log(u.mostrar(),this.usuarios.length);
        }
    }
    public buscarDevices() {
        
        let xmlRequest = new XMLHttpRequest();
        
        xmlRequest.onreadystatechange = () => {
     
            if (xmlRequest.readyState == 4) {
                if(xmlRequest.status==200){
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Device> = JSON.parse(respuesta);
                    
                    let ul = document.getElementById("listaDisp"); 

                    for (let d of datos) {
                       
                        let itemList =
                            ` <li class="collection-item avatar" >
                        <img src="./static/images/lightbulb.png" alt="" class="circle">
                        <span class="title">${d.name}</span>
                        <p>
                         ${d.description}
                        </p>

                        <a class="waves-effect waves-light btn modal-trigger" href="#modalActualizar" id="modal_Act_${d.id}" >Actualizar</a> 
                        <button class="btn waves-effect waves-light button-view" id="btn_Eli_${d.id}" >Eliminar</button>

                        <a href="#!" class="secondary-content">
                       
                        <div class="switch">
                        <label>
                          Off
                          <input type="checkbox"`;
                         
                          itemList +=`nuevoAtt="${d.id}" id="cb_${d.id}"`
                        if (d.state) {
                            itemList+= ` checked `
                        }
                       
                        itemList+= `>
                          <span class="lever"></span>
                          On
                        </label>
                      </div>
                        </a>
                      </li>`

                      
                       
                        ul.innerHTML += itemList;

                        /*   <button class="btn waves-effect waves-light button-view" id="btn_Act_${d.id}" >Actualizar</button> */
                    

                        /* itemList+=` <!-- Modal Structure -->
                        <div id="modal${d.id}" class="modal">
                            <div class="modal-content">
                                <div class="col s12 m6 l6">
                                    <h1>Cargar usuario</h1>
                                    <label for="iNombre">Nombre de usuario</label>
                                    <input id="iNombre" type="text" value="" placeholder="jlopez" />
    
                                    <div class="input-field">
                                        <input id="iPassword" type="password" class="validate">
                                        <label for="iPassword">Password</label>
                                    </div>
                                    
                                    <p>
                                        <label>
                                        <input type="checkbox"  />
                                        <span>Recordar usuario y contraseña</span>
                                        </label>
                                    </p>
                                    <p id="pInfo"  ></p>
                                    
                                    <button id="btnGuardar" class="modal-close  btn">Guardar</button>
                                </div>
                            </div>                       
                        </div> `;  */

                    }
                    for (let d of datos) {
                        let checkbox = document.getElementById("cb_" + d.id);
                        checkbox.addEventListener("click", this);
                        let botonEliminar = document.getElementById("btn_Eli_" + d.id);
                        botonEliminar.addEventListener("click", this);
                        let modalActualizar = document.getElementById("modal_Act_" + d.id);
                        modalActualizar.addEventListener("click", this);
                    }


                }else{
                    console.log("no encontre nada");
                }
            }
            
        }
        xmlRequest.open("GET","http://localhost:8000/devices",true)
        xmlRequest.send();
    }

    private ejecutarPost(id:number,state:boolean) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
            
            

        }
        
       
        xmlRequest.open("POST", "http://localhost:8000/device", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            state: state   };

       
        xmlRequest.send(JSON.stringify(s));
    }



    private ejecutarPut(id:number,state:boolean) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
            
            

        }
        
       
        xmlRequest.open("PUT", `http://localhost:8000/device/${id}/${state}`, true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
       
   /*      let s = {
            id: id,
            state: state   };

            console.log(id);
        xmlRequest.send(JSON.stringify(s)); */
        xmlRequest.send();
    }

    private ejecutarDelete(id:number) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
            
            

        }
        
       
        xmlRequest.open("DELETE", `http://localhost:8000/device/${id}`, true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
       
   /*      let s = {
            id: id,
            state: state   };

            console.log(id);
        xmlRequest.send(JSON.stringify(s)); */
        xmlRequest.send();

        //location.reload();

       // this.buscarDevices(); 
    }



    private cargarUsuario(): void{
        let iNombre =<HTMLInputElement> document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");
        if (iNombre.value.length > 3 && iPassword.value.length > 3) {
            let usuari1: Usuario = new Usuario(iNombre.value, "user", iPassword.value,23);
            this.usuarios.push(usuari1);
            iNombre.value = "";
            iPassword.value = "";
           
            
            pInfo.innerHTML = "Se cargo correctamente!";
            pInfo.className ="textoCorrecto";
            
        } else {
            pInfo.innerHTML = "Usuairo o contraseña incorrecta!!!";
            pInfo.className ="textoError";
        }
        
        
    }


    private cargarDevice(): void{

       
        let iName =<HTMLInputElement> document.getElementById("iName");
        let iDescription = <HTMLInputElement>document.getElementById("iDescription");
        //let cb_Agregar = <HTMLInputElement>document.getElementById("cb_Agregar");
        let iselect = <HTMLInputElement>document.getElementById("iselect");


        //console.log("switch ",cb_Agregar.value,cb_Agregar.checked);
        console.log("selectot ",iselect.value);

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
            
            

        }
        
       
        xmlRequest.open("POST", "http://localhost:8000/device", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            //name: "Lampara 3",
            //description: "Luz baño",
            name: iName.value,
            description: iDescription.value,
            //state: cb_Agregar.checked,
            state: false,
            type: iselect.value
        };
    
        xmlRequest.send(JSON.stringify(s));
        
        
    }



    private ejecutarPutActualizar(id:number){

       
        let iName =<HTMLInputElement> document.getElementById("nameActualizar");
        let iDescription = <HTMLInputElement>document.getElementById("descriptionActualizar");
        //let cb_Agregar = <HTMLInputElement>document.getElementById("cb_Agregar");
        let iselect = <HTMLInputElement>document.getElementById("selectActualizar");


        //console.log("switch ",cb_Agregar.value,cb_Agregar.checked);
        console.log("nameActualizar ",iName.value);
        console.log("descriptionActualizar ", iDescription.value) ;
        console.log("selector ",iselect.value);

        

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
            
            

        }
        
       
        xmlRequest.open("PUT", "http://localhost:8000/device", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {

            id: id,
            //name: "Lampara 3",
            //description: "Luz baño",
            name: iName.value,
            description: iDescription.value,
            //state: cb_Agregar.checked,
            state: false,
            type: iselect.value
        };
    
        xmlRequest.send(JSON.stringify(s));
        
        
    }

    /* private ConsultarSelectId(id:number) {

        let xmlRequest = new XMLHttpRequest();
                
                xmlRequest.onreadystatechange = () => {
            
                    if (xmlRequest.readyState == 4) {
                        if(xmlRequest.status==200){
                            console.log(xmlRequest.responseText, xmlRequest.readyState);    
                            let respuesta = xmlRequest.responseText;
                            let datos:Array<Device> = JSON.parse(respuesta);
                            
                        
    
                            for (let d of datos) {
                            
    
                            }
    
                        }else{
                            console.log("no encontre nada");
                        }
                    }
                    
                }

                xmlRequest.open("GET", `http://localhost:8000/device/${id}`, true)
                xmlRequest.setRequestHeader("Content-Type", "application/json");
                xmlRequest.send();
    }
 */

    private ConsultarSelectId(id:number) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText); 
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Device> = JSON.parse(respuesta); 

            

                    for (let d of datos) {
                        console.log("valores: ",d);

                        let iName =<HTMLInputElement> document.getElementById("nameActualizar");
                        let iDescription = <HTMLInputElement>document.getElementById("descriptionActualizar");
                        //let cb_Agregar = <HTMLInputElement>document.getElementById("cb_Agregar");
                        let iselect = <HTMLInputElement>document.getElementById("selectActualizar");
                        
    
                        console.log("valores: ",d.name);
                        iName.value = d.name;
                        iDescription.value = d.description;
                        iselect.value = d.type.toString() ;   
    
                    }

                   


                } else {
                    alert("Salio mal la consulta");
                }
            }
            
            

        }
        
       
        xmlRequest.open("GET", `http://localhost:8000/device/${id}`, true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
       
   /*      let s = {
            id: id,
            state: state   };

            console.log(id);
        xmlRequest.send(JSON.stringify(s)); */
        xmlRequest.send();

        //location.reload();

       // this.buscarDevices(); 
    }


    

    handleEvent(object: Event): void {
        let elemento = <HTMLElement>object.target;
        

        
        

        

        if ("btnListar" == elemento.id) {

            console.log("buscar dispositivos");
            this.buscarDevices();
            
            
     /*    } else if ("btnGuardar" == elemento.id) {
            this.cargarUsuario(); */
        } else if ("btnAgregar" == elemento.id) {

            console.log("accion boton agregar");
            
            this.cargarDevice();
        }
        
        else if (elemento.id.startsWith("cb_")) {
            let checkbox = <HTMLInputElement>elemento;
            console.log(checkbox.getAttribute("nuevoAtt"),checkbox.checked, elemento.id.substring(3, elemento.id.length));
            
            //this.ejecutarPost(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);
            console.log("checkbox de estado");
            this.ejecutarPut(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);
        }

        else if (elemento.id.startsWith("btn_Eli_")) {
            let botonEliminar = <HTMLInputElement>elemento;
            console.log("eliminar dispositivo");
            this.ejecutarDelete(parseInt(elemento.id.substring(8, elemento.id.length)));
        }

         else if (elemento.id.startsWith("modal_Act_")) {
            let modalActualizar = <HTMLInputElement>elemento;
            modalActualizarId = parseInt(elemento.id.substring(10, elemento.id.length));
            console.log("Actualizar modal: ",modalActualizarId);
            this.ConsultarSelectId(modalActualizarId);
            //this.ejecutarPutActualizar(parseInt(elemento.id.substring(10, elemento.id.length)));
        } 

        else if ("btnGuardarActualizar" == elemento.id) {
            let btnGuardarActualizar = <HTMLInputElement>elemento;
            console.log("Actualizar dispositivo",modalActualizarId );
            this.ejecutarPutActualizar(modalActualizarId);
        }

        else if ("btnGuardar" == elemento.id) {
            let btnGuardar = <HTMLInputElement>elemento;
            console.log("agregar dispositivo");
            //this.ejecutarPost(parseInt(elemento.id.substring(8, elemento.id.length)));

            this.cargarDevice();
        }



        // location.reload();
    }

}





    
window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, "");
    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal,"");

    let main1: Main = new Main();

    main1.buscarDevices(); //

    let boton = document.getElementById("btnListar");
    boton.addEventListener("click", main1); 
    

    /* let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click",main1); */

    // let checkbox = document.getElementById("cb");
    //checkbox.addEventListener("click", main1); 

 /*    let botonAgregar = document.getElementById("btnAgregar");
    botonAgregar.addEventListener("click",main1); */

    let btnGuardarActualizar = document.getElementById("btnGuardarActualizar");
    btnGuardarActualizar.addEventListener("click",main1);

    let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click",main1);
    


});

