using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using BackOfficeLU.Models;
using Dapper;

namespace BackOfficeLU.DAL
{
    public class PostulanteRepository : IPostulanteRepository
    {

        private string connStr= @"Server=(localdb)\MSSQLLocalDB;Database=LagashBackOffice;Integrated Security=true";

         public IEnumerable<Postulante> GetPostulantes(int idEdicion)
        {
            var sql = "select * from Postulante where IdEdicion = @IdEdicion order by NombreyApellido";

            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();
                var postulantes = conn.Query<Postulante>(sql, new { IdEdicion = idEdicion });
                
                foreach ( var item in postulantes )
                {
       
                var sqlIdDomicilio = "select IdDomicilio from Postulante where IdPostulante = "+item.IdPostulante;
                int idDomicilio = conn.QueryFirstOrDefault<int>(sqlIdDomicilio);

                var sqlDomicilio = "select * from Domicilio where IdDomicilio = "+idDomicilio;
                item.Domicilio = conn.QueryFirstOrDefault<Domicilio>(sqlDomicilio);

                var sqlIdPais = "select IdPais from Domicilio where IdDomicilio = "+idDomicilio;
                int idPais = conn.QueryFirstOrDefault<int>(sqlIdPais);

                var sqlPais = "select * from Pais where IdPais = "+idPais;
                item.Domicilio.Pais = conn.QueryFirstOrDefault<Pais>(sqlPais);

                }

                conn.Close();

                return postulantes;

            }
        }

        public Postulante GetPostulante(int idPostulante)
        {
            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();
                var sqlPostulante = "select * from Postulante where IdPostulante = "+idPostulante;
                Postulante postulante = conn.QueryFirstOrDefault<Postulante>(sqlPostulante);

                var sqlIdDomicilio = "select IdDomicilio from Postulante where IdPostulante = "+idPostulante;
                int idDomicilio = conn.QueryFirstOrDefault<int>(sqlIdDomicilio);

                var sqlDomicilio = "select * from Domicilio where IdDomicilio = "+idDomicilio;
                postulante.Domicilio = conn.QueryFirstOrDefault<Domicilio>(sqlDomicilio);

                var sqlIdPais = "select IdPais from Domicilio where IdDomicilio = "+idDomicilio;
                int idPais = conn.QueryFirstOrDefault<int>(sqlIdPais);

                var sqlPais = "select * from Pais where IdPais = "+idPais;
                postulante.Domicilio.Pais = conn.QueryFirstOrDefault<Pais>(sqlPais);

                conn.Close();

                return postulante;

            }
        }

        public void InsertPostulante(Postulante postulante, int idEdicion, int? idPais)
        {
            if ( postulante.GitHub == "" )
            {
                postulante.GitHub = null;
            }
            if ( postulante.LinkedIn == "" )
            {
                postulante.LinkedIn = null;
            }
            if ( postulante.Domicilio.Piso == "")
            {
                postulante.Domicilio.Piso = null;
            }

            using (var conn = new SqlConnection (connStr))
            {
                conn.Open();

                var sqlDomicilio = @"INSERT INTO [dbo].[Domicilio]
                                        ([IdPais]
                                        ,[Calle]
                                        ,[NumeroCalle]
                                        ,[Piso]
                                        ,[Departamento]
                                        ,[Localidad]
                                        ,[Provincia]
                                        ,[CodigoPostal])
                                    VALUES
                                        (@IdPais
                                        ,@Calle
                                        ,@NumeroCalle
                                        ,@Piso
                                        ,@Departamento 
                                        ,@Localidad
                                        ,@Provincia
                                        ,@CodigoPostal)
                                    SELECT @@IDENTITY";

                int idDomicilio = conn.QueryFirstOrDefault<int>(sqlDomicilio, new {

                    IdPais = idPais,
                    Calle = postulante.Domicilio.Calle,
                    NumeroCalle = postulante.Domicilio.NumeroCalle,
                    Piso = postulante.Domicilio.Piso,
                    Departamento = postulante.Domicilio.Departamento,
                    Localidad = postulante.Domicilio.Localidad,
                    Provincia = postulante.Domicilio.Provincia,
                    CodigoPostal = postulante.Domicilio.CodigoPostal

                });

                postulante.Domicilio.IdDomicilio = idDomicilio;

                var sqlPostulante = @"INSERT INTO [dbo].[Postulante]
                                            ([IdDomicilio]
                                            ,[Rol]
                                            ,[IdEdicion]
                                            ,[DNI]
                                            ,[NombreyApellido]
                                            ,[Email]
                                            ,[Telefono]
                                            ,[GitHub]
                                            ,[LinkedIn]
                                            ,[Equipo])
                                        VALUES
                                            (@IdDomicilio
                                            ,@Rol
                                            ,@IdEdicion
                                            ,@DNI
                                            ,@NombreyApellido 
                                            ,@Email
                                            ,@Telefono
                                            ,@GitHub
                                            ,@LinkedIn
                                            ,@Equipo)";

                conn.QueryFirstOrDefault(sqlPostulante, new { 

                    IdDomicilio = idDomicilio
                    ,Rol = postulante.Rol
                    ,IdEdicion = idEdicion
                    ,DNI = postulante.DNI
                    ,NombreyApellido = postulante.NombreyApellido
                    ,Email = postulante.Email
                    ,Telefono = postulante.Telefono
                    ,GitHub = postulante.GitHub
                    ,LinkedIn = postulante.LinkedIn
                    ,Equipo = postulante.Equipo
                });

                conn.Close ();
            }

        }

        public IEnumerable<Pais> GetPaises()
        {
            var sql = "select * from Pais";

            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();
                var paises = conn.Query<Pais>(sql);
                conn.Close();

                return paises;

            }
        }

        public Postulante Update(Postulante postulante, int idPostulante, int? idPais)
        {

            Postulante _postulante = GetPostulante(idPostulante);

            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();

                var sqlDomicilio =  @"UPDATE [dbo].[Domicilio]
                                SET      IdPais = @IdPais
                                        ,Calle = @Calle
                                        ,NumeroCalle = @NumeroCalle
                                        ,Piso = @Piso
                                        ,Departamento = @Departamento
                                        ,Localidad = @Localidad
                                        ,Provincia = @Provincia
                                        ,CodigoPostal = @CodigoPostal

                                        where IdDomicilio = "+_postulante.Domicilio.IdDomicilio;

                conn.QueryFirstOrDefault(sqlDomicilio, new {

                    IdPais = idPais,
                    Calle = postulante.Domicilio.Calle,
                    NumeroCalle = postulante.Domicilio.NumeroCalle,
                    Piso = postulante.Domicilio.Piso,
                    Departamento = postulante.Domicilio.Departamento,
                    Localidad = postulante.Domicilio.Localidad,
                    Provincia = postulante.Domicilio.Provincia,
                    CodigoPostal = postulante.Domicilio.CodigoPostal

                });

                
            var sqlPostulante = @"UPDATE [dbo].[Postulante]
                       SET  IdDomicilio = @IdDomicilio,
                            Rol = @Rol,
                            IdEdicion = @IdEdicion,
                            DNI = @DNI,
                            NombreyApellido = @NombreyApellido,
                            
                            Email = @Email,
                            Telefono = @Telefono,
                            GitHub = @GitHub,
                            LinkedIn = @LinkedIn,
                            Equipo = @Equipo

                         WHERE IdPostulante = "+idPostulante;

                conn.QueryFirstOrDefault(sqlPostulante, new { 

                    IdDomicilio = _postulante.Domicilio.IdDomicilio
                    ,Rol = postulante.Rol
                    ,IdEdicion = postulante.IdEdicion
                    ,DNI = postulante.DNI
                    ,NombreyApellido = postulante.NombreyApellido
                    ,Email = postulante.Email
                    ,Telefono = postulante.Telefono
                    ,GitHub = postulante.GitHub
                    ,LinkedIn = postulante.LinkedIn
                    ,Equipo = postulante.Equipo
                });

                conn.Close();

                return postulante;

            }
        
        }

    }
}