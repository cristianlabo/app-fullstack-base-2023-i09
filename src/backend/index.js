//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};


var app     = express();
app.use(cors(corsOptions));

var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================


/***********************************************************************************/
/********************* metodos para obtener dispositivos ***************************/
/***********************************************************************************/

 // get device -- utilizado para obtener todos los  dispositivos de la base de datos

 app.get('/devices/', function(req, res, next) {

    utils.query("select * from Devices ;",(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(404).send(err);
        }
        
    });

});

// get device -- utilizado para obtener un  dispositivo de la base de datos

app.get('/device/:id', function(req, res, next) {

    console.log("parametro id ",req.params.id);
    
    utils.query(`select * from Devices where id = ${req.params.id} ;`,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(404).send(err);
        }
        
    });

});

/***********************************************************************************/
/********************* metodos para agregar dispositivos ***************************/
/***********************************************************************************/

 // post device -- utilizado para agregar un dispositivo en la base de datos

 app.post("/device",(req,res,next)=>{
  
    utils.query(`INSERT INTO Devices (name,description,state,type) VALUES("${req.body.name}","${req.body.description}",${req.body.state},${req.body.type})`,(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(404).send(err);
        }
        
    });

});

/***********************************************************************************/
/********************* metodos para eliminar de dispositivos ***********************/
/***********************************************************************************/

  // delete device -- utilizado para eliminar un dispositivo en la base de datos

  app.delete("/device/:id",(req,res,next)=>{
    
    console.log("Delete device: ",req.params.id) ;
   
    utils.query(`DELETE  from Devices  where id = ${req.params.id} `,(err,rsp,fields)=>{
          if(err==null){
              console.log("rsp",rsp);
              res.status(200).send(JSON.stringify(rsp));
          }else{
              console.log("err",err);
              res.status(404).send(err);
          }
          
      });
  
  });


/***********************************************************************************/
/********************* metodos para actualizar de dispositivos *********************/
/***********************************************************************************/

// put device -- utilizado para actualizar el estado de un dispositivo en la base de datos

app.put("/device/:id/:state",(req,res,next)=>{
    
    console.log("Put device: ", req.body ) ;

    utils.query(`UPDATE  Devices SET  state = ${req.params.state} where id = ${req.params.id} `,(err,rsp,fields)=>{
          if(err==null){
              console.log("rsp",rsp);
              res.status(200).send(JSON.stringify(rsp));
          }else{
              console.log("err",err);
              res.status(404).send(err);
          }
          
      });
  
  });

  // put device -- utilizado para actualizar name, descripcion y tipo de un dispositivo en la base de datos


app.put("/device",(req,res,next)=>{
    
    utils.query(`UPDATE  Devices SET  name = "${req.body.name}", description = "${req.body.description}" ,type = ${req.body.type} where id = ${req.body.id} `,(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(404).send(err);
        }
        
    });

});




/***********************************************************************************/

// apertura de escucha

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
