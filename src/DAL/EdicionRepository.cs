using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using BackOfficeLU.Models;
using Dapper;

namespace BackOfficeLU.DAL
{
    public class EdicionRepository : IEdicionRepository
    {
        private string ConnStr = @"Server=(localdb)\MSSQLLocalDB;Database=LagashBackOffice;Integrated Security=true";
        public IEnumerable<Edicion> GetAllEdition()
        {
            var sql = @"SELECT * 
                        FROM Edicion edi 
                        INNER JOIN Locacion loc ON loc.IdLocacion = edi.IdLocacion
                        ORDER BY NumeroEdicion";
                        
            using (var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                IEnumerable<Edicion> edicion = conn.Query<Edicion, Locacion, Edicion>(sql, map: GetLocacionByNombre, splitOn: "idLocacion");
                conn.Close();

                return edicion;
            }
        }

        public Edicion GetEdicion(int idEdicion)
        {
            var sql = @"SELECT * FROM Edicion edi INNER JOIN Locacion loc ON loc.IdLocacion = edi.IdLocacion WHERE edi.IdEdicion = @IdEdicion";
            using (var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                Edicion edicion = conn.Query<Edicion, Locacion, Edicion>(sql, param: new {IdEdicion = idEdicion}, map: GetLocacionByNombre, splitOn: "IdLocacion")
                .FirstOrDefault();
                conn.Close();

                return edicion;
            }
        }

        public void Insert(Edicion edicion)
        {
            var sql = @"INSERT INTO Edicion (IdLocacion, NumeroEdicion, FechaInicio, FechaFin, CantidadPostulantes)
                        VALUES (@IdLocacion, @NumeroEdicion, @FechaInicio, @FechaFin, @CantidadPostulantes)";
            
            using (var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                conn.Execute(sql, new{IdLocacion = edicion.Locacion.IdLocacion, NumeroEdicion = edicion.NumeroEdicion, FechaInicio = edicion.FechaInicio,
                                      FechaFin = edicion.FechaFin, CantidadPostulantes = edicion.CantidadPostulantes});
                conn.Close();
            }
        }

        public Edicion Update(Edicion edicion)
        {
            var sql = @"UPDATE Edicion 
                        SET IdLocacion = @IdLocacion, 
                            NumeroEdicion = @NumeroEdicion,
                            FechaInicio = @FechaInicio, 
                            FechaFin = @FechaFin,
                            CantidadPostulantes = @CantidadPostulantes 
                        WHERE IdEdicion = @IdEdicion";
            using (var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                conn.Execute(sql, new{IdLocacion = edicion.Locacion.IdLocacion, NumeroEdicion= edicion.NumeroEdicion, FechaInicio = edicion.FechaInicio, 
                FechaFin = edicion.FechaFin, CantidadPostulantes = edicion.CantidadPostulantes, IdEdicion = edicion.IdEdicion});
                conn.Close();

                return edicion;
            }
        }

        public IEnumerable<Edicion> GetEdicionesActiva()
        {
            var sql = @"SELECT * FROM Edicion edi INNER JOIN Locacion loc ON loc.IdLocacion = edi.IdLocacion 
                        WHERE GETDATE() BETWEEN edi.FechaInicio AND edi.FechaFin
                        ORDER BY NumeroEdicion";
            using (var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                IEnumerable<Edicion> edicion = conn.Query<Edicion, Locacion, Edicion>(sql, map: GetLocacionByNombre, splitOn: "idLocacion");
                conn.Close();

                return edicion;
            }
        }


        private Edicion GetLocacionByNombre(Edicion edicion, Locacion locacion)
        {
            edicion.Locacion = locacion;
            return edicion;

        }

        public IEnumerable<int> GetNumberEdition (int idEdicionExcluido)
        {
            var sql="select NumeroEdicion from Edicion where IdEdicion != @IdEdicionExcluida";

            using (var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                var NumberClases = conn.Query<int>(sql, new { IdEdicionExcluida = idEdicionExcluido });
                conn.Close();

                return NumberClases;

            }

        }

    }
}