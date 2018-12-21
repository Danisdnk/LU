using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using BackOfficeLU.DAL;
using BackOfficeLU.Models;
using Dapper;

namespace BackOfficeLU.DAL
{
    public class ClaseRepository : IClaseRepository
    {
        
        private string connStr= @"Server=(localdb)\MSSQLLocalDB;Database=LagashBackOffice;Integrated Security=true";
        
         public int? GetOrInsertResponsable (Responsable responsable, int idEdicion)
        {
            int? responsableV = null; //Caso en que no se ingresa un segundo responsable 
            
            if (responsable != null)  //Si el campo responsable tiene datos
            {
                var SearchResponsable = " select IdResponsable from Responsable where NombreyApellido = @NombreyApellido and IdEdicion = @IdEdicion";
            
                using (var conn = new SqlConnection(connStr))
                {
                    conn.Open();
                    responsableV = conn.QueryFirstOrDefault<int?> (SearchResponsable, new  //Busca al responsable en la tabla
                    { 
                        NombreyApellido = responsable.NombreyApellido, //si lo encuentra lo selecciona y le asigna los mismos valores
                        IdEdicion = idEdicion
                    });

                    if (responsableV == null)  //si no lo encuentra lo inserta en la tabla 
                    {
                    
                        var sql= @"insert into Responsable (NombreyApellido, IdEdicion) values (@NombreyApellido, @IdEdicion)
                                select @@identity";
                        responsableV = conn.QueryFirstOrDefault<int>(sql, new 
                        { 
                            NombreyApellido = responsable.NombreyApellido,
                            IdEdicion = idEdicion
                        });

                    }

                    conn.Close();                    
                }
            }

            return responsableV;
        }

        public void InsertClase(Clase clase)
        {
            int responsable1 = 0;
            int? responsable2 = null;
            int idClase;
            
            if( clase.Responsable2 != null)
            {
            if( clase.Responsable1.NombreyApellido.ToLower() == clase.Responsable2.NombreyApellido.ToLower())
            {
                return;

            }
            }

            responsable1 = GetOrInsertResponsable(clase.Responsable1, clase.IdEdicion).Value;
            responsable2 = GetOrInsertResponsable(clase.Responsable2, clase.IdEdicion);

            
            

            var sql= @"insert into clase (NumeroClase, IdEdicion, Fecha, TituloClase, IdResponsable1, IdResponsable2) 
                       values (@NumeroClase, @IdEdicion, @Fecha, @TituloClase, @IdResponsable1, @IdResponsable2)
                       SELECT @@IDENTITY "; //Insert en la base de datos

            
            var InsertIntoClase = "select * from Responsable where IdResponsable = @IdResponsable";

            using (var conn = new SqlConnection(connStr))
            {
                
                conn.Open();
                idClase = conn.QueryFirstOrDefault<int>(sql, new {
                    NumeroClase = clase.NumeroClase,
                    IdEdicion = clase.IdEdicion, 
                    Fecha = clase.Fecha, 
                    TituloClase = clase.TituloClase, 
                    IdResponsable1 = responsable1, 
                    IdResponsable2 = responsable2

                });

                clase.Responsable1 = conn.QueryFirstOrDefault<Responsable>(InsertIntoClase, new 
                {
                    IdResponsable = responsable1

                });

                clase.Responsable2 = conn.QueryFirstOrDefault<Responsable>(InsertIntoClase, new 
                {
                    IdResponsable = responsable2

                });

                conn.Close();

            }           

            var InsertTemas= "insert into Tema (TituloTema, IdClase) values (@TituloTema, @IdClase)";

            foreach (var item in clase.Temas)
            {
                
                var conn = new SqlConnection(connStr);

                conn.Open();
                conn.Execute(InsertTemas, new { TituloTema =item.TituloTema, IdClase = idClase });
                conn.Close();
                
            }
        }
        
        public int SearchClaseRepetida (Clase clase)
        {

            var ClasesCargadas = GetAllClases(clase.IdEdicion);

            foreach (var item in ClasesCargadas)
            {

                if (item.Fecha == clase.Fecha )
                {

                    return -1;

                }
            }

            return 0;

        }

        public IEnumerable<DateTime> GetFechasClases(int idEdicion)
        {
            var sql = "select Fecha from Clase where IdEdicion = @IdEdicion ";
            using(var conn = new SqlConnection(connStr)){

                conn.Open();
                var fechas = conn.Query<DateTime>(sql, new { IdEdicion = idEdicion });
                conn.Close();

                return fechas;

            }
            
        }

        public IEnumerable<Tema> GetAllTemas(int id)
        {
            var sql = "select * from Tema where IdClase = @IdClase";

            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();
                var TemasClase = conn
                .Query<Tema>(sql, new { IdClase = id });
                conn.Close();

                return TemasClase;

            }
            
        }

        public Clase GetClase (int idclase)
        {
            var sql = "SELECT * from Clase where IdClase = @IdClase";

            using(var conn = new SqlConnection(connStr))
            {
                conn.Open();
                Clase clase = conn
                    .Query<Clase>(sql, new { IdClase = idclase })
                    .FirstOrDefault();


                var SearchIdResponsable1 = "select IdResponsable1 from Clase where IdClase = "+clase.IdClase ;
                int IdResponsable1 = conn.QueryFirstOrDefault<int>(SearchIdResponsable1);
                var SearchByIdResponsable1 = "select * from Responsable where IdResponsable = @IdResponsable ";

                clase.Responsable1 = conn.QueryFirstOrDefault<Responsable>(SearchByIdResponsable1, new {

                    IdResponsable = IdResponsable1,
                    
                    });

                var SearchIdResponsable2 = "select IdResponsable2 from Clase where IdClase = "+clase.IdClase;
                int? IdResponsable2 = conn.QueryFirstOrDefault<int?>(SearchIdResponsable2);

                if (IdResponsable2 != null)
                {
                    var SearchByIdResponsable2 = "select * from Responsable where IdResponsable = @IdResponsable ";
                    clase.Responsable2 = conn.QueryFirstOrDefault<Responsable>(SearchByIdResponsable2, new {

                    IdResponsable = IdResponsable2,
                    
                    });
                }
                
                clase.Temas = GetAllTemas(clase.IdClase.Value) ;

                return clase;
            }

        }

        public IEnumerable<Clase> GetAllClases(int IdEdicion)
        {
            var sql =  @"select * from Clase where IdEdicion = @IdEdicion
                        ORDER BY Fecha";
            
            var conn = new SqlConnection(connStr);
            conn.Open();
            var clases = conn.Query<Clase>(sql, new {IdEdicion});

           foreach (var item in clases) 
            {
                var SearchIdResponsable1 = "select IdResponsable1 from Clase c where c.IdClase = "+item.IdClase;
                int IdResponsable1 = conn.QueryFirstOrDefault<int>(SearchIdResponsable1);
                var SearchByIdResponsable1 = "select * from Responsable where IdResponsable = @IdResponsable ";

                item.Responsable1 = conn.QueryFirstOrDefault<Responsable>(SearchByIdResponsable1, new {
                    IdResponsable = IdResponsable1                    
                    });

                var SearchIdResponsable2 = "select IdResponsable2 from Clase where IdClase = "+item.IdClase;
                int? IdResponsable2 = conn.QueryFirstOrDefault<int?>(SearchIdResponsable2);

                if (IdResponsable2 != null)
                {
                    var SearchByIdResponsable2 = "select * from Responsable where IdResponsable = @IdResponsable ";
                    item.Responsable2 = conn.QueryFirstOrDefault<Responsable>(SearchByIdResponsable2, new {
                    IdResponsable = IdResponsable2                            
                    });
                }
        
                item.Temas = GetAllTemas(item.IdClase.Value);
            }
            conn.Close ();

            return clases;
        }

        public IEnumerable<Clase> GetClasesEdicionPorFechas(int idEdicion, DateTime fechaInicio, DateTime fechaFin)
        {
            var sql = @"select IdClase, IdEdicion, TituloClase, Fecha, NumeroClase
                        from Clase 
                        where IdEdicion = @IdEdicion
                        and   Fecha between @FechaInicio and @FechaFin
                        order by Fecha";
            
            var conn = new SqlConnection(connStr);
            conn.Open();
            
            var clases = conn.Query<Clase>(sql, new { 
                IdEdicion = idEdicion,  
                FechaFin = fechaFin,
                FechaInicio = fechaInicio
            });

           foreach (var item in clases) 
            {
                var SearchIdResponsable1 = "select IdResponsable1 from Clase c where c.IdClase = "+item.IdClase;
                int IdResponsable1 = conn.QueryFirstOrDefault<int>(SearchIdResponsable1);
                var SearchByIdResponsable1 = "select * from Responsable where IdResponsable = @IdResponsable ";

                item.Responsable1 = conn.QueryFirstOrDefault<Responsable>(SearchByIdResponsable1, new {
                    IdResponsable = IdResponsable1                    
                    });

                var SearchIdResponsable2 = "select IdResponsable2 from Clase where IdClase = "+item.IdClase;
                int? IdResponsable2 = conn.QueryFirstOrDefault<int?>(SearchIdResponsable2);

                if (IdResponsable2 != null)
                {
                    var SearchByIdResponsable2 = "select * from Responsable where IdResponsable = @IdResponsable ";
                    item.Responsable2 = conn.QueryFirstOrDefault<Responsable>(SearchByIdResponsable2, new {
                    IdResponsable = IdResponsable2                            
                    });
                }
        
                item.Temas = GetAllTemas(item.IdClase.Value);
            }
            conn.Close ();

            return clases;
        }
     
        public void Delete(int idClase)
        {
            var sql= @"delete Tema where IdClase = @idClase;
                       delete Clase where IdClase = @idClase";

            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();
                conn.Execute(sql, new { IdClase = idClase });
                conn.Close();
            }
        }

        public Clase Update(Clase clase)
        {
            int responsable1 = GetOrInsertResponsable(clase.Responsable1, clase.IdEdicion).Value;
            int? responsable2 = GetOrInsertResponsable(clase.Responsable2, clase.IdEdicion);

            using(var conn = new SqlConnection(connStr))
            {
                var sql = @"UPDATE Clase
                            SET Fecha = @Fecha,
                                NumeroClase = @NumeroClase,
                                IdResponsable1 = @IdResponsable1,
                                IdResponsable2 = @IdResponsable2,
                                TituloClase = @TituloClase
                            WHERE IdClase = @IdCLase";

                conn.Open();

                conn.Execute(sql, new { 
                    Fecha = clase.Fecha, 
                    NumeroClase = clase.NumeroClase, 
                    IdResponsable1 = responsable1, 
                    IdResponsable2 = responsable2,
                    TituloClase = clase.TituloClase,
                    IdClase = clase.IdClase
                });

                var DeleteTemas= "DELETE Tema WHERE IdClase = @idClase";

                conn.Execute(DeleteTemas, new { idClase = clase.IdClase });

                var InsertTemas= "insert into Tema (TituloTema, IdClase) values (@TituloTema, @IdClase)";

                foreach (var item in clase.Temas)
                {
                    conn.Execute(InsertTemas, new { TituloTema = item.TituloTema, IdClase = clase.IdClase });
                }
                
                conn.Close();
            }

            return this.GetClase(clase.IdClase.Value);
        
        
        }


    }

}