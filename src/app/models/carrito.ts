export class Carrito {
    id: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    usuario: number;
    producto:number;
    constructor(id: number,nombre:string,imagen:string,descripcion:string,precio:number,cantidad:number,usuario:number,producto:number){
        this.id=id;
        this.nombre=nombre;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.precio=precio;
        this.cantidad=cantidad;
        this.usuario=usuario;
        this.producto=producto;
    }

}
/*
    private Long id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "imagen")
    private String imagen;
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "precio")
    private double precio;
    @Column(name = "cantidad")
    private int cantidad;
    @Column(name = "usuario")
    private int usuario;
*/