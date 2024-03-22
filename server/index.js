const express= require("express");
const app=express();
const mysql=require("mysql");
const cors=require("cors");

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"usuarios"
});

app.post("/create",(req,res)=>{
    const Nombres=req.body.Nombres;
    const Apellidos=req.body.Apellidos;
    const correo=req.body.correo;
    const telefono=req.body.telefono;
    const edad=req.body.edad;
    const nacimiento=req.body.nacimiento;
    const fecha=req.body.fecha;
    const identificacion=req.body.identificacion;

    db.query("INSERT INTO usuarios(nombres,apellidos,correo,telefono,edad,nacimiento,fecha,identificacion) values(?,?,?,?,?,?,?,?)",[Nombres,Apellidos,correo,telefono,edad,nacimiento,fecha,identificacion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/usuarios",(req,res)=>{
    db.query("SELECT * FROM usuarios",
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const Nombres=req.body.Nombres;
    const id=req.body.id;
    const Apellidos=req.body.Apellidos;
    const correo=req.body.correo;
    const telefono=req.body.telefono;
    const edad=req.body.edad;
    const nacimiento=req.body.nacimiento;
    const fecha=req.body.fecha;
    const identificacion=req.body.identificacion;

    db.query("UPDATE usuarios SET nombres=?,apellidos=?,correo=?,telefono=?,edad=?,nacimiento=?,fecha=?,identificacion=? WHERE id=?",[Nombres,Apellidos,correo,telefono,edad,nacimiento,fecha,identificacion,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;

    db.query("DELETE FROM usuarios WHERE id=?",id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});





app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})