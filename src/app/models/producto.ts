export class Producto {
    id: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    precio: number;
    constructor(id: number,nombre:string,imagen:string,descripcion:string,precio:number){
        this.id=id;
        this.nombre=nombre;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.precio=precio;
    }
}
