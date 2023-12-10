// variable globales


var M;
var modalActualizarId:number = 1;


// clase main


class Main implements EventListenerObject{
    

    // constructor

    constructor() {
        this.buscarDevices();
    }
   
    // buscar dispositivos, busca los dispositivos consultando a la base de datos, agrega los mismos a la lista

    private buscarDevices() {
        
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
                        
                        <span class="title">
                        ${d.name}
                        </span>
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

                    }

                    // se agregan los eventos  del switch, los botones eliminar y los modales actualizar

                    for (let d of datos) {
                        let checkbox = document.getElementById("cb_" + d.id);
                        checkbox.addEventListener("click", this);
                        let botonEliminar = document.getElementById("btn_Eli_" + d.id);
                        botonEliminar.addEventListener("click", this);
                        let modalActualizar = document.getElementById("modal_Act_" + d.id);
                        modalActualizar.addEventListener("click", this);
                    }


                }else{
                    console.log("No se encontro nada.");
                }
            }
            
        }
        xmlRequest.open("GET","http://localhost:8000/devices",true)
        xmlRequest.send();
    }

// Actualiza estado dispositivo, actualiza el estado de un  dispositivo en la base de datos.

    private ejecutarPost(id:number,state:boolean) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("Llego la respuesta",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta!!!");
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


// Agregar un diposotivo, agrega el dispositivo en la base de datos.

private cargarDevice(): void{

       
    let iName =<HTMLInputElement> document.getElementById("iName");
    let iDescription = <HTMLInputElement>document.getElementById("iDescription");        
    let iselect = <HTMLInputElement>document.getElementById("iselect");


    let xmlRequest = new XMLHttpRequest();

    xmlRequest.onreadystatechange = () => {
        if (xmlRequest.readyState == 4) {
            if (xmlRequest.status == 200) {
                console.log("Llego la respuesta",xmlRequest.responseText);        
            } else {
                alert("Salio mal la consulta!!!");
            }
        }
        
        

    }
    
   
    xmlRequest.open("POST", "http://localhost:8000/device", true)
    xmlRequest.setRequestHeader("Content-Type", "application/json");
    let s = {
        name: iName.value,
        description: iDescription.value,
        state: false,
        type: iselect.value
    };

    xmlRequest.send(JSON.stringify(s));
    
}

// Eliminar un diposotivo, elimina el dispositivo en la base de datos.

    private ejecutarDelete(id:number) {

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta!!!");
                }
            }
            
            

        }
        
        xmlRequest.open("DELETE", `http://localhost:8000/device/${id}`, true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
    
        xmlRequest.send();

    }


// Actualiza estado dispositivo, actualiza el estado de un  dispositivo en la base de datos.

private ejecutarPut(id:number,state:boolean) {
    let xmlRequest = new XMLHttpRequest();

    xmlRequest.onreadystatechange = () => {
        if (xmlRequest.readyState == 4) {
            if (xmlRequest.status == 200) {
                console.log("Llego la respuesta",xmlRequest.responseText);        
            } else {
                alert("Salio mal la consulta!!!");
            }
        }
        
        

    }
    
    xmlRequest.open("PUT", `http://localhost:8000/device/${id}/${state}`, true)
    xmlRequest.setRequestHeader("Content-Type", "application/json");

    xmlRequest.send();
}

// Actualiza nombre-descripcion-tipo dispositivo, actualiza el nombre-descripcion y tipo de un  dispositivo en la base de datos.

    private ejecutarPutActualizar(id:number){

       
        let iName =<HTMLInputElement> document.getElementById("nameActualizar");
        let iDescription = <HTMLInputElement>document.getElementById("descriptionActualizar");
        let iselect = <HTMLInputElement>document.getElementById("selectActualizar");

        console.log("nameActualizar ",iName.value);
        console.log("descriptionActualizar ", iDescription.value) ;
        console.log("selector ",iselect.value);

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("Llego la respuesta",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta!!!");
                }
            }
            
            

        }
        
       
        xmlRequest.open("PUT", "http://localhost:8000/device", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {

            id: id,
            name: iName.value,
            description: iDescription.value,
            state: false,
            type: iselect.value
        };
    
        xmlRequest.send(JSON.stringify(s));
        
        
    }

    
    private ConsultarSelectId(id:number) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("Llego la respuesta",xmlRequest.responseText); 
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Device> = JSON.parse(respuesta); 

            

                    for (let d of datos) {
                        console.log("valores base:",d.type.toString());

                        let iName =<HTMLInputElement> document.getElementById("nameActualizar");
                        let typeName =<HTMLInputElement> document.getElementById("typeName");


                        let iDescription = <HTMLInputElement>document.getElementById("descriptionActualizar");

                        let typeDescription = <HTMLInputElement>document.getElementById("typeDescription");
                        let itypeActualizar = <HTMLInputElement>document.getElementById("typeActualizar");
                       
                        let iselect = <HTMLInputElement>document.getElementById("selectActualizar");

                        let luces = <HTMLInputElement>document.getElementById("luces");
                        let Tomas = <HTMLInputElement>document.getElementById("Tomas");
                        
                       /*  iselect.addEventListener("change", d.type.toString()); */
                        
                       typeName.innerHTML = "Nombre Actual: " + d.name;
                       typeDescription.innerHTML = "Descripcion Actual: " + d.description;
                        
                        //document.getElementById("selectActualizar").selected = 'selected';
                        console.log("valores iselect: ",iselect.value);
                        iName.value = d.name;
                        iDescription.value = d.description;
                        iselect.value = d.type.toString();

                        if(d.type === 0){
                            itypeActualizar.value="luces";
                           
                        }else{
                            itypeActualizar.value="Tomas";

                        }
                        
                       
                        luces.removeAttribute("selected");
                        Tomas.removeAttribute("selected");
                       
                        if(d.type === 0){
                            luces.setAttribute("selected","selected");
                            itypeActualizar.innerHTML = "type Actual: " + luces.id;
                        }else{

                            Tomas.setAttribute("selected","selected");
                            itypeActualizar.innerHTML  = "type Actual: " + Tomas.id;

                        }
            
                        console.log("valores iselect: ",iselect.value);
    
                    }

                } else {
                    alert("Salio mal la consulta!!!");
                }
            }
            
            

        }
        
       
        xmlRequest.open("GET", `http://localhost:8000/device/${id}`, true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        xmlRequest.send();

    }


// ejecucion de eventos     

    handleEvent(object: Event): void {
        
        let elemento = <HTMLElement>object.target;
        

        // implementacion boton listar 

        if ("btnListar" == elemento.id) {

            console.log("Activacion boton listar.");
            location.reload();
        } 

        // implementacion boton agregar 

        else if ("btnGuardar" == elemento.id) {
            console.log("agregar dispositivo.");
            let btnGuardar = <HTMLInputElement>elemento;
            this.cargarDevice();
        }
        // implementacion boton eliminar

        else if (elemento.id.startsWith("btn_Eli_")) {
            console.log("eliminar dispositivo.");
            let botonEliminar = <HTMLInputElement>elemento;
            this.ejecutarDelete(parseInt(elemento.id.substring(8, elemento.id.length)));
           
        }

        // implementacion checkbox actualizar estado

        else if (elemento.id.startsWith("cb_")) {
            console.log("Activacion dispositivo (estado).");
            let checkbox = <HTMLInputElement>elemento;
            this.ejecutarPut(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);
        }
        

        // implementacion checkbox actualizar nombre-descripcion-estado

        else if (elemento.id.startsWith("modal_Act_")) {
            console.log("Activacion modal guardar actualizar.");
            let modalActualizar = <HTMLInputElement>elemento;
            modalActualizarId = parseInt(elemento.id.substring(10, elemento.id.length));
            this.ConsultarSelectId(modalActualizarId);
    
        } 

        else if ("btnGuardarActualizar" == elemento.id) {
            console.log("Actualizar dispositivo (nombre-descripcion-tipo).");
            let btnGuardarActualizar = <HTMLInputElement>elemento;
            this.ejecutarPutActualizar(modalActualizarId);
           
        }

    }

}



// Definicion de eventos 


    
window.addEventListener("load", () => {

    // inicializacion de selector
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");
    // inicializacion modal
    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal,"");

    // instancia main

    let main1: Main = new Main();

   
    // evento boton listar
    let boton = document.getElementById("btnListar");
    boton.addEventListener("click", main1); 

     // evento boton guardar agregar dispositivo

     let botonGuardar = document.getElementById("btnGuardar");
     botonGuardar.addEventListener("click",main1);
    
    // evento boton guardar actualizar dispositivo

    let btnGuardarActualizar = document.getElementById("btnGuardarActualizar");
    btnGuardarActualizar.addEventListener("click",main1);

});

