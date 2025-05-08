//selecciona el codigo que queres ejecutar

//CTRL+L para seleccionar la linea de codigo que queremos ejecutar
//para ejecutar el codigo seleccionado presionamos CTRL+ALT+S

//cambiar de coleccion
use("colegio");
use("prods");

//Crear base de datos
db.createCollection("estudiantes");

//mostrar todos los documentos de la coleccion
db.prods.find();
db.estudiantes.find();

//borra a todos los documentos de la coleccion estudiantes
db.estudiantes.deleteMany({});

//constante con todos los alumnos
const alumnos = [
  {
    nombre: "Gero",
    apellido: "Gollan",
    edad: 23,
    sexo: "Masculino",
    mail: "gero@gmail.com",
    curso: "Full-Stack",
  },
  {
    nombre: "Julieta",
    apellido: "Wesolowski",
    edad: 22,
    sexo: "Femenino",
    mail: "juliwes@gmail.com",
    curso: "Full-Stack",
  },
  {
    nombre: "Antoella",
    apellido: "Gonzalez",
    edad: 20,
    sexo: "Femenino",
    email: "Anto@gmail.com",
    curso: "Photoshop",
  },
  {
    nombre: "Ana",
    apellido: "Martínez",
    edad: 24,
    sexo: "Femenino",
    email: "francia@gmail.com",
    curso: "React-JS",
  },
  {
    nombre: "Mia",
    apellido: "Negra",
    edad: 18,
    sexo: "Femenino",
    email: "turrita@gmail.com",
    curso: "Java_Script",
  },
  {
    nombre: "Cande",
    apellido: "Nahum",
    edad: 22,
    sexo: "Femenino",
    email: "Cande@gmail.com",
    curso: "Photoshop",
  },
];

//agrega varios documentos a la coleccion estudiantes
db.estudiantes.insertMany(alumnos);

//ejercicio traer todas las alumnas femeninas
db.estudiantes.find({ sexo: "Femenino" }, { sexo: 1, nombre: 1, _id: 0 });

//realizar un conteo para obtener el numero de documentos totales
db.estudiantes.countDocuments({});

//realizar un conteo para obtener el numero de documentos totales de sexo femenino
db.estudiantes.countDocuments({ sexo: "Femenino" });

//find para obtener el nombre del amor de mi vida
db.estudiantes.find({ nombre: "Julieta" }, { nombre: 1, _id: 0 });

// -------------------------------------------------

//traer los 2 primeros documentos de la coleccion estudiantes
db.estudiantes.find().limit(2);

//traer todos los documentos de la coleccion de manera scendente según la edad
db.estudiantes.find().sort({ edad: 1 });

//para traer los 2 más jóvenes de la coleccion
db.estudiantes.find().sort({ edad: 1 }).limit(2);

//traer el tercer alumno más jóven de la colección
db.estudiantes.find().sort({ edad: 1 }).skip(2).limit(1);

db.estudiantes.insertOne({
  nombre: "Cande",
  apellido: "Quintero",
  edad: 23,
  sexo: "Femenino",
  mail: "cande22@gmail.com",
});

//traer a todas las Candes de menos de 29 años
db.estudiantes.find({ nombre: "Cande", edad: { $lt: 29 } });

//actualizar el appellido de Cande 2
db.estudiantes.updateOne(
  { nombre: "Cande", apellido: "Quintero" }, //filtro
  { $set: { apellido: "Noexiste" } } //cambio
);


//actualizar edad cande 1
db.estudiantes.updateOne(
  { nombre: "Cande", apellido: "Nahum" }, //filtro
  { $set: { edad: 24 } } //cambio
);

//find para traer a todos los alumnos de entre 20 y 30 años
// se pone todo en el primer parametro
db.estudiantes.find({ edad: { $gte: 20, $lte: 30 } });

db.estudiantes.updateOne(
  {nombre: "Ana"},
{$set: {apellido: "Yazmín"}});


db.estudiantes.find();

db.estudiantes.deleteMany({nombre: "Cande"})
