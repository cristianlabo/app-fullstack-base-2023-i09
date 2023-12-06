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
app.get("/otraCosa/:id/:algo",(req,res,next)=>{
    console.log("id",req.params.id)
    console.log("algo",req.params.algo)
    utils.query("select * from Devices where id="+req.params.id,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
        
        //console.log(fields);
    });
    
});


app.put("/device/:id/:state",(req,res,next)=>{
    

   
    let  estado = !req.params.state;
    console.log("se ejecuto el put ", req.body.id  ) ;
    console.log("se ejecuto el put ", req.body.state ) ;
    console.log("se ejecuto el put "+ estado +" " + req.params.id  +" " +req.params.state) ;

    
    utils.query(`UPDATE  Devices SET  state = ${req.params.state} where id = ${req.params.id} `,(err,rsp,fields)=>{
          if(err==null){
    //          utils.query(`COMMIT;`);
              console.log("rsp",rsp);
              res.status(200).send(JSON.stringify(rsp));
          }else{
              console.log("err",err);
              res.status(409).send(err);
          }
          
          //console.log(fields);
      });
  
  });

  app.delete("/device/:id",(req,res,next)=>{
    


    console.log("se ejecuto el delete ", req.params.id  ) ;
   
    
    utils.query(`DELETE  from Devices  where id = ${req.params.id} `,(err,rsp,fields)=>{
          if(err==null){
    //          utils.query(`COMMIT;`);
              console.log("rsp",rsp);
              res.status(200).send(JSON.stringify(rsp));
          }else{
              console.log("err",err);
              res.status(409).send(err);
          }
          
          //console.log(fields);
      });
  
  });



app.post("/device",(req,res,next)=>{
  /*   console.log("Llego el post",
    "UPDATE Devices SET state = "+req.body.state+" WHERE id = "+req.body.id);
    if(req.body.name==""){
        res.status(409).send("no tengo nada que hacer");
    }else{
        res.status(200).send("se guardo el dispositivo");
    }*/ 

  //  utils.query(`START TRANSACTION;`);
    utils.query(`INSERT INTO Devices (name,description,state,type) VALUES("${req.body.name}","${req.body.description}",${req.body.state},${req.body.type})`,(err,rsp,fields)=>{
        if(err==null){
  //          utils.query(`COMMIT;`);
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
        
        //console.log(fields);
    });

    //let  id=1;


/*     utils.query(`select * from Devices where id= `+req.body.id,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
        
        //console.log(fields);
    }); */

});



app.get('/devices/', function(req, res, next) {
    /*devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
        },
        { 
            'id': 3, 
            'name': 'TV', 
            'description': 'TV led Habitacion', 
            'state': 0, 
            'type': 3, 
        }
    ]
    */

    utils.query("select * from Devices ;",(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
        
        //console.log(fields);
    });


   // res.send(JSON.stringify(devices)).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
