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
                            ` <li class="collection-item avatar"  style="background-color: #124580;">`;
                        
                            if (d.type === 0) {
                                itemList+=`<img src="./static/images/luces.png" alt="" class="circle">`;
                            }
                            else{
                                itemList+= `<img src="./static/images/tomas.png" alt="" class="circle">`;
                            }
                        
                            itemList+= `<span class="title" style="background-color: #124580; font-size: 20px;" >
                        ${d.name}
                        </span>
                        <p>
                         ${d.description}
                        </p>

                        <a class="waves-effect waves-light btn modal-trigger" href="#modalActualizar" id="modal_Act_${d.id}" >Editar</a> 
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


// Agregar un diposotivo, agrega el dispositivo en la base de datos.

private cargarDevice(): void{

       
    let nameAgregar =<HTMLInputElement> document.getElementById("nameAgregar");
    let descriptionAgregar = <HTMLInputElement>document.getElementById("descriptionAgregar");        
    let selectAgregar = <HTMLInputElement>document.getElementById("selectAgregar");


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
        name: nameAgregar.value,
        description: descriptionAgregar.value,
        state: false,
        type: selectAgregar.value
    };

    xmlRequest.send(JSON.stringify(s));
    
}

// Eliminar un diposotivo, elimina el dispositivo en la base de datos.

    private eliminarDevice(id:number) {

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

private actualizarDeviceState(id:number,state:boolean) {

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

    private actualizarDevice(id:number){

       
        let nameActualizar =<HTMLInputElement> document.getElementById("nameActualizar");
        let descriptionActualizar = <HTMLInputElement>document.getElementById("descriptionActualizar");
        let selectActualizar = <HTMLInputElement>document.getElementById("selectActualizar");

        console.log("nameActualizar ",nameActualizar.value);
        console.log("descriptionActualizar ", descriptionActualizar.value) ;
        console.log("selector ",selectActualizar.value);

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
            name: nameActualizar.value,
            description: descriptionActualizar.value,
            state: false,
            type: selectActualizar.value
        };
    
        xmlRequest.send(JSON.stringify(s));
        
        
    }

    
    private consultaDevice(id:number) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {

                    console.log("Llego la respuesta",xmlRequest.responseText); 
                    
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Device> = JSON.parse(respuesta); 

            
                    for (let d of datos) {
                        console.log("valores base:",d.type.toString());

                        let nameActualizar =<HTMLInputElement> document.getElementById("nameActualizar");
                        let typeName =<HTMLInputElement> document.getElementById("typeName");

                        let descriptionActualizar = <HTMLInputElement>document.getElementById("descriptionActualizar");
                        let typeDescription = <HTMLInputElement>document.getElementById("typeDescription");

                        let typeActualizar = <HTMLInputElement>document.getElementById("typeActualizar");
                        let selectActualizar = <HTMLInputElement>document.getElementById("selectActualizar");

                        let luces = <HTMLInputElement>document.getElementById("luces");
                        let Tomas = <HTMLInputElement>document.getElementById("Tomas");
                        
                      
                        
                        
                        
                       
                        console.log("valores selectActualizar: ",selectActualizar.value);
                        nameActualizar.value = d.name;
                        descriptionActualizar.value = d.description;
                        selectActualizar.value = d.type.toString();

                        typeName.innerHTML = "Nombre Actual: " + d.name;
                        typeDescription.innerHTML = "Descripcion Actual: " + d.description;

                        if(d.type === 0){
                            typeActualizar.value="luces";
                           
                        }else{
                            typeActualizar.value="Tomas";

                        }
                        
                       
                        luces.removeAttribute("selected");
                        Tomas.removeAttribute("selected");
                       
                        if(d.type === 0){
                            luces.setAttribute("selected","selected");
                            typeActualizar.innerHTML = "type Actual: " + luces.id;
                        }else{

                            Tomas.setAttribute("selected","selected");
                            typeActualizar.innerHTML  = "type Actual: " + Tomas.id;

                        }
            
                        console.log("valores selectActualizar: ",selectActualizar.value);
    
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

        else if ("btnGuardarAgregar" == elemento.id) {
            console.log("agregar dispositivo.");
            this.cargarDevice();
            setTimeout(()=>{location.reload();},1000);
        }
        // implementacion boton eliminar

        else if (elemento.id.startsWith("btn_Eli_")) {
            console.log("eliminar dispositivo.");
            this.eliminarDevice(parseInt(elemento.id.substring(8, elemento.id.length)));

            setTimeout(()=>{location.reload();},1000);
           
        }

        // implementacion checkbox actualizar estado

        else if (elemento.id.startsWith("cb_")) {
            console.log("Activacion dispositivo (estado).");
            let checkbox = <HTMLInputElement>elemento;
            this.actualizarDeviceState(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);
            setTimeout(()=>{location.reload();},1000);
        }
        

        // implementacion checkbox actualizar nombre-descripcion-estado

        else if (elemento.id.startsWith("modal_Act_")) {
            console.log("Activacion modal guardar actualizar.");
            modalActualizarId = parseInt(elemento.id.substring(10, elemento.id.length));
            this.consultaDevice(modalActualizarId);
    
        } 

        else if ("btnGuardarActualizar" == elemento.id) {
            console.log("Actualizar dispositivo (nombre-descripcion-tipo).");
            let btnGuardarActualizar = <HTMLInputElement>elemento;
            this.actualizarDevice(modalActualizarId);
            setTimeout(()=>{location.reload();},1000);
            
           
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

     let btnGuardarAgregar = document.getElementById("btnGuardarAgregar");
     btnGuardarAgregar.addEventListener("click",main1);
    
    // evento boton guardar actualizar dispositivo

    let btnGuardarActualizar = document.getElementById("btnGuardarActualizar");
    btnGuardarActualizar.addEventListener("click",main1);

});

