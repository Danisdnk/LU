using System.Collections.Generic;
using System.Data.SqlClient;
using BackOfficeLU.Models;
using Dapper;

namespace BackOfficeLU.DAL
{
    public class LocacionRepository : ILocacionRepository
    {
        private string ConnStr = @"Server=(localdb)\MSSQLLocalDB;Database=LagashBackOffice;Integrated Security=true";

        public IEnumerable<Locacion> GetAllLocacion()
        {
            var sql = @"SELECT * FROM Locacion";
            using (var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                var locacion = conn.Query<Locacion>(sql);
                conn.Close();
                
                return locacion;
            }
        }

        public Locacion GetLocacionByNombre(string nombre)
        {
            var sql = "SELECT * FROM Locacion WHERE Nombre = @Nombre";
            using(var conn = new SqlConnection(ConnStr))
            {
                conn.Open();
                Locacion locacion = conn.QueryFirstOrDefault<Locacion>(sql, new {Nombre = nombre} );
                conn.Close();

                return locacion;
            }
        }
    }
}