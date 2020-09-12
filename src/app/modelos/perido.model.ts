
export class PeriodoModel{
    id: string;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    
    constructor(){
        this.fechaInicio=new Date();
        this.fechaFin=new Date();
        this.estado="nuevo";  
    }
}